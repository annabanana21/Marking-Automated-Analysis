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

        if (value.pullRequests && value.tickets) {
            //Check if descriptive and grouped pulls to tickets
            rank += markGetter(value.pullRequests.length, value.tickets.length);
        }

        if (value.tickets) {
            let amount = (tickets.length-4)/amountWithTickets;
            rank+= markGetter(value.tickets.length, amount)
        }

        if (value.comments || value.reviewComments) {
            let comments;
            let review;
            value.comments ? comments = value.comments.length : comments = 0;
            value.reviewComments ? review = value.reviewComments.length : review = 0;
            if (value.pullRequests) {
                rank+= percentGetter(comments+review, pulls.length-value.pullRequests.length)
            }
        }

        if (value.ticketComments) {
            let personPulls;
            value.pullRequests ? personPulls = value.pullRequests.length : personPulls = 0;
            rank+= percentGetter(value.ticketComments.length, tickets.length-4-personPulls)
        }

        console.log(key, " ", rank)
        

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
        points = 3;
    } else if (amount === compare*0.60) {
        points = 2;
    } else if (amount >= compare*0.25) {
        points = 1;
    } else if (amount > 0) {
        points = 0.5
    } 
    return points;
}

function markGetter(amount, compare, pointList) {
    let points = 0;
    if(amount >= compare) {
        points = 3;
    } else if (amount === compare-1) {
        points = 2;
    } else if (amount >= compare-3) {
        points = 1;
    } else if (amount > 0) {
        points = 0.5
    } 
    return points;
}

export default markSetter;