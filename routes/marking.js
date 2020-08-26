const express = require('express')
const router = express.Router()
const { Octokit } = require("@octokit/rest");


const infoGetter = async(octokit, owner, repoName) => {
  
}


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
      res.status(200).send([commits, pullInfo])
    }
    catch (err) {
      res.status(400).send("Something went wrong")
    }
})

module.exports = router;
