import { Request, Response } from 'express';
import prisma from '../../utils/prisma';

export class ContactController {
  static async submitMessage(req: Request, res: Response) {
    try {
      const { name, email, phone, topic, message } = req.body;
      
      const contactMsg = await prisma.contactMessage.create({
        data: {
          name,
          email,
          phone,
          topic,
          message,
        }
      });
      
      res.status(201).json({ success: true, data: contactMsg });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
