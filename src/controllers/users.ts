import Vote from "../models/vote";
import User from "../models/user";

export const getVotesFromMongoose = async (userId: number) => {
  const votes = await Vote.find({ userId }).exec();

  return votes;
};

export const findUser = async (email: string) => {
  const user = await User.find({ email });

  return user[0];
};
