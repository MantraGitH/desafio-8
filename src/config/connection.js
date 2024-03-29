import { connect } from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGO_URL;

export class ConnectMongoDB {
  static #instance;

  constructor() {
    connect(connectionString);
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Estás conectado a Mongo");
      return this.#instance;
    } else {
      this.#instance = new ConnectMongoDB();
      console.log("Conectado a Mongo");
      return this.#instance;
    }
  }
}
