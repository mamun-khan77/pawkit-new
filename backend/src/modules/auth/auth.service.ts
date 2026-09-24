import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma';

export class AuthService {
  static async register(data: any) {
    const { name, email, password, phone, district, role } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        district,
        role: role || 'USER',
      },
    });

    const token = this.generateToken(user.id, user.role);

    return { user: this.sanitizeUser(user), token };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.role);
    return { user: this.sanitizeUser(user), token };
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.sanitizeUser(user);
  }

  private static generateToken(id: string, role: string) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your-super-secret-jwt-key', {
      expiresIn: '7d',
    });
  }

  private static sanitizeUser(user: any) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
