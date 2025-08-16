import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertOrderSchema } from '../shared/schema';
import nodemailer from 'nodemailer';

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'projectxpress27@gmail.com',
    pass: process.env.EMAIL_PASS || 'kclb ttzo mmua bhde'
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      
      // Store the order
      const order = await storage.createOrder(validatedData);

      // Send email notification
      try {
        const mailOptions = {
          from: 'projectxpress27@gmail.com',
          to: 'projectxpress27@gmail.com',
          subject: 'New Project Order - Project Xpress',
          html: `
            <h2>New Project Order Received</h2>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>College:</strong> ${order.college}</p>
            <p><strong>Project Name:</strong> ${order.projectName}</p>
            <p><strong>Project Details:</strong></p>
            <p>${order.projectDetails}</p>
            <p><strong>WhatsApp Number:</strong> ${order.whatsappNumber}</p>
            <p><strong>Submitted At:</strong> ${order.createdAt}</p>
          `
        };

        await transporter.sendMail(mailOptions);

        // Send confirmation email to student
        const studentMailOptions = {
          from: 'projectxpress27@gmail.com',
          to: order.email,
          subject: 'Order Confirmation - Project Xpress',
          html: `
            <h2>Thank You for Your Order!</h2>
            <p>Dear ${order.name},</p>
            <p>Your project order has been received successfully. Here are the details:</p>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Project Name:</strong> ${order.projectName}</p>
            <p><strong>College:</strong> ${order.college}</p>
            <p><strong>Order Date:</strong> ${order.createdAt}</p>
            <br>
            <p>We will contact you within 24 hours on your WhatsApp number: ${order.whatsappNumber}</p>
            <p>Thank you for choosing Project Xpress!</p>
            <br>
            <p>Best regards,<br>Project Xpress Team</p>
          `
        };

        await transporter.sendMail(studentMailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
      
      res.json({ 
        success: true, 
        message: "Order submitted successfully! We'll contact you soon.",
        orderId: order.id 
      });
    } catch (error) {
      console.error('Order submission error:', error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to submit order" 
      });
    }
  } else if (req.method === 'GET') {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}