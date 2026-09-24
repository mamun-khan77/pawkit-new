import { Request, Response } from 'express';
import { PetService } from './pet.service';

// Extend Request to include user from auth middleware
interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export class PetController {
  static async getAllPets(req: Request, res: Response) {
    try {
      const pets = await PetService.getAllPets();
      res.json({ success: true, data: pets });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getPetById(req: Request, res: Response) {
    try {
      const pet = await PetService.getPetById(req.params.id);
      res.json({ success: true, data: pet });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  static async createPet(req: AuthRequest, res: Response) {
    try {
      const pet = await PetService.createPet(req.user!.id, req.body);
      res.status(201).json({ success: true, data: pet });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updatePet(req: AuthRequest, res: Response) {
    try {
      const pet = await PetService.updatePet(req.params.id, req.user!.id, req.body);
      res.json({ success: true, data: pet });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deletePet(req: AuthRequest, res: Response) {
    try {
      await PetService.deletePet(req.params.id, req.user!.id);
      res.json({ success: true, message: 'Pet deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
