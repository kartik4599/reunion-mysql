// import mongoose from "mongoose";

// const postModel = mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     likes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// const Post = mongoose.model("Post", postModel);

// export default Post;

import DataBase from "../config/connectDatabase.js";
import sequelize from "sequelize";

const Post = DataBase.define("post", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

export default Post;
