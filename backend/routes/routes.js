import express from 'express';
import userRoutes from './userRoutes.js';
import partnerRoutes from './partnerRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/partners', partnerRoutes);

router.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
});

export default router;
