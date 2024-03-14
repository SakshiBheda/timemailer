// scheduler.js

const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Function to send email
const sendEmail = async (to, subject, body) => {
    try {
        // Create a transporter using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Update with your Gmail email address
                pass: 'your-password' // Update with your Gmail password
            }
        });

        // Define email options
        const mailOptions = {
            from: 'your-email@gmail.com', // Update with your Gmail email address
            to,
            subject,
            text: body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Schedule email sending task using cron job
cron.schedule('*/5 * * * *', async () => { // Send email every 5 minutes
    const to = 'recipient@example.com'; // Update with recipient's email address
    const subject = 'Test Email';
    const body = 'This is a test email sent using node-cron';

    await sendEmail(to, subject, body);
});
