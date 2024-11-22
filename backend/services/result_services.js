const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");
const { getResultCollection } = require("../models/results_model");
const dotenv = require("dotenv");
const { timeStamp } = require("console");

dotenv.config();

const addnewResult = async (data) => {
  const dbObject = await getResultCollection();
  const res=await dbObject.insertOne(data);
  return res;
};
const deleteResultById = async (id) => {
    const dbObject = await getResultCollection();
    await dbObject.deleteOne(id);
  };
const getAllResult = async (data) => {
    const dbObject = await getResultCollection();
    const result = await dbObject.find(data).toArray();
    return result;
};
const getResultbyId = async (data) => {
    const dbObject = await getResultCollection();
    const result = await dbObject.findOne({_id:new ObjectId(data)})
    return result;
};

module.exports = {
  addnewResult,
  getAllResult,
  deleteResultById,
  getResultbyId
};
