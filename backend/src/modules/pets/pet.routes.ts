import { Router } from 'express';
import { PetController } from './pet.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', PetController.getAllPets);
router.get('/:id', PetController.getPetById);

// Protected routes (require login)
router.post('/', authenticate, PetController.createPet);
router.put('/:id', authenticate, PetController.updatePet);
router.delete('/:id', authenticate, PetController.deletePet);

export default router;
