import React, { Component } from "react";
import { connect } from "react-redux";

import {
  ACTION_SELECT_DAY_ITEM,
  ACTION_CLEAR_SELECTED_RANGE
} from "../reducers/selectedRange";

import { ACTION_SAVE_SELECTED_RANGE } from "../reducers/calendar";

const inRange = (value, range) => {
  if (!range) return false;
  const values = [range.start, range.end];
  const min = Math.min(...values);
  const max = Math.max(...values);
  return value >= min && value <= max;
};

class DayItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: true
    };
  }

  handleMouseDown = () => {
    const { day, minute } = this.props;
    this.props.dispatch({ type: ACTION_SELECT_DAY_ITEM, day, minute });
  };

  handleMouseOver = () => {
    const { selectedRange: { daysRange } } = this.props;
    if (!daysRange) {
      return;
    }

    const { day, minute } = this.props;
    this.props.dispatch({ type: ACTION_SELECT_DAY_ITEM, day, minute });
  };

  handleMouseUp = () => {
    const { selectedRange, dispatch } = this.props;
    dispatch({
      type: ACTION_SAVE_SELECTED_RANGE,
      selectedRange: selectedRange
    })
    dispatch({ type: ACTION_CLEAR_SELECTED_RANGE });
  };

  inSelectedRange = () => {
    const { day, minute, selectedRange } = this.props;
    const { daysRange, minutesRange } = selectedRange;
    return inRange(day, daysRange) && inRange(minute, minutesRange);
  };

  inCalendar = () => {
    const { minute, itemRanges } = this.props;
    return (
      itemRanges.filter(range => {
        return range.bt <= minute && minute <= range.et;
      }).length >= 1
    );
  };

  render() {
    const { minute, day, selectedRange } = this.props;
    return (
      <td
        className="day-item"
        style={{
          background:
            this.inSelectedRange() || this.inCalendar() ? "gray" : "white"
        }}
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        onMouseUp={this.handleMouseUp}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedRange: state.selectedRange
});

export default connect(mapStateToProps)(DayItem);
