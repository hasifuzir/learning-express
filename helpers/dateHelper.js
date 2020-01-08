//Return month as a string, optionally pass a date as a parameter
const getMonth = (date = null) => {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'August', 'November', 'December'];

    let myDate;

    if (date) {
        myDate = date;
    }
    else {
        myDate = new Date();
    }

    return monthList[myDate.getMonth()];
};

//Return today's date in the yyyy-mm-dd format string
const getDateNoTime = (date = new Date()) => {
    const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const mm = (date.getMonth() < 10 ? '0' : '') + ((date.getMonth() === 11 ? date.getMonth() : date.getMonth()+1));
    const yyyy = date.getFullYear();

    return (yyyy + '-' + mm + '-' + dd);
};

//Return date minus a year ago
//Params: date , defaults to today's date
const dateYearAgo = (date = new Date()) => {
    return new Date(date.setFullYear(date.getFullYear() - 1 ));
};

const dateEndOfMonth = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

//Return given date as a prettied string XX MONTH XXX format
const cleanDate = (date = new Date()) => {
    const myDate = new Date(date);

    const day = myDate.getDate();
    const month = getMonth(myDate);
    const year = myDate.getFullYear();

    return (day + ' ' + month + ' ' + year);
};

module.exports = {
    getMonth,
    getDateNoTime,
    cleanDate,
    dateYearAgo,
    dateEndOfMonth
};