import { type } from '@testing-library/user-event/dist/type';
import { act } from 'react';
import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      //LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: 'account/deposit', payload: 500 });
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { amount: 1000, purpose: 'Buy a food' },
// });
// console.log(store.getState());
// store.dispatch({ type: 'account/payLoan' });
// console.log(store.getState());

const ACCOUNT_DEPOSIT = 'account/deposit';
const ACCOUNT_WITHDRAW = 'account/withdraw';
const ACCOUNT_REQUESTLOAN = 'account/requestLoan';
const ACCOUNT_PAYLOAN = 'account/payLoan';

function deposit(amount) {
  return { type: ACCOUNT_DEPOSIT, payload: amount };
}

function withdraw(amount) {
  return { type: ACCOUNT_WITHDRAW, payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_REQUESTLOAN,
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: ACCOUNT_PAYLOAN };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'for food'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: 'account/updateName', payload: fullName };
}

store.dispatch(createCustomer('Alina Levintas', '3465747'));
console.log(store.getState());
store.dispatch(deposit(243));
console.log(store.getState());
