import { Request, Response } from 'express';
import prisma from '../../utils/prisma';

export class ReportController {
  static async createReport(req: Request, res: Response) {
    try {
      const { reportType, petName, species, description, lastSeenLocation, lastSeenDate, contactName, contactPhone, imageUrl } = req.body;
      
      const report = await prisma.lostFoundReport.create({
        data: {
          reportType,
          petName,
          species,
          description,
          lastSeenLocation,
          lastSeenDate: new Date(lastSeenDate),
          contactName,
          contactPhone,
          imageUrl
        }
      });
      
      res.status(201).json({ success: true, data: report });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getReports(req: Request, res: Response) {
    try {
      const reports = await prisma.lostFoundReport.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json({ success: true, data: reports });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
