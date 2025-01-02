import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const { title, amount, date, isRecurring, tags } = req.body;
      const expense = {
        title: title,
        amount: amount,
        date: date,
        isRecurring: isRecurring,
        tags: tags
      };

      const result = await this.expenseRepository.addExpense(expense);
      res.status(201).send(result);

    } catch (error) {
      console.log(error.message);
      res.status(400).send("Something is wrong with the database!");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try {
      const { id } = req.params.id;
      const expense = await this.expenseRepository.getOne(id);
      if (!expense) {
        res.status(400).send("No data found!")
      } else {
        res.status(200).send(expense);
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).send("Something is wrong with the database!")

    }
  };

  // Get all expenses
  getAll = async (req, res) => { };

  // Add a tag to an expense
  addTag = async (req, res) => { };

  // Filter expenses based on given criteria
  filter = async (req, res) => { };
}
