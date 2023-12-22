import moment from "moment";

export const formatDate = (dateString) => {
    const date = moment(dateString, "YYY-MM-DD");
    const formattedDate = date.format("DD MMM YY");
    return formattedDate;
};

export const formatTime = (timeString) => {
    const inputFormat = "HH:mm:ss";
    const momentTime = moment(timeString, inputFormat);
    const formattedTime = momentTime.format("hh:mm A");
    return formattedTime;
};