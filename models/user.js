const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../utils/MongooseError");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: /.+@.+\..+/i,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", MongooseError);

const joiUserSchema = Joi.object({
  email: Joi.string()
    .pattern(/.+@.+\..+/i)
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const User = model("user", userSchema);

module.exports = { User, joiUserSchema };
