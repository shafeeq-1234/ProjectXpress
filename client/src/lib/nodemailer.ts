// This file is for documentation purposes - actual nodemailer implementation is in the backend
// The backend handles email sending via the /api/orders endpoint

export interface OrderEmailData {
  name: string;
  college: string;
  projectName: string;
  projectDetails: string;
  whatsappNumber: string;
  orderId: string;
}

export const sendOrderEmail = async (orderData: OrderEmailData) => {
  // This function is handled by the backend API
  // Frontend makes a POST request to /api/orders
  // Backend uses nodemailer to send email to invinciblehackers07@gmail.com
  
  throw new Error("This function should not be called from frontend. Use /api/orders endpoint instead.");
};
