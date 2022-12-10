const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const DateFormat = require('../utils/dateFormat');

const dateSchema = new Schema(
    {
        foodName: {
            type: String,
            required: 'You need to name this food!',
            minlength: 1,
            maxlength: 280
        },
        purchasedAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        expiresAt: {
            type: Date,
            // set default date to be two weeks from the submission date
            default: () => Date.now() + 14*24*60*60*1000,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Date = model('Date', dateSchema);