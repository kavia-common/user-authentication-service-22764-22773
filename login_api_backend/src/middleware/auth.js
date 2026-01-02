/**
 * Ensures the request has an authenticated session.
 */
function requireAuth(req, res, next) {
  const user = req.session?.user;
  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'Not authenticated',
    });
  }
  return next();
}

module.exports = {
  requireAuth,
};
