const users = [
  {
    id: 'u_demo',
    username: 'demo',
    // Demo-only: plain text password for simplicity.
    // Replace with hashed passwords + proper user DB in production.
    password: 'password',
    displayName: 'Demo User',
  },
];

/**
 * Find a user by username (case-sensitive).
 * @param {string} username
 * @returns {object|null}
 */
function findUserByUsername(username) {
  if (!username) return null;
  return users.find((u) => u.username === username) || null;
}

/**
 * Find a user by id.
 * @param {string} id
 * @returns {object|null}
 */
function findUserById(id) {
  if (!id) return null;
  return users.find((u) => u.id === id) || null;
}

/**
 * Validate credentials against the in-memory store.
 * @param {string} username
 * @param {string} password
 * @returns {object|null} user if valid
 */
function validateCredentials(username, password) {
  const user = findUserByUsername(username);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}

module.exports = {
  findUserByUsername,
  findUserById,
  validateCredentials,
};
