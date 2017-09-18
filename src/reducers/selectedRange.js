import update from "immutability-helper";

export const ACTION_CLEAR_SELECTED_RANGE =
  "selectedRange.ACTION_CLEAR_SELECTED_RANGE";
export const ACTION_SELECT_DAY_ITEM = "selectedRange.ACTION_SELECT_DAY_ITEM";

const initialData = {
  daysRange: null, // i.e. { start: 0, end: 6 }
  minutesRange: null // i.e { start: 0, end: 3800 }
};

const selectedRange = (state = initialData, action) => {
  switch (action.type) {
    case ACTION_SELECT_DAY_ITEM:
      const { daysRange, minutesRange } = state;

      const startDay = daysRange ? daysRange.start : action.day;
      const startMinute = minutesRange ? minutesRange.start : action.minute;

      return update(state, {
        daysRange: {
          $set: {
            start: startDay,
            end: action.day
          }
        },
        minutesRange: {
          $set: {
            start: startMinute,
            end: action.minute
          }
        }
      });

    case ACTION_CLEAR_SELECTED_RANGE:
      return initialData;

    default:
      return state;
  }
};

export default selectedRange;
