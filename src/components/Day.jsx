import React, { Component } from "react";
import DayItem from "./DayItem.jsx";
import { connect } from "react-redux";
import CircleIcon from "../../assets/circle.svg";
import CircleCheckedIcon from '../../assets/circle-checked.svg';

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
        <td className="calendar-title-day" style={{ background: this.state.checkDay ? 'gray' : 'white' }}>
          {DAYS_MAP[day]}
        </td>
        <td className="calendar-select-day" onClick={this.selectDay}>
        { this.state.checkDay ? <CircleIcon width={45} height={45} /> : <CircleCheckedIcon width={45} height={45} />}
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
