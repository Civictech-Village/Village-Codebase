const logoutUser = (req, res) => {
  req.session = null;
  if (req.sessionOptions && req.sessionOptions.expires) {
    res.clearCookie('session'); // Clear the session cookie
  }
  res.sendStatus(204);
};

module.exports = logoutUser;
