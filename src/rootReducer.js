import { combineReducers } from "redux";
import calendar from "./reducers/calendar";
import selectedRange from "./reducers/selectedRange";

const rootReducers = combineReducers({
  calendar,
  selectedRange
});

export default rootReducers;
