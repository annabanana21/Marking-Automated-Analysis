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

    console.log(amountWithTickets)

    for (let [key, value] of userMap) {

        //Create a stats value representing their overall score
        let rank = 0;

        if (value.pullRequests && value.tickets) {
            //Check if descriptive and grouped pulls to tickets
            console.log( markGetter(value.pullRequests.length, value.tickets.length))
            
        }
        

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

function markGetter(amount, compare) {
    let points = 0;
    if(amount >= compare) {
        console.log("Exemplary")
        points = 3;
    } else if (amount === compare-1) {
        console.log("Very Good")
        points = 2;
    } else if (amount >= compare-3) {
        console.log("Satisfactory")
        points = 1;
    } else if (amount > 0) {
        console.log("Limited")
        points = 0.5
    } 
    return points;
}

export default markSetter;