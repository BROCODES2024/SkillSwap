const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // For development, use a test account or configure your email service
  if (process.env.NODE_ENV === 'development') {
    // Use Ethereal Email for testing
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USER || 'test@ethereal.email',
        pass: process.env.ETHEREAL_PASS || 'test123'
      }
    });
  }

  // For production, use your email service
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || options.message
    };

    const info = await transporter.sendMail(message);

    console.log('Email sent: %s', info.messageId);

    // In development, log the preview URL
    if (process.env.NODE_ENV === 'development') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Email could not be sent');
  }
};

// Send verification email
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to Skill Swap Platform!</h2>
      <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
      </div>
      <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: 'Verify Your Email - Skill Swap Platform',
    message: `Please verify your email by visiting: ${verificationUrl}`,
    html
  });
};

// Send password reset email
const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>You requested a password reset for your Skill Swap Platform account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #666;">${resetUrl}</p>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: 'Password Reset - Skill Swap Platform',
    message: `Reset your password by visiting: ${resetUrl}`,
    html
  });
};

// Send platform notification email
const sendPlatformNotification = async (email, title, message) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">${title}</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        ${message}
      </div>
      <p>Thank you for using Skill Swap Platform!</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: title,
    message,
    html
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPlatformNotification
}; 