function repoAnalysis(repoState) {

    // Object will hold the names and related data to each collaborator
    let workers = new Map();
    // let ticketList = new Map();
        //Adding commit statistics
        repoState.commits.forEach(commit => {
            if (commit.commit.author) {
                let user;
                commit.author ? user = commit.author.login : user = commit.commit.author.name;
                addToMap(workers, user, "commits")
            } 
        })

        console.log(repoState.pulls[0])

        //Adding pull request statistics
        repoState.pulls.forEach(pull => {
            const {user, body, title, state, html_url} = pull.pull
            
            const pullBody = {
                body: body,
                title: title,
                state: state,
                html_url: html_url,
            }

            if (user) {
                let userName = user.login
                addToMapArray(workers, userName, "pullRequests", pullBody)
                if (body) {
                    addToMap(workers, userName, "pullComment")
                }
            }

            if (pull.comments !== 0) {
                pull.comments.forEach(comment => {
                    let userName = comment.user.login;
                    let body = comment.body;
                    addToMapArray(workers, userName, "comments", body)
                })
            }

        })

        //Adding ticket statistics
        repoState.tickets.forEach(ticket => {
            if (ticket.fields.assignee) {
                const user = ticket.fields.assignee.displayName;
                const {summary, status} = ticket.fields
                const {key} = ticket;
                const ticketBody = {
                    title: summary,
                    status: status,
                    id: key.substring(key.length-2, key.length),
                    
                }

                ticketBody.pulls = findAssociated(ticketBody, repoState.pulls)
                
                addToMapArray(workers, user, "tickets", ticketBody)
            }
        })


        return combineNames(workers);
}

function addToMap(workers, user, stat) {
    if (!workers.has(user)){
        workers.set(user, {})
        workers.get(user)[stat] = 1
    }
    else if (!workers.get(user)[stat]) {
        workers.get(user)[stat] = 1
    } else {
        workers.get(user)[stat]++
    }
}

function addToMapArray(workers, user, stat, body) {
    if (!workers.has(user)){
        workers.set(user, {})
        workers.get(user)[stat] = [body]
    }
    else if (!workers.get(user)[stat]) {
        workers.get(user)[stat] = [body]
    } else {
        workers.get(user)[stat].push(body)
    }
}

const combineNames = (workers) => {
    let count = 0;
    let workersArray = [...workers]
    while (count < workersArray.length) {
        let deleted = false;
        let userName = workersArray[count][0]
        for (let i = 0; i < workersArray.length; i++) {
            let compare = workersArray[i][0]
            if (userName !== compare && similarCheck(userName, compare)) {
                console.log(`${userName} and ${compare} and ${count}`)
                deleted = true
                let firstStats = workersArray[count][1]
                if (firstStats.tickets) {
                    workersArray[count][1] = {...firstStats, ...workersArray[i][1]}
                    workersArray.splice(i, 1)
                } else {
                    workersArray[i][1] = {...firstStats, ...workersArray[i][1]}
                    workersArray.splice(count, 1)
                }
                break;
            } 
        }
        if (!deleted) {
            count++
        }
    }
    return new Map(workersArray)
}

const findAssociated = (ticket, pulls) => {
    let count = 0;
    let associated = []
    while (count < pulls.length) {
        if (pulls[count].pull.title.includes(ticket.id)) {
            const {body, title, state, html_url} = pulls[count].pull
            associated.push({
                body: body,
                title: title,
                state: state,
                html_url: html_url,
            })
        }

        count++
    }

    return associated
}

const similarCheck = (name1, name2) => {
    let similar = false
    let start = 0;
    let end = 3;
    while (end <= name1.length) {
        if (name2.includes(name1.substring(start, end))) {
            similar = true
            break;
        } else {
            start++
            end++
        }
    }

    return similar;
}

export default repoAnalysis;