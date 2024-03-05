import create from 'zustand';

type MonthlyExpense = {
  account: string;
  item: string;
  dueDate: string;
  amount: number;
};

type MonthlySaving = {
  account: string;
  amount: number;
};

type MonthlyIncome = {
  source: string;
  amount: number;
};

type FinanceState = {
  monthlyExpenses: MonthlyExpense[];
  monthlySavings: MonthlySaving[];
  monthlyIncomes: MonthlyIncome[];
};

type FinanceActions = {
  getTotalMonthlyExpenses: () => number;
  getTotalMonthlySavings: () => number;
  getTotalMonthlyIncomes: () => number;
  addMonthlyExpense: (expense: MonthlyExpense) => void;
  addMonthlySaving: (saving: MonthlySaving) => void;
  addMonthlyIncome: (income: MonthlyIncome) => void;
  removeMonthlyExpense: (expense: MonthlyExpense) => void;
  removeMonthlySaving: (saving: MonthlySaving) => void;
};

const initialMonthlyExpenses: MonthlyExpense[] = [
  {
    account: 'Säästöpankki',
    item: 'Appartement',
    dueDate: '2nd',
    amount: 587.0,
  },
  {
    account: 'Säästöpankki',
    item: 'House charges',
    dueDate: '2nd',
    amount: 182.5,
  },
  {
    account: 'Säästöpankki',
    item: 'House insurance',
    dueDate: '2nd',
    amount: 10.5,
  },
  {
    account: 'Crédit Agricole',
    item: 'Student loan',
    dueDate: '15st',
    amount: 512.75,
  },
  { account: 'Nordea', item: 'HSL', dueDate: '14th', amount: 82.8 },
  { account: 'Nordea', item: 'Netflix', dueDate: '3rd', amount: 11.99 },
  {
    account: 'Säästöpankki',
    item: 'Shared account transfer',
    dueDate: '1st',
    amount: 350.0,
  },
  {
    account: 'Français',
    item: 'Prélèvement Predica Prevoyance',
    dueDate: '30th',
    amount: 9.53,
  },
  {
    account: 'Crédit Agricole',
    item: 'Charity transfer',
    dueDate: '19th',
    amount: 15.0,
  },
  {
    account: 'Säästöpankki',
    item: 'Personal fun (in Green got)',
    dueDate: '1st',
    amount: 300.0,
  },
  {
    account: 'Green got',
    item: 'Bank cost',
    dueDate: '6th',
    amount: 6.0,
  },
];

const initialMonthlySavings: MonthlySaving[] = [
  { account: 'Säästöpankki', amount: 100.0 },
  { account: 'Crédit Agricole', amount: 350.0 },
  { account: 'Green got', amount: 50.0 },
];

const initialMonthlyIncomes: MonthlyIncome[] = [
  { source: 'Salary', amount: 2840.62 },
  { source: 'Freelance', amount: 0.0 },
  { source: 'Interest', amount: 0.0 },
];

const financeStore = create<FinanceState & FinanceActions>((set, get) => ({
  monthlyExpenses: initialMonthlyExpenses,
  monthlySavings: initialMonthlySavings,
  monthlyIncomes: initialMonthlyIncomes,

  getTotalMonthlyExpenses: () =>
    get().monthlyExpenses.reduce((acc, expense) => acc + expense.amount, 0),

  getTotalMonthlySavings: () =>
    get().monthlySavings.reduce((acc, saving) => acc + saving.amount, 0),

  getTotalMonthlyIncomes: () =>
    get().monthlyIncomes.reduce((acc, income) => acc + income.amount, 0),

  addMonthlyExpense: (expense: MonthlyExpense) => {
    set((state) => ({ monthlyExpenses: [...state.monthlyExpenses, expense] }));
  },

  addMonthlySaving: (saving: MonthlySaving) => {
    set((state) => ({ monthlySavings: [...state.monthlySavings, saving] }));
  },

  addMonthlyIncome: (income: MonthlyIncome) => {
    set((state) => ({ monthlyIncomes: [...state.monthlyIncomes, income] }));
  },

  removeMonthlyExpense: (expense: MonthlyExpense) => {
    set((state) => ({
      monthlyExpenses: state.monthlyExpenses.filter((e) => e !== expense),
    }));
  },

  removeMonthlySaving: (saving: MonthlySaving) => {
    set((state) => ({
      monthlySavings: state.monthlySavings.filter((s) => s !== saving),
    }));
  },
}));

export const useFinanceStore = financeStore;
