import { ObjectId } from "mongodb";
import { errorCreator } from "../utils/errorHandler.js";

export function userRepo(collection) {
  async function createUser(obj) {
    try {
      const result = await collection.insertOne(obj);
      const { password, _id, ...user } = obj;
      return { id: result.insertedId.toString(), ...user };
    } catch (error) {
      if (error.code === 11000) throw errorCreator(409, "User already exist");
      throw error;
    }
  }

  async function getUsers() {
    const result = await collection.find({}).toArray();
    if (!result) return [];
    result.map((user) => ((user.id = user._id.toString()), delete user._id));

    return result;
  }

  async function getUserByUsername(username) {
    const result = await collection.findOne({ username });
    if (!result) return null;
    result.id = result._id.toString();
    delete result._id;

    return result;
  }

  async function deleteById(id) {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount === 1;
  }

  return {
    createUser,
    getUsers,
    getUserByUsername,
    deleteById,
  };
}
