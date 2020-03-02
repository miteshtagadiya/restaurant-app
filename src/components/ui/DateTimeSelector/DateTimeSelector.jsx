import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import "bootstrap/dist/css/bootstrap.css";
var moment = require("moment");
moment.updateLocale("en", {
  relativeTime: {
    future: "Last %s",
    past: "Last %s",
    s: " few seconds",
    ss: "%d seconds",
    m: " minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: " day",
    dd: "%d days",
    M: " month",
    MM: "%d months",
    y: " year",
    yy: "%d years",
  },
});

const DateTimeSelector = props => {
  return (
    <DateRangePicker
      autoApply={true}
      onApply={props.handleEvent}
      //linkedCalendars
      // timePicker
      maxDate={moment().add(1, "day")}
      startDate={props.startDate ? props.startDate : moment()}
      endDate={props.endDate ? props.endDate : moment()}
      ranges={
        props.ranges
          ? props.ranges
          : {
              Today: [moment(), moment()],
              Yesterday: [
                moment().subtract(1, "days"),
                moment().subtract(1, "days"),
              ],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [
                moment().startOf("month"),
                moment().endOf("month"),
              ],
              "Last Month": [
                moment()
                  .subtract(1, "month")
                  .startOf("month"),
                moment()
                  .subtract(1, "month")
                  .endOf("month"),
              ],
              "This Year": [moment().startOf("year"), moment()],
              "Last Year": [
                moment()
                  .subtract(1, "year")
                  .startOf("year"),
                moment()
                  .subtract(1, "year")
                  .endOf("year"),
              ],
            }
      }

      //template
      //showDropdowns
      //alwaysShowCalendars
    >
      {props.children}
    </DateRangePicker>
  );
};

export default DateTimeSelector;
