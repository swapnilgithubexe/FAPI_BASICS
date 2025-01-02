export default class ExpenseModel {
  constructor(title, amount, date, isRecurring, tags) {
    this.title = title;
    this.amount = amount;
    this.date = date;
    this.isRecurring = isRecurring;
    this.tags = tags;
  }
}
