const express = require('express');
const router = express.Router();
const {
  createTour,
  getTours,
  updateTour,
  getTour,
  deleteTour,
} = require('../controllers/tour');
const auth = require('../controllers/auth');

router.route('/').get(auth.protect, getTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(auth.protect, auth.authorizeOnly('admin', 'lead-guide'), deleteTour);

module.exports = router;
