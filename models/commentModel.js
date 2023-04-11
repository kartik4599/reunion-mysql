
import DataBase from "../config/connectDatabase.js";
import sequelize from "sequelize";

const Comment = DataBase.define("comment", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

export default Comment;
