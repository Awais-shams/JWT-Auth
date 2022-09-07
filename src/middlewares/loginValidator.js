const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordComplexity(complexityOptions),
});

async function loginValidator(req, res, next) {
  try {
    const valid = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(404).send(error.details[0].message);
  }
}

module.exports = loginValidator;
