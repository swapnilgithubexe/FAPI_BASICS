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
      const { id } = req.params;
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
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      if (!expenses) {
        res.status(400).send("No expenses found!");
      } else {
        res.status(200).send(expenses);
      }
    } catch (error) {
      res.status(400).send("Something is wrong with the databases!")
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const { id } = req.params;
      const { tag } = req.body;
      const result = await this.expenseRepository.addTagToExpense(id, tag);
      res.status(200).send(result)
    } catch (error) {
      console.log(error.message);
      res.status(400).send("Something is wrong with the database!")

    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const { minPrice, maxPrice, isRecurring } = req.query;
      const result = await this.expenseRepository.filterExpenses(minPrice, maxPrice, isRecurring);
      res.status(200).send(result)
    } catch (error) {
      res.status(400).send("Something is wrong with the database!")
    }
  };
}
