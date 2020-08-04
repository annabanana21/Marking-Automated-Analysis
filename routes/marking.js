const express = require('express')
const router = express.Router()
const { Octokit } = require("@octokit/rest");


router.post("/commits", (req, res) => {

    const {key, owner, repoName} = req.body;

    const octokit = new Octokit({
        auth: key,
        userAgent: 'MarkerTool v1',
        baseUrl: 'https://api.github.com'
    })

    octokit.paginate(`GET /repos/${owner}/${repoName}/commits`, {
        owner: "octokit",
        repo: "rest.js",
      })
      .then((commits) => {
       console.log(commits)
       res.status(200).send(commits)
      });
})

module.exports = router;
