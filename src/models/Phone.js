const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const phoneSchema = new Schema(
    {
        model: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        released: {
            type: String,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        os: {
            type: String,
            required: true,
        },
        memory: {
            type: String,
            required: true,
        },
        displaySize: {
            type: String,
            required: true,
        },
        displayResolutions: {
            type: String,
            required: true,
        },
        cameraMP: {
            type: Number,
            required: true,
        },
        cameraVideo: {
            type: String,
            required: true,
        },
        ram: {
            type: Number,
            required: true,
        },
        chipset: {
            type: String,
            required: true,
        },
        batteryMAH: {
            type: Number,
            required: true,
        },
        batteryType: {
            type: String,
            enum: ['li-ion', 'li-po'],

            default: 'li-ion',
        },
        image: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
        creator: {
            type: ObjectId,
            ref: 'User',
        },
        category: {
            type: String,
            enum: [
                'samsung',
                'apple',
                'huawei',
                'xiaomi',
                'motorola',
                'nokia',
                'other',
            ],
            default: 'other',
        },
        comments: [{ type: ObjectId, ref: 'Comment' }],
        likes: [{ type: ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const Phone = model('Phone', phoneSchema);

module.exports = Phone;
