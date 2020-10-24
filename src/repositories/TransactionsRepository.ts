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

    const { income, outcome } = this.transactions.reduce((accumutator: Balance, transaction: Transaction) => {

      switch( transaction.type )
      {
        case "income" :
          accumutator.income += transaction.value;
          break;
        case "outcome" :
          accumutator.outcome += transaction.value;
          break;
      }

      return accumutator;
      
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    const total = income - outcome;
    return {income, outcome, total};
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {

    if( !['income', 'outcome'].includes(type) )
      throw new Error("Transaction type is invalid");

    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
