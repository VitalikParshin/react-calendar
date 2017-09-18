import update from "immutability-helper";

export const ACTION_CLEAR_DAY = "calendar.ACTION_CLEAR_DAY";
export const ACTION_SELECT_DAY = "calendar.ACTION_SELECT_DAY";
export const ACTION_SELECT_CELL = "calendar.ACTION_SELECT_CELL";
export const ACTION_SAVE_SELECTED_RANGE = "calendar.ACTION_SAVE_SELECTED_RANGE";

const initialState = {
  0: [
    {
      bt: 240,
      et: 779
    }
  ],

  1: [],

  2: [],

  3: [
    {
      bt: 240,
      et: 779
    },
    {
      bt: 1140,
      et: 1319
    }
  ],

  4: [
    {
      bt: 660,
      et: 1019
    }
  ],

  5: [
    {
      bt: 0,
      et: 1439
    }
  ],

  6: []
};

const calendar = (state = initialState, action) => {
  let data = {};

  switch (action.type) {
    case ACTION_CLEAR_DAY:
      data[action.day] = { $set: [] };
      return update(state, data);

    case ACTION_SELECT_DAY:
      data[action.day] = { $set: [{ bt: 0, et: 1439 }] };
      return update(state, data);

    case ACTION_SELECT_CELL:
      data[action.day] = { $push: [{ bt: action.bt, et: action.et }] };
      return update(state, data);

    case ACTION_SAVE_SELECTED_RANGE:
      let days = Object.values(action.selectedRange.daysRange);
      const minDay = Math.min(...days);
      const maxDay = Math.max(...days);
      days = Array.from(new Array(maxDay + 1).keys()).filter(
        el => el >= minDay
      );

      const minutes = [
        action.selectedRange.minutesRange.start,
        action.selectedRange.minutesRange.end
      ];
      const minMinute = Math.min(...minutes);
      const maxMinute = Math.max(...minutes);
      days.map(el => {
        data[el] = {
          $push: [{ bt: minMinute, et: maxMinute }]
        };
      });
      return update(state, data);

    default:
      return state;
  }
};

export default calendar;
