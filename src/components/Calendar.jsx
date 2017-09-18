import React, { Component } from "react";
import { connect } from "react-redux";

import Day from "./Day.jsx";

class Calendar extends Component {
  render() {
    const { calendar } = this.props;
    return (
      <div className="App">
        <div>
          <h2>CALENDAR</h2>
        </div>
        <table className="calendar">
          <thead>
            <tr>
              <th />
              <th>ALLDAY</th>
              {[
                "00.00",
                "03.00",
                "06.00",
                "09.00",
                "12.00",
                "15.00",
                "18.00",
                "21.00"
              ].map((el, index) => (
                <th key={index} colSpan="3" className="calendar-header-cell">
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(calendar).map((day, index) => (
              <Day key={index} day={parseInt(day)} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  calendar: state.calendar
});

export default connect(mapStateToProps)(Calendar);
