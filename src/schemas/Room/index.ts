import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Room {
    _id: string,
    name: string,
    username: string,
}

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export default mongoose.model('Room', RoomSchema);
