// controllers/emailController.js

const EmailTemplate = require('../models/EmailTemplate');

const nodemailer = require('nodemailer');

// Create a new email template
exports.createTemplate = async (req, res) => {
    try {
        const { name, subject, body } = req.body;
        const template = new EmailTemplate({ name, subject, body });
        await template.save();
        res.status(201).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all email templates
exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await EmailTemplate.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single email template by ID
exports.getTemplateById = async (req, res) => {
    try {
        const template = await EmailTemplate.findById(req.params.id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing email template
exports.updateTemplate = async (req, res) => {
    try {
        const { name, subject, body } = req.body;
        const template = await EmailTemplate.findByIdAndUpdate(req.params.id, { name, subject, body }, { new: true });
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an email template
exports.deleteTemplate = async (req, res) => {
    try {
        const template = await EmailTemplate.findByIdAndDelete(req.params.id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        res.status(200).json({ message: 'Template deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// controllers/emailController.js


// Function to send email
exports.sendEmail = async (req, res) => {
    try {
        const { to, subject, body } = req.body;

        // Create a transporter using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sakshibheda35@gmail.com', // Update with your Gmail email address
                pass: 'your-password' // Update with your Gmail password
            }
        });

        // Define email options
        const mailOptions = {
            from: 'sakshibheda35@gmail.com', // Update with your Gmail email address
            to,
            subject,
            text: body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
};
