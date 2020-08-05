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

    //Recieves all commits without limit of 100 (large repos)
    octokit.paginate(`GET /repos/${owner}/${repoName}/commits`, {
        owner: "octokit",
        repo: "rest.js",
      })
      .then(commits => {
        res.status(200).send(commits)
      })
      .catch(error => {
        res.status(400).send(error)
      });
})

module.exports = router;
