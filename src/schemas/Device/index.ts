import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
import {Room} from '@schemas/Room';

const Schema = mongoose.Schema;

export interface Device {
    _id: string,
    deviceName: string,
    deviceRoom: Room,
    icon: 'humidity' | 'temperature' | 'illumination',
    username: string,
    valueTimeStamp: Array<string>,
    humidity: Array<String>,
    temperature: Array<String>
    illumination: Array<String>
}

const DeviceSchema = new Schema({
    deviceName: {
        type: String,
        required: true,
    },
    deviceRoom: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    icon: {
        type: String,
        default: 'default',
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    temperature: {
        type: [String],
        required: false,
        default: [],
    },
    humidity: {
        type: [String],
        required: false,
        default: [],
    },
    illumination: {
        type: [String],
        required: false,
        default: [],
    },
    maxValue: {
        type: Number,
        required: true,
        default: Infinity,
    },
    minValue: {
        type: Number,
        required: true,
        default: -Infinity,
    },
    valueTimeStamp: {
        type: [String],
        required: true,
        default: [],
    }
});

export default mongoose.model('Device', DeviceSchema);
