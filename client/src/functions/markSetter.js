function markSetter(userMap, pulls, tickets) {
    //TODO:
    // Cycles through user map
    // User receives amount of "points" based of frequency of participation
    //      points >= 11 Exemplary
    //      points >= 8 Very Good
    //      points >= 4 Satisfactory 
    //      points > 0 Limited
    //      else Incomplete 

    let amountWithTickets = ticketers(userMap)

    for (let [key, value] of userMap) {

        //Create a stats value representing their overall score
        let rank = 0;
        let recommendations = [];

        if (value.pullRequests && value.tickets) {
            //Check if descriptive and grouped pulls to tickets
            let result = markGetter(value.pullRequests.length, value.tickets.length, [3.5, 3, 1, 0.5]);
            if (result <= 1) {
                recommendations.push('Remember to open a pull request for each feature!')
            }
            rank += result;
        }

        if (value.tickets) {
            let amount = (tickets.length-4)/amountWithTickets;
            rank+= markGetter(value.tickets.length, amount, [3.5, 3, 1, 0.5])
        }

        if (value.comments || value.reviewComments) {
            let comments;
            let review;
            value.comments ? comments = value.comments.length : comments = 0;
            value.reviewComments ? review = value.reviewComments.length : review = 0;
            if (value.pullRequests) {
                let result= percentGetter(comments+review, pulls.length-value.pullRequests.length, [3, 2, 1, 0.5]);
                if (result <= 1) {
                    recommendations.push("Try to be more active on GitHub. You can directly view the changes made by a group member and create review comments to help them fix bugs.")
                }
                rank+= result;
            }
        }


            // Based on number of tickets commented on receive score

            //Checks for the absence of ticket comments ot pulls
            let ticketNumber;
            value.ticketComments ? ticketNumber = value.ticketComments.length : ticketNumber = 0;
            let personPulls;
            value.pullRequests ? personPulls = value.pullRequests.length : personPulls = 0;

            // result represents score after checking for the percentage of tickets commented on
            let result = percentGetter(ticketNumber, tickets.length-4-personPulls, [3, 2, 1, 0.5]);
            if (result <= 1) {
                recommendations.push("Remember to comment on Jira tickets before they are moved into 'Done'");
            }

            rank+= result;


        value["ranking"] = rank
        value['rec'] = recommendations
        

    }

    return userMap
}

function ticketers(map) {
    let count = 0;
    for (let [key, value] of map) {
        if (value.tickets) {
            count++
        }
    }
    return count;
}

function percentGetter(amount, compare, pointList) {
    let points = 0;
    if(amount >= compare*0.75) {
        points = pointList[0];
    } else if (amount === compare*0.60) {
        points = pointList[1];
    } else if (amount >= compare*0.25) {
        points = pointList[2];
    } else if (amount > 0) {
        points = pointList[3]
    } 
    return points;
}

function markGetter(amount, compare, pointList) {
    let points = 0;
    if(amount >= compare) {
        points = pointList[0];
    } else if (amount === compare-1) {
        points = pointList[1];
    } else if (amount >= compare-3) {
        points = pointList[2];
    } else if (amount > 0) {
        points = pointList[3]
    } 
    return points;
}

export default markSetter;