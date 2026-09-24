import { Router } from 'express';
import { ReportController } from './report.controller';

const router = Router();

router.post('/', ReportController.createReport);
router.get('/', ReportController.getReports);

export default router;
