import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import petRoutes from './modules/pets/pet.routes';
import contactRoutes from './modules/contact/contact.routes';
import reportRoutes from './modules/reports/report.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f8fafc; color: #0f172a; flex-direction: column;">
        <h1>🐾 Pawkit API</h1>
        <p>The backend server is running successfully!</p>
      </body>
    </html>
  `);
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Pawkit API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
