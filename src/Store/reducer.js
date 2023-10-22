import { actions } from './actions';
import { combineReducers } from 'redux';

export const reducerCart = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_CART:
      let itemIndex = state.findIndex((el) => el.id === action.payload.id);
      if (itemIndex !== -1) {
        return state.map((item, index) => {
          if (index === itemIndex) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      } else {
        let item = { ...action.payload, qty: 1 };
        return [...state, item];
      }

    case actions.DELETE_CART:
      let itemIndexx = state.findIndex((el) => el.id === action.payload.id);
      if (itemIndexx !== -1) {
        return state
          .map((item, index) => {
            if (index === itemIndexx) {
              if (item.qty > 1) {
                return { ...item, qty: item.qty - 1 };
              } else {
                return null;
              }
            } else {
              return item;
            }
          })
          .filter((item) => item !== null);
      } else {
        return state;
      }

    case actions.ITEM_REMOVE_CART:
      return state.filter((el) => el.id !== action.payload.id);

    default:
      return state;
  }
};
export const reducerFav = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_FAV:
      return [...state, action.payload];
    case actions.DELETE_FAV:
      return state.filter((e) => e.id !== action.payload.id);

    default:
      return state;
  }
};

//dummy registration user
const registerdUser = [
  {
    userName: 'Bipul',
    email: 'bipul126@gmail.com',
    dob: '1999-11-30',
    password: 'Bipul@123',
    cPassword: 'Bipul@123',
  },
];

export const registration = (state = registerdUser, action) => {
  console.log('INSIDE REDUCER', action.payload);
  switch (action.type) {
    case actions.REGISTER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  reducerCart,
  reducerFav,
  registration,
});
