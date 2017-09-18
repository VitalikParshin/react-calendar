import React, { Component } from "react";
import DayItem from "./DayItem.jsx";
import { connect } from "react-redux";

import { ACTION_CLEAR_DAY, ACTION_SELECT_DAY } from "../reducers/calendar.js";

const MINUTES = 60;
const HOURS = 24;

const DAYS_MAP = {
  0: "MO",
  1: "TU",
  2: "WE",
  3: "TH",
  4: "FR",
  5: "SA",
  6: "SU"
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkDay: false
    };
  }

  setHover = () => {
    this.setState({ hover: true });
  };

  selectDay = () => {
    const { day } = this.props;
    this.state.checkDay
      ? this.props.dispatch({ type: ACTION_CLEAR_DAY, day: day })
      : this.props.dispatch({ type: ACTION_SELECT_DAY, day: day });

    this.setState({ checkDay: !this.state.checkDay });
  };

  render() {
    const { day, calendar } = this.props;
    const minutesRange = Array.from(Array(HOURS).keys()).map(
      el => el * MINUTES
    );
    const ranges = calendar[day];

    return (
      <tr className="calendar-day">
        <td
          className="calendar-title-day"
          style={{ background: this.state.checkDay ? "gray" : "white" }}
        >
          {DAYS_MAP[day]}
        </td>
        <td className="calendar-select-day" onClick={this.selectDay}>
          {this.state.checkDay ? (
            <img
              alt="check-icon"
              src="http://www.iconsdb.com/icons/preview/gray/ok-xxl.png"
              width="30px"
            />
          ) : (
            <img
              alt="circle"
              src="http://media-s3-us-east-1.ceros.com/orange-tap/images/2017/05/04/2f00558d82b1c2c36d7a64951e162c90/circle-gray.png"
              width="30px"
            />
          )}
        </td>
        {minutesRange.map((minute, index) => (
          <DayItem
            key={index}
            day={day}
            minute={minute}
            itemRanges={calendar[day]}
          />
        ))}
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  calendar: state.calendar
});

export default connect(mapStateToProps)(Day);
