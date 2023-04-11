import DataBase from "../config/connectDatabase.js";
import sequelize from "sequelize";

const Followers = DataBase.define("follower", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  followerId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

export default Followers;
