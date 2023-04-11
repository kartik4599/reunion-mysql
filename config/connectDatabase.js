import Sequelize from "sequelize";

const DataBase = new Sequelize({
  username: "root",
  password: "xIdCA3GQK8ZNpk0YUoO4",
  database: "railway",
  dialect: "mysql",
  host: "containers-us-west-5.railway.app",
  port: "7819",
});

export default DataBase;
