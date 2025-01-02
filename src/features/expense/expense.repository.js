import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      await collection.insertOne(expense);
      return expense;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      return await collection.findOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.log(error.message);

    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      const expenses = await collection.find().toArray()
      return expenses;
    } catch (error) {
      console.log(error.message);

    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      await collection.updateOne({ _id: new ObjectId(id) }, {
        $push: { tags: tag }
      })

      return "Tags added successfully."
    } catch (error) {
      console.log(error.message);

    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(minAmount, maxAmount, isRecurring) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      const filterExpression = {};

      if (minAmount) {
        filterExpression.amount = { $gte: parseFloat(minAmount) }
      }
      if (maxAmount) {
        filterExpression.amount = { $lte: parseFloat(maxAmount) }
      }
      if (isRecurring) {
        filterExpression.isRecurring = { $eq: isRecurring }
      }
      const filteredExpenses = await collection.find(filterExpression).toArray();
      return filteredExpenses;
    } catch (error) {
      return "Something is wrong with the databases!"
    }
  }

}

export default ExpenseRepository;
