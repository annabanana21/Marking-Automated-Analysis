function rating(score) {
    switch(true) {
        case (score >= 11):
            return "Exemplary";
            break;
        case (score >= 8):
            return "Very Good";
        case (score >= 4):
            return "Satisfactory"
        case (score > 0):
            return "Limited"
        default:
            return "Incomplete"
    }

}

export default rating;