import markSetter from '../functions/markSetter';

function repoAnalysis(repoState) {

    // Object will hold the names and related data to each collaborator
    let workers = new Map();
    // Ticket list including all Jira tickets with relevant pull request links
    let ticketList = [];
        //Adding commit statistics
        repoState.commits.forEach(commit => {
            if (commit.commit.author) {
                let user;
                commit.author ? user = commit.author.login : user = commit.commit.author.name;
                addToMap(workers, user, "commits")
                
            } 
        })

        //Adding pull request statistics
        repoState.pulls.forEach(pull => {
            
            const {user, body, title, state, html_url} = pull.pull
            
            const pullBody = {
                body: body,
                title: title,
                state: state,
                html_url: html_url,
            }

            // If associated user
            if (user) {
                let userName = user.login
                addToMapArray(workers, userName, "pullRequests", pullBody)
                if (body) {
                    addToMap(workers, userName, "pullComment")
                }
            }

            // If the pull request has general comments add these to the breakdown
            if (pull.comments) {
                pull.comments.forEach(comment => {
                    let userName = comment.user.login;
                    let {body, id} = comment;
                    addToMapArray(workers, userName, "comments", {body, id})
                })
            }

            // If the pull request has review comments add these to the breakdown
            if (pull.reviewComments) {
                pull.reviewComments.forEach(comment => {
                    let userName = comment.user.login;
                    let {body, id} = comment;
                    addToMapArray(workers, userName, "reviewComments", {body, id})
                })
            }

        })

        //Adding ticket statistics
        repoState.tickets.forEach(ticket => {
            if (ticket.comments) {
                ticket.comments.forEach(comment => {
                    addToMapArray(workers, comment.author.displayName, "ticketComments", comment)
                })
            }
            // Number associated with pull requests (last two digits of ticket key)
            let ticketNumber = Number(ticket.key.substring(ticket.key.length-2, ticket.key.length));
            let associated = findAssociated(ticketNumber, repoState.pulls)
            ticketList.push({...ticket, ticketNumber, associated})
            // If the ticket had an assignee, add it to the breakdown
            if (ticket.user) {
                ticket.pulls = associated
                addToMapArray(workers, ticket.user, "tickets", ticket)
            }
        })

        console.log("before merge: ", workers);

        let updated = combineNames(workers);


        return [markSetter(updated, repoState.pulls, repoState.tickets), ticketList.reverse()];
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
    // Combine names searches for similarities between two strings
    // If three consecutive letters match three in the other string combine statistics
    // Obvious flaws, what if two people are named Sam?
    let count = 0;
    let workersArray = [...workers]
    while (count < workersArray.length) {
        let deleted = false;
        let userName = workersArray[count][0]
        for (let i = 0; i < workersArray.length; i++) {
            let compare = workersArray[i][0]
            if (userName !== compare && similarCheck(userName, compare)) {
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

const findAssociated = (ticketId, pulls) => {
    return pulls.filter(pull => pull.pull.title.includes(ticketId))
}

const similarCheck = (name1, name2) => {
    let similar = false
    let start = 0;
    let end = 3;
    while (end <= name1.length) {
        if (name2.toLowerCase().includes(name1.toLowerCase().substring(start, end))) {
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