import { Request, Response } from 'express';
import { AuthService } from './auth.service';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  static async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getUserById(req.user!.id);
      res.json({ success: true, user });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}
