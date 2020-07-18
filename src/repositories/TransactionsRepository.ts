import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();
    const incomeSum = transactions.reduce(
      (sum: number, transaction: Transaction) => {
        if (transaction.type === 'income') {
          return sum + transaction.value;
        }
        return sum;
      },
      0,
    );
    const outcomeSum = transactions.reduce(
      (sum: number, transaction: Transaction) => {
        if (transaction.type === 'outcome') {
          return sum + transaction.value;
        }
        return sum;
      },
      0,
    );

    const balance: Balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
