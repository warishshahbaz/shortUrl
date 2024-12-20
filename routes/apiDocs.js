const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Get an example response
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Hello, Swagger!'
 */
router.get('/docs', (req, res) => {
  res.json({ message: 'Hello, Swagger!' });
});

module.exports = router;
