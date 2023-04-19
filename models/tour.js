const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const tourCategories = ['Walking', 'Historic', 'Churches', 'Museum'];

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      min: [4, 'Name cannot be less than 4 characters'],
      max: [20, 'Name cannot contain more than 20 characters'],
      trim: true,
      unique: true,
      required: [true, 'A tour must have a name'],
    },
    slug: String,
    price: Number,
    duration: {
      type: String, //eg: 2hours
      required: [true, 'Duration must be provided'],
    },
    excerpt: {
      type: String,
      required: [true, 'excerpt must be provided.'],
      max: [100, 'excerpt cannot be more than 100 words.'],
    },
    category: {
      type: String,
      required: [true, 'category must be provided'],
      enum: tourCategories,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1.0'],
      max: [5.0, 'max Rating is 5.0'],
    },
    ratingsQuantity: { type: Number, default: 0 },
    location: {
      type: String,
      required: [true, 'excerpt must be provided'],
    },
    description: { type: String, trim: true },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String], // An array of strings.
    itinerary: [String], // An array of locations to cover during the tour.
    highlights: [String], // Things that will make the tour worth going.
    includes: [String], // EG: walking tour, guide?
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { toLower: true });
  next();
});

tourSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
