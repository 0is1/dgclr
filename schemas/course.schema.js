import mongoose from 'mongoose';

const {Schema} = mongoose;

// * pdgaID (TODO: is there thing like this?)
export default () =>
    new Schema({
        description: {
            type: String,
        },
        events: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Events',
        }],
        courseInfo: {
            basketType: String,
            courseDesigner: String,
            courseType: String,
            fee: {
                amount: Number,
                currency: String,
                value: String,
            },
            infoSignType: String,
            maintenanceCycle: String,
            rangeMaster: String,
            ranking: String,
            surfaceShapeTypes: Array,
            teeType: String,
        },
        created: {
            type: Date,
            default: Date.now,
        },
        holes: [{
            bars: Array,
            lengths: {
                foot: String,
                meter: String,
            },
        }],
        holeCount: {
            type: Number,
        },
        locationInfo: {
            address: String,
            zip: Number,
            city: String,
            coordinates: {
                lat: String,
                long: String,
            },
        },
        name: {
            type: String,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        totalPar: {
            type: Number,
        },
    });
