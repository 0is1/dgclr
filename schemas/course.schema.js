import mongoose from 'mongoose';

const {Schema} = mongoose;

// * pdgaID (TODO: is there thing like this?)
// eslint-disable-next-line import/prefer-default-export
export const courseSchema = () =>
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
            founded: String,
            infoSignType: String,
            maintenanceCycle: String,
            mapUrl: String,
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
            bar: Number,
            length: {
                foot: Number,
                meter: Number,
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
            required: true,
            unique: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        totalPar: {
            type: Number,
        },
    });
