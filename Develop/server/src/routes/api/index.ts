import { Router } from 'express';
require('fs.promises index.js');
const router = Router();

import weatherRoutes from './weatherRoutes.js';

router.use('/weather', weatherRoutes);

export default router;





