// logic fr -- user.models.js _->> for creating user we have to create model ,and also for interact with userdb

const monogoose = require("mongoose"); // mongoose import

const userSchema = new monogoose.Schema( // user schema
  {
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

const userModel = monogoose.model("user", userSchema);
module.exports = userModel;