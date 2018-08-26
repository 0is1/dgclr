import mongoose from 'mongoose';

const { Schema } = mongoose;

const pointSchema = new mongoose.Schema({
  _id: false,
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true,
  },
  coordinates: {
    type: [Number],
    default: [0, 0],
    required: true,
  },
});

// * pdgaID (TODO: is there thing like this?)
// eslint-disable-next-line import/prefer-default-export
export const courseSchema = () => new Schema({
  description: {
    type: String,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Events',
    },
  ],
  courseInfo: {
    basketType: String,
    courseDesigner: String,
    courseTypes: [
      {
        type: String,
      },
    ],
    fee: {
      amount: Number,
      currency: String,
      value: String,
    },
    founded: String,
    infoSignType: String,
    maintenanceCycle: String,
    mapUrl: String,
    rangeMaster: String,
    surfaceShapeTypes: Array,
    teeType: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  layouts: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: String,
      holes: [
        {
          _id: false,
          bar: Number,
          length: {
            foot: Number,
            meter: Number,
          },
        },
      ],
      holeCount: {
        type: Number,
      },
      totalPar: {
        type: Number,
      },
    },
  ],
  locationInfo: {
    address: String,
    zip: Number,
    city: String,
    location: {
      type: pointSchema,
      index: '2dsphere',
    },
  },
  name: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
