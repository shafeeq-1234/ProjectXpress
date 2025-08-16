import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import nodemailer from "nodemailer";

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projectxpress27@gmail.com',
    pass: 'kclb ttzo mmua bhde'
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Order submission endpoint
  app.post("/api/orders", async (req, res) => {
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
        console.log('Email notification sent successfully');

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
        console.log('Student confirmation email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the order submission if email fails
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
  });

  // Get all orders (for admin purposes)
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
