const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are mandatory");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('All field must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email')
    }

    const passMatch = await bcrypt.compare(password, user.password)

    if (!passMatch) {
        throw Error('Incorrect Password')
    }

    return user

}

module.exports = mongoose.model("User", userSchema);
