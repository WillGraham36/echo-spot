import { time } from "console";

/**
 * Utility function for comparing the date to the current date, useful for posts in the feed
 * @param compToDate: Date
 * @returns String stating how many minutes / hours / days ago the passed in date was compared to the current date
 */
const CalculteTimeDiff = ({compToDate}: {compToDate: Date}): String => {

    const utcCompToDate = new Date(compToDate.toUTCString());
    const utcCurrentDate = new Date(new Date().toUTCString());

    //in minutes
    let timeDiff = Math.floor((utcCurrentDate.getTime() - utcCompToDate.getTime()) / (1000 * 60));
    if(timeDiff < 1) {
        return "Just now";
    }
    if(timeDiff < 60) {
        return timeDiff + "m";
    }

    //to hours
    timeDiff = Math.floor(timeDiff / 60);

    if(timeDiff < 24) {
        return timeDiff + "h";
    }

    //to days
    return Math.floor(timeDiff / 24) + "d";
}

export default CalculteTimeDiff