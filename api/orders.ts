import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple validation function
function validateOrderData(data: any) {
  const errors: string[] = [];
  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.email?.trim() || !data.email.includes('@')) errors.push('Valid email is required');
  if (!data.college?.trim()) errors.push('College is required');
  if (!data.projectName?.trim()) errors.push('Project name is required');
  if (!data.projectDetails?.trim()) errors.push('Project details are required');
  if (!data.whatsappNumber?.trim()) errors.push('WhatsApp number is required');
  
  return { isValid: errors.length === 0, errors };
}

// In-memory storage for orders (replace with database in production)
const orders: Array<any> = [];

// Generate simple ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Email sending function using fetch (works in Vercel serverless)
async function sendEmail(to: string, subject: string, html: string) {
  try {
    // Use a service like SendGrid, Resend, or similar for production
    // For now, we'll simulate email sending
    console.log(`Email would be sent to: ${to}`);
    console.log(`Subject: ${subject}`);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

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
      const validation = validateOrderData(req.body);
      
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }

      // Create order with ID and timestamp
      const order = {
        id: generateId(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      
      // Store the order (in production, use a real database)
      orders.push(order);

      // Send email notifications
      try {
        // Business notification
        await sendEmail(
          'projectxpress27@gmail.com',
          'New Project Order - Project Xpress',
          `
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
        );

        // Student confirmation
        await sendEmail(
          order.email,
          'Order Confirmation - Project Xpress',
          `
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
        );
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
      // Return stored orders (in production, fetch from database)
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