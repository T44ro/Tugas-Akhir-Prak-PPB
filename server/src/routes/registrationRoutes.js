import express from 'express';
import { RegistrationController } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/', RegistrationController.register);           // POST /api/registrations (Daftar)
router.delete('/', RegistrationController.unregister);       // DELETE /api/registrations (Batal)
router.get('/:userId', RegistrationController.getMyEvents);  // GET /api/registrations/:userId (Lihat Data)

export default router;