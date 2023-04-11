import Followers from "../models/followersModel.js";

export const userHandler = async (req, res) => {
  try {
    const { name, id } = req.user;

    const followingCount = await Followers.count({
      where: {
        userId: id,
      },
    });

    const followerCount = await Followers.count({
      where: {
        followerId: id,
      },
    });
    console.log(followerCount, followingCount);
    res.status(200).json({
      user_name: name,
      followers: followerCount,
      following: followingCount,
    });
  } catch (e) {
    res.status(400).json({ msg: "Error occured" });
    console.log(e);
  }
};

export const followHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.user;

    const follow = await Followers.create({
      userId: id,
      followerId: userId,
    });

    if (follow) {
      res.status(200).json({ msg: "User followed Succeesfully" });
    } else {
      res.status(400).json({ msg: "User not followed " });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};

export const unFollowHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const followRemove = await Followers.destroy({
      where: {
        userId: req.user.id,
        followerId: userId,
      },
    });

    if (followRemove) {
      res.status(200).json({ msg: "User unfollowed Succeesfully" });
    } else {
      res.status(400).json({ msg: "User not unfollowed " });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
    console.log(e);
  }
};
