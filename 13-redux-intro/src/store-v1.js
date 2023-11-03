import { combineReducers, createStore } from 'redux';

// Account initial state
const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

// Customer initial state
const customerInitialState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

// Reducer function for Account
function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.laon > 0) return state;
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

// Reducer function for customer
function customerReducer(state = customerInitialState, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create the stores
const store = createStore(rootReducer);

// Dispatch functions for Account
function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}
store.dispatch(deposit(500));

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
store.dispatch(withdraw(200));
console.log(store.getState());

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}
store.dispatch(requestLoan(1000, 'Buy a car'));
console.log(store.getState());

function payLoan() {
  return { type: 'account/payLoan' };
}
store.dispatch(payLoan());
console.log(store.getState());

// Dispatch functions for customer
function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
store.dispatch(createCustomer('Martins Ndifn', '12345'));
console.log(store.getState());

function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName };
}
store.dispatch(updateName('Martins Ndifon'));
console.log(store.getState());
