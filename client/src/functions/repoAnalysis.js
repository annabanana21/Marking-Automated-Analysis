function repoAnalysis(repoState) {

    // Object will hold the names and related data to each collaborator
    let workers = {};
        //Adding commit statistics
        repoState.commits.forEach(commit => {
            if (commit.author) {
                let user = commit.author.login
                addToObject(workers, user, "commits")
            } 
        })

        //Adding pull request statistics
        repoState.pulls.forEach(pull => {
            const {user, body} = pull.pull

            if (user) {
                let userName = user.login
                addToObject(workers, userName, "pullRequests")
                if (body) {
                    addToObjectArray(workers, userName, "pullComment", body)
                }
            }

            if (pull.comments !== 0) {
                pull.comments.forEach(comment => {
                    let userName = comment.user.login;
                    let body = comment.body;
                    addToObjectArray(workers, userName, "comments", body)
                })
            }

        })

        return workers;
}

function addToObject(workers, user, stat) {
    if (!workers[user]) {
        workers[user] = {}
        workers[user][stat] = 1
    } else if (!workers[user][stat]) {
        workers[user][stat] = 1
    } else {
        workers[user][stat]++
    }
}

function addToObjectArray(workers, user, stat, body) {
    if (!workers[user][stat]) {
        workers[user][stat] = [body]
    } else {
        workers[user][stat].push(body)
    }
}

export default repoAnalysis;