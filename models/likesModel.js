import DataBase from "../config/connectDatabase.js";
import sequelize from "sequelize";

const Like = DataBase.define("like", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default Like;
