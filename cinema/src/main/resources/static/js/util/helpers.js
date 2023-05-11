function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


const getDate = (startDate,endDate, flag) => {
    const monthString = ["cічня",
                        "лютого",
                        "березня",
                        "квітня",
                        "травня",
                        "червня",
                        "липня",
                        "серпня",
                        "вересня",
                        "жовтня",
                        "листопада",
                        "грудня"];

    const startDateObject = new Date(startDate);
    const startMonth = monthString[startDateObject.getMonth()];
    const startDay = startDateObject.getDate();

    if (flag) {
        const endDateObject = new Date(endDate);
        const endMonth = monthString[endDateObject.getMonth()];
        const endDay = endDateObject.getDate();
        return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    } else {
        return `${startDay} ${startMonth}`;
    }
}




function redirect(endpoint){
    let paths = window.location;
    let url = `${paths.origin}/${endpoint}`;
    return url;

//for page redirect use window.location.href = url
}


export {shuffle, getDate, redirect}