const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.userService = {
  loginUser: async (body) => {
    const user = await User.findOne({ email: body.email });
    // console.log(user);
    const compare = await bcrypt.compare(req.body.password, user.password);
    console.log(compare);
    if (compare) {
      const token = await user.generateAuthToken();
      console.log(token);
      res.header("x-auth-token", token).send({
        token: token,
      });
    }
  },
};
