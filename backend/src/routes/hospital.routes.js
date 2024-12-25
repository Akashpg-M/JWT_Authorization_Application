// backend/routes/hospitalRoutes.js
import express from 'express';
import { searchHospitalsManual, searchHospitalsFiltered } from '../controllers/hospital.controller.js';

const router = express.Router();

// Route to search hospitals manually (by name and location)
router.post('/search/manual', searchHospitalsManual);

// Route to search hospitals based on illness type and proximity
router.post('/search/filtered', searchHospitalsFiltered);

export default router;
