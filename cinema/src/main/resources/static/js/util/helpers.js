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


const getDate = (startDate,endDate) => {
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
    const endDateObject = new Date(endDate);
    const startMonth = monthString[startDateObject.getMonth()];
    const endMonth = monthString[endDateObject.getMonth()];
    const startDay = startDateObject.getDate();
    const endDay = endDateObject.getDate();
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
}

export {shuffle, getDate}