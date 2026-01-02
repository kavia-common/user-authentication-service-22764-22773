const express = require('express');
const healthController = require('../controllers/health');
const authController = require('../controllers/auth');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health and status endpoints
 *   - name: Auth
 *     description: Login/logout and session endpoints
 */

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/health', healthController.check.bind(healthController));

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and create a session
 *     description: >
 *       Validates username/password and creates a server-side session.
 *       The session is stored in Redis if available, otherwise in memory.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: demo
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.login.bind(authController));

/**
 * @swagger
 * /logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout and destroy the current session
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', authController.logout.bind(authController));

/**
 * @swagger
 * /me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the current logged-in user
 *     description: Requires a valid session cookie.
 *     responses:
 *       200:
 *         description: Current user
 *       401:
 *         description: Not authenticated
 */
router.get('/me', requireAuth, authController.me.bind(authController));

module.exports = router;
