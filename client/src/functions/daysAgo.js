function dynamicSetter(time, phrase) {
    //Helper function for dynamicSetter
    //Decides whether time is singular or plural
    // REQUIRED - phrase must be an array of 2 string values (strict)
    //            - First being the singular and second the plural
    if (time === 1) {
        return [time,  phrase[0]];
    } else {
        return [time, phrase[1]];
    }
}

function dynamicTime(dateString) {
    //Updates timestamp based on current time
        //  - Continues to update measurements of time until 10 days
        //  - Repopulates comment section with updated timestamps
    var then = new Date(dateString)
    var now = new Date();
    var time = 0;
    var difference = (Math.abs(now - then))/1000;
    if (difference < 60) {
        //Processes time difference in seconds
        var time = Math.floor(difference);
        return dynamicSetter(time, [" second ago", " seconds ago"]);
    } else if (difference < 3600) {
        //Processes time difference in minutes
        var time = Math.floor(difference/60);
        return dynamicSetter(time, [" minute ago", " minutes ago"]);
    } else if (difference < 86400) { 
        //Processes time difference in hours
        var time = Math.floor((difference/60)/60);
        return dynamicSetter(time, [" hour ago", " hours ago"]);
    } else if (difference >= 86400 && difference < 604800) {
        //Processes time difference in days for up to 7 days
        var time = Math.floor(((difference/60)/60)/24);
        return dynamicSetter(time, [" day ago", " days ago"]);
    } else if (difference < 2419200) {
        //Processes time difference in weeks for up to 4 weeks
        var time = Math.floor((((difference/60)/60)/24)/7);
        return dynamicSetter(time, [" week ago", " weeks ago"]);
    } else if (difference >= 2419200 && difference < 29030400) {
        //Processes time difference in months for up to 12 months
        var time = Math.floor(((((difference/60)/60)/24)/7)/4);
        return dynamicSetter(time, [" month ago", " months ago"]);
    } else if (difference > 29030400) {
        //Processes time in years
        var time = Math.floor((((((difference/60)/60)/24)/7)/4)/12);
        return dynamicSetter(time, [" year ago", " years ago"]);
    }
}

export default dynamicTime;