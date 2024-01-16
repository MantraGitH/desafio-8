import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { hashPassword, isValidPassword } from "../../../utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  }
  async register(user) {
    try {
      const { email, password } = user;
      const userExists = await this.getByEmail(email);
      if (!userExists) {
        user.password = hashPassword(password);
        const newUser = await this.model.create(user);
        const token = await this.#generateToken(newUser);
        return { message: "Registro Exitoso", user: newUser, token: token };
      } else {
        throw new Error("El user ya existe");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login(user) {
    try {
      const { email, password } = user;
      const userExists = await this.getByEmail(email);
      if (userExists) {
        if (isValidPassword(password, userExists)) {
          const token = await this.#generateToken(userExists);
          return { message: "Logeado correctamente", user: userExists, token: token };
        } else {
          throw new Error("Contraseña incorrecta");
        }
      } else {
        throw new Error("Usuario no existente");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getByEmail(email) {
    try {
      const userFound = await this.model.findOne({ email });
      if (!userFound) return false;
      else return userFound;
    } catch (error) {
      console.log(error);
    }
  }

  async #generateToken(user) {
    try {
      const payload = {
        id: user._id,
      };
      return jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
    } catch (error) {
      console.log(error);
    }
  }
}
