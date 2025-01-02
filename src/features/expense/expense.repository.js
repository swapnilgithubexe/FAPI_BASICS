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

      return await collection.findById(id)
    } catch (error) {
      console.log(error.message);

    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      return await collection.find()
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

      return "Tags added successfully"
    } catch (error) {
      console.log(error.message);

    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {

  }
}

export default ExpenseRepository;
