import React from "react";

export default function Event({ event }) {
  const getDate = date => {
    const monthObj = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December"
    };

    const getDay = day => {
      const dayObj = {
        0: "th",
        1: "st",
        2: "nd",
        3: "rd",
        4: "th",
        5: "th",
        6: "th",
        7: "th",
        8: "th",
        9: "th"
      };

      return day + dayObj[day.slice(1)];
    };

    const getTime = time => {
        let newTime = time.slice(0, 5)

         if(/00$/.test(newTime)){
            newTime = newTime.slice(0, 2)
        }

        newTime = newTime.replace(/:/g, ".")
        newTime = newTime.replace(/^0/g, "")

        if(+newTime.slice(0, 2) <= 12){
            newTime = newTime + "am"
        } else {
            newTime = newTime.replace(/\d+/g, x => +x - 12)
            newTime = newTime + "pm"
        }
       
        return " at " + newTime;
    }

    let newDate = new Date(date).toString().slice(0, -31);
    newDate = newDate.replace(/(\d{2})(?= \d{4})/g, x => getDay(x));
    newDate = newDate.replace(/^(\w+) /g, `$1day, `);
    newDate = newDate.replace(
      /(\w+)(?= \d{2}\w{2} \d{4})/g,
      x => monthObj[x] + " the "
    
    );
    newDate = newDate.replace(/\d+:\d+:\d+/g, x => getTime(x))

    return newDate;
  };

  return (
    <div>
      <h2>
        {event.name.text}
      </h2>
      <h3>{getDate(event.start.local)}</h3>
    </div>
  );
}
