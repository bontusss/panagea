const Tour = require('../models/tour');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Get all tours from DB
exports.getTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
});

// Create a tour
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
});

// Update a tour by id
exports.updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await Tour.findOneAndUpdate({ _id: id }, req.body);
  if (!tour) {
    return next(new AppError('invalid ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Tour update was successful',
  });
});

// Get a tour by ID
exports.getTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  if (!tour) {
    return next(new AppError('invalid ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

// Delete a tour
exports.deleteTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) {
    return next(new AppError('invalid ID', 404));
  }
  res.status(204).json({
    status: 'success',
    message: 'Tour was deleted successfully',
  });
});

// check if an item has that id included in req.param
// todo: Not working
exports.checkID = (req, res, next) => {
  //   for (i in Tour) {
  //     console.log(Tour);
  //   }
  //   next();
};
