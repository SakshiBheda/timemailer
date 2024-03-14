// routes/emailRoutes.js

const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Routes for email templates
router.post('/templates', emailController.createTemplate);
router.get('/templates', emailController.getAllTemplates);
router.get('/templates/:id', emailController.getTemplateById);
router.put('/templates/:id', emailController.updateTemplate);
router.delete('/templates/:id', emailController.deleteTemplate);

// Route for sending emails
router.post('/send-email', emailController.sendEmail);

module.exports = router;
