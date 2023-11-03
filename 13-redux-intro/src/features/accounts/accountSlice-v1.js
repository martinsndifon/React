// Account initial state
const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

// Reducer function for Account
export default function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

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

    case 'account/convertingCurrency':
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

// Dispatch functions for Account
function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    // API call
    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
      .then((res) => res.json())
      .then((data) => {
        // return action
        const converted = data.rates.USD;
        dispatch({ type: 'account/deposit', payload: converted });
      });
  };
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: 'account/payLoan' };
}

export { deposit, withdraw, requestLoan, payLoan };
