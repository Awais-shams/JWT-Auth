async function admin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access Denied!");
  } else {
    next();
  }
}

module.exports = admin;
