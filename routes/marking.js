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
    let issues = await octokit.paginate(`GET /repos/${owner}/${repoName}/issues?state=all`, {
      owner: "octokit",
      repo: "rest.js",
    })
  
    let pullInfo = await Promise.all(
      issues.map(async issue => {
        let url = issue.comments_url.replace("https://api.github.com", "")
        let comments = 0;
        if (issue.comments > 0) {
          comments = await octokit.paginate(`GET ${url}`, {
            owner: "octokit",
            repo: "rest.js",
          })
        }
        return {
          pull: issue,
          comments: comments
        }
      })
    )
    res.status(200).send(pullInfo)
  } catch (err) {
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
      res.status(400).send("Something went wrong")
    }
})

module.exports = router;
