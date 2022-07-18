const h_alnwickcastle = require("../data/haymarketbusstn/h_alnwickcastle.js");
const h_aucklandcastle = require("../data/haymarketbusstn/h_aucklandcastle.js");
const h_bamburghcastle = require("../data/haymarketbusstn/h_bamburghcastle.js");
const h_barnardcastle = require("../data/haymarketbusstn/h_barnardcastle.js");
const e_alnwickcastle = require("../data/eldonsquarebusstn/e_alnwickcastle.js");
const e_aucklandcastle = require("../data/eldonsquarebusstn/e_aucklandcastle.js");
const e_bamburghcastle = require("../data/eldonsquarebusstn/e_bamburghcastle.js");
const e_barnardcastle = require("../data/eldonsquarebusstn/e_barnardcastle.js");

function checkRequestedCastle(srcselected, destselected) {
  if (srcselected === "haymarketbusstn") {
    if (destselected === "alnwickcastle") {
      return h_alnwickcastle;
    } else if (destselected === "aucklandcastle") {
      return h_aucklandcastle;
    } else if (destselected === "bamburghcastle") {
      return h_bamburghcastle;
    } else if (destselected === "barnardcastle") {
      return h_barnardcastle;
    } else {
      return null;
    }
  } else if (srcselected === "eldonsquarebusstn") {
    if (destselected === "alnwickcastle") {
      return e_alnwickcastle;
    } else if (destselected === "aucklandcastle") {
      return e_aucklandcastle;
    } else if (destselected === "bamburghcastle") {
      return e_bamburghcastle;
    } else if (destselected === "barnardcastle") {
      return e_barnardcastle;
    } else {
      return null;
    }
  }
}

function checkWeekdayOrWeekend(checkCastle, date) {
  const onward_journey_weekday = checkCastle.find(
    (output_onward_arr) => output_onward_arr.timingsdaytype === "weekday"
  );

  const onward_journey_saturday = checkCastle.find(
    (output_onward_arr) => output_onward_arr.timingsdaytype === "saturday"
  );

  const onward_journey_sunday = checkCastle.find(
    (output_onward_arr) => output_onward_arr.timingsdaytype === "sunday"
  );

  if (date === "weekday") {
    return onward_journey_weekday;
  } else if (date === "saturday") {
    return onward_journey_saturday;
  } else if (date === "sunday") {
    return onward_journey_sunday;
  } else {
    return { error: "Invalid date" };
  }
}

function journeyfilter(srcselected, destselected, date, time) {
  const checkCastle = checkRequestedCastle(srcselected, destselected);
  if (!checkCastle) {
    return { error: "Invalid source or destination" };
  }

  const checkDay = checkWeekdayOrWeekend(checkCastle, date);
  if (!checkDay) {
    return { error: "Invalid date" };
  }

  const checkTime_onward = (checkDay.bustimings || []).filter(
    (output_onward_arr) => {
      return output_onward_arr.typeofjourneyname === "onward";
    }
  );

  const checkTime_return = (checkDay.bustimings || []).filter(
    (output_return_arr) => {
      return output_return_arr.typeofjourneyname === "return";
    }
  );

  const checkTime_onward_time = checkTime_onward.map((output_onward_arr) => {
    return (output_onward_arr.timingsofbuses || []).filter(
      (output_onward_arr_time) => {
        return output_onward_arr_time.journeystarttime >= time;
      }
    );
  });

  let checkTime_return_time = [];

  if (checkTime_onward_time.length > 0) {
    if (checkTime_onward_time[0].length > 0) {
      checkTime_return_time = checkTime_return.map((output_return_arr) => {
        return (output_return_arr.timingsofbuses || []).filter(
          (output_return_arr_time) => {
            return (
              output_return_arr_time.journeystarttime >=
              (parseInt(checkTime_onward_time[0][0].journeyendtime, 10) +
                parseInt(200, 10)) %
                parseInt(2400, 10)
            );
          }
        );
      });
    }
    return { checkTime_onward_time, checkTime_return_time };
  } else {
    return {
      checkTime_onward_time: { message: "Invalid date" },
      checkTime_return_time: { message: "Invalid date" },
    };
  }
}

function journeydata(srcselected, destselected, date, time, res) {
  const journeydata = journeyfilter(srcselected, destselected, date, time);

  if (!Object.keys(journeydata).length) {
    res.status(404).send("No journey found");
  } else {
    res.status(200).send(journeydata);
  }
}

module.exports = journeydata;
