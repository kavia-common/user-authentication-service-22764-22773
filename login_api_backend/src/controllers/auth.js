const { validateCredentials } = require('../services/userStore');

class AuthController {
  /**
   * Login endpoint: validates credentials and sets session.user.
   */
  login(req, res) {
    const { username, password } = req.body || {};

    if (typeof username !== 'string' || username.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'username is required',
      });
    }
    if (typeof password !== 'string' || password.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'password is required',
      });
    }

    const user = validateCredentials(username, password);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid username or password',
      });
    }

    // Store minimal user info in session (avoid storing password).
    req.session.user = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    };

    return res.status(200).json({
      status: 'ok',
      message: 'Logged in',
      user: req.session.user,
    });
  }

  /**
   * Logout endpoint: destroys the session.
   */
  logout(req, res) {
    if (!req.session) {
      return res.status(200).json({ status: 'ok', message: 'Logged out' });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to logout',
        });
      }

      res.clearCookie('sid');
      return res.status(200).json({
        status: 'ok',
        message: 'Logged out',
      });
    });
  }

  /**
   * Returns current user from session.
   */
  me(req, res) {
    return res.status(200).json({
      status: 'ok',
      user: req.session.user,
    });
  }
}

module.exports = new AuthController();
