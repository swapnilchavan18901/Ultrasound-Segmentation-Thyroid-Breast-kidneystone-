const {
  registerUserByAdmin,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} = require("../services/user_services");
const { validationResult } = require("express-validator");
const statusCode = require("../utils/status_codes");

const registerUserByAdminController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.formatError(
      errors.array(),
      "Error missing field.",
      statusCode.BAD_REQUEST
    );
  }

  const { email, password, role } = req.body;
  try {
    await registerUserByAdmin(email, password, role);
    res.formatResponse(
      "User registered successfully.",
      "User registered successfully.",
      statusCode.CREATED
    );
  } catch (err) {
    res.formatError(
      err.message,
      "Error registering user.",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getUsers = async (req, res) => {
  try {
    const keys = ["name", "email", "age", "program", "role"];
    let store_values = [];

    const usersData = await getAllUsers();

    for (let i = 0; i < usersData.length; i++) {
      const user = {};
      if (usersData[i]["role"] === "Admin") {
        continue;
      }
      user["id"] = usersData[i]["_id"];
      for (let key in keys) {
        user[keys[key]] = usersData[i][keys[key]];
      }

      store_values.push(user);
    }

    res.formatResponse(
      store_values,
      "Users Data Retrieved Successfully",
      statusCode.SUCCESS
    );
  } catch (err) {
    res.formatError(
      err.message,
      "Error to retrieve user data",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const updateProfile = async (req, res) => {
  const id = req.params.id;
  const usersData = req.body;
  try {
    const user = await getUserProfile(id);
    if (!user) {
      return res.formatError(
        "No user found",
        "No user found",
        statusCode.NOT_FOUND
      );
    }
    const updatedUser = await updateUserProfile(id, usersData);

    res.formatResponse(
      updatedUser,
      "Updated user successfully",
      statusCode.SUCCESS
    );
  } catch (err) {
    return res.formatError(
      err.message,
      "Updating user failed",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await getUserProfile(req.params.id);
    if (!user) {
      return res.formatError(
        "No user found",
        "No user found",
        statusCode.NOT_FOUND
      );
    }
    res.formatResponse(user, "User Retrieved Successfully", statusCode.SUCCESS);
  } catch (err) {
    return res.formatError(
      err.message,
      "Error Fetching profile",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  registerUserByAdminController,
  updateProfile,
  getProfile,
  getUsers,
};
