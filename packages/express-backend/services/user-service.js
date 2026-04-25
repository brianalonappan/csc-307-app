import User from "../models/user.js";

const findUserByName = (name) => {
  return User.find({ name: name });
};

const findUserByJob = (job) => {
  return User.find({ job: job });
};

const findUserByNameAndJob = (name, job) => {
  return User.find({ name: name, job: job });
};

const findUserById = (id) => {
  return User.findById(id);
};

const addUser = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

const getAllUsers = () => {
  return User.find();
};

const removeUserById = (id) => {
  return User.findByIdAndDelete(id);
};

export default {
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  findUserById,
  addUser,
  getAllUsers,
  removeUserById
};