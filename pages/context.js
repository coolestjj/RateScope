import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-11-20'),
    category: 'Utilities',
    plan: 'None',
    rate: 'IL',
    type: 'expense',
  },
  {
    id: 'e2',
    description: 'house rent',
    amount: 1000.00,
    date: new Date('2023-11-20'),
    category: 'rent',
    plan: 'Monthly',
    rate: 'IL',
    type: 'expense',
  },
  {
    id: 'e3',
    description: 'Income',
    amount: 10000.00,
    date: new Date('2023-11-21'),
    category: 'Income',
    plan: 'Monthly',
    rate: 'None',
    type: 'income',
  },
  {
    id: 'e4',
    description: 'Uber',
    amount: 20.00,
    date: new Date('2023-11-20'),
    category: 'Transportation',
    plan: 'None',
    rate: 'None',
    type: 'expense',
  },
  {
    id: 'e5',
    description: 'Amazon Prime',
    amount: 15.00,
    date: new Date('2023-11-20'),
    category: 'Subscription',
    plan: 'Monthly',
    rate: 'IL',
    type: 'expense',
  },
  
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date, category, plan, rate, type}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date, category, plan, rate, type}) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;