import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List of partners sample');
});

router.get('/:id', (req, res) => {
  res.send('Partner details sample for id: ' + req.params.id);
});

export default router;
