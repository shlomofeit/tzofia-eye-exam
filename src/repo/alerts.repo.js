import { ObjectId } from "mongodb";

export function createRepo(collection) {
  async function createAlert(obj) {
    const { _id, ...alert } = obj;
    const result = await collection.insertOne(obj);

    return { id: result.insertedId.toString(), ...alert };
  }

  async function getAlerts(filter = {}) {
    const result = await collection.find(filter).toArray();
    if (!result) return [];
    result.map(
      (alert) => ((alert.id = alert._id.toString()), delete alert._id),
    );

    return result;
  }

  async function getAlertsById(id) {
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result) return null;
    result.id = result._id.toString();
    delete result._id;

    return result;
  }

  async function updateById(id, obj) {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: obj },
      { returnDocument: "after" },
    );

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
    createAlert,
    getAlerts,
    getAlertsById,
    updateById,
    deleteById,
  };
}
