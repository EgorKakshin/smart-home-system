import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface User {
    _id: string,
    username: string,
    password: string,
    controlQuestion: string,
    controlQuestionResponse: string,
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Восстановление пароля
    controlQuestion: {
        type: String,
        // required: true,
    },
    controlQuestionResponse: {
        type: String,
        // required: true,
    }
});

export default mongoose.model('User', UserSchema);
