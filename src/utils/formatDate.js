import dayjs from "dayjs";

function formatDate(timestamp) {
    // Create a Day.js object from the timestamp
    // Assuming the timestamp is in milliseconds
    return dayjs(timestamp).format('DD.MM.YYYY, HH:mm') + ' Uhr';
}

export default formatDate;