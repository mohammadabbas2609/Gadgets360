import mongoose from "mongoose";
import brcypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await brcypt.genSalt();
  this.password = await brcypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
