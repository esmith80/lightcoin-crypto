class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0;
    for (let transaction of this.transactions) {
      total += transaction.value;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {

    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      return;
    }
  }
}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {
  isAllowed() {
    return (this.account.balance - this.amount > 0) ? true : false;
  }

  get value() {
    return -this.amount;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
console.log(`Account Balance (${myAccount.username}):`, myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log(`Account Balance (${myAccount.username}):`, myAccount.balance);

t2 = new Deposit(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log(`Account Balance (${myAccount.username}):`, myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3', t3);
console.log(`Account Balance (${myAccount.username}):`, myAccount.balance);

t4 = new Withdrawal(500.00, myAccount);
t4.commit();
console.log('Transaction 4:', t4);
console.log(`Account Balance (${myAccount.username}):`, myAccount.balance);

t5 = new Withdrawal(129.99, myAccount);
t5.commit();
console.log('Transaction 5:', t5);
console.log(`Account Balance (${myAccount.username}):`, myAccount.balance);

