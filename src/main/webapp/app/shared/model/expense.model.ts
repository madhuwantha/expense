import { Moment } from 'moment';

export interface IExpense {
  id?: number;
  descripption?: string;
  amount?: number;
  expenseDate?: string;
}

export const defaultValue: Readonly<IExpense> = {};
