const express = require('express')
const router = express.Router()
const { Octokit } = require("@octokit/rest");
const axios = require('axios');



router.post("/repos", async (req, res) => {
  const {key, owner} = req.body;

  const octokit = new Octokit({
    auth: key,
    userAgent: 'MarkerTool v1',
    baseUrl: 'https://api.github.com'
  })

  let repositories = await octokit.paginate(`GET /user/repos?type=all?visibility=all`, {
    owner: "octokit",
    repo: "rest.js",
  })

  res.status(200).send(repositories)
})


router.post("/analysis", async (req, res) => {

  const {key, owner, repoName} = req.body;
  
  const octokit = new Octokit({
    auth: key,
    userAgent: 'MarkerTool v1',
    baseUrl: 'https://api.github.com'
  })

  try {
    // let issues = await octokit.paginate(`GET /repos/${owner}/${repoName}/issues?state=all`, {
    //   owner: "octokit",
    //   repo: "rest.js",
    // })
    console.log("fuck")

    let pulls = await octokit.paginate(`GET /repos/${owner}/${repoName}/pulls?state=all`, {
      owner: "octokit",
      repo: "rest.js",
    })

  
    let pullInfo = await Promise.all(
      pulls.map(async issue => {
        let url = issue.review_comments_url.replace("https://api.github.com", "")
        let commentUrl = issue.comments_url.replace("https://api.github.com", "")
        
        //TODO: comments URL shows the same one 20 times....
        

        let comments = await octokit.paginate(`GET ${commentUrl}`, {
          owner: "octokit",
          repo: "rest.js",
        })

        let reviewComments = await octokit.paginate(`GET ${url}`, {
            owner: "octokit",
            repo: "rest.js",
        })
      
        return {
          pull: issue,
          reviewComments: reviewComments,
          comments: comments
        }
      })
    )
    res.status(200).send(pullInfo)
  } catch (err) {
    console.log(err)
    res.status(400).send("Something went wrong")
  }
})

router.post("/boards", async (req, res) => {

  let {access_token, clientId} = req.body;

  try {
    let boards = await axios.get(`https://api.atlassian.com/ex/jira/${clientId}/rest/api/2/project`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    res.status(201).send(boards.data)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }

})

router.post("/board/:boardName", async (req, res) => {
  let {access_token, clientId} = req.body;


  try {
    let board = await axios.get(`https://api.atlassian.com/ex/jira/${clientId}/rest/api/3/search?jql=project="${req.params.boardName}"`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    let fullBoardData = await Promise.all(
      board.data.issues.map( async issue => {

        const {assignee, summary, status} = issue.fields;

        console.log(issue.fields.assignee)

        let comments = await axios.get(`https://api.atlassian.com/ex/jira/${clientId}/rest/api/3/issue/${issue.id}/comment` , { headers: {
          'Authorization': `Bearer ${access_token}`
        }})

        let user;
        !assignee ? user = null : user = assignee.displayName

        return {
          user: user,
          key: issue.key,
          summary: summary,
          comments: comments.data.comments,
          status: status.name
        }
      })
    )

    res.status(201).send(fullBoardData)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})




router.post("/commits", async (req, res) => {

    const {key, owner, repoName} = req.body;

    const octokit = new Octokit({
        auth: key,
        userAgent: 'MarkerTool v1',
        baseUrl: 'https://api.github.com'
    })

    //Recieves all commits without limit of 100 (large repos)

    try {
      let commits = await octokit.paginate(`GET /repos/${owner}/${repoName}/commits`, {
        owner: "octokit",
        repo: "rest.js",
      })
      
      res.status(200).send(commits)
    }
    catch (err) {
      res.status(400).send(`Something went wrong: ${err}`)
    }
})

module.exports = router;
