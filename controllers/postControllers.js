import Comment from "../models/commentModel.js";
import Like from "../models/likesModel.js";
import Post from "../models/postModel.js";

export const addPostHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.user.id);
    const post = await Post.create({
      title,
      description,
      userId: req.user.id,
    });

    if (post) {
      res.status(200).json({ msg: "Post created successfull", post });
    } else {
      res.status(400).json({ msg: "failed Post create", post });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
  }
};

export const deletePostHandler = async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await Post.destroy({
      where: {
        id: postId,
        userId: req.user.id,
      },
    });

    if (deletedPost) {
      res.status(200).json({ msg: "Post deleted successfull" });
    } else {
      res.status(400).json({ msg: "failed Post delete" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};

export const likePostHandler = async (req, res) => {
  try {
    const { postId } = req.params;

    const liked = await Like.create({
      postId,
      userId: req.user.id,
    });

    if (liked) {
      res.status(200).json({ msg: "Post liked successfull" });
    } else {
      res.status(400).json({ msg: "failed Post like" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};

export const unLikePostHandler = async (req, res) => {
  try {
    const { postId } = req.params;

    const unLikedPost = await Like.destroy({
      where: {
        postId,
        userId: req.user.id,
      },
    });

    if (unLikedPost) {
      res.status(200).json({ msg: "Post unliked successfull" });
    } else {
      res.status(400).json({ msg: "failed Post unlike" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};

export const commentPostHandler = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const postComment = await Comment.create({
      comment,
      postId,
      userId: req.user.id,
    });

    if (postComment) {
      res
        .status(200)
        .json({ msg: "Post commented successfull", postId: postComment._id });
    } else {
      res.status(400).json({ msg: "failed Post comment" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};

export const getSinglePostHandler = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);

    const likes = await Like.count({
      where: {
        postId,
      },
    });

    if (post) {
      res.status(200).json({ post, likes });
    } else {
      res.status(400).json({ msg: "failed Post comment" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};

export const getAllPostHandler = async (req, res) => {
  try {
    let allPost = await Post.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Like,
          attributes: ["id"],
        },
      ],
    });

    allPost = JSON.parse(JSON.stringify(allPost));

    const newPosts = allPost.map((e) => {
      const newObj = {};
      for (let key in e) {
        if (key === "likes") {
          newObj[key] = e["likes"].length;
        } else {
          newObj[key] = e[key];
        }
      }
      return newObj;
    });

    if (newPosts) {
      res.status(200).json(newPosts);
    } else {
      res.status(400).json({ msg: "failed Post comment" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};
