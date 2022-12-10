const { Schema, model } = require('mongoose');
const bcypt = require('bcrypt');
const { string } = require('prop-types');

const userSchema = new Schema(
    {
        // username stored for user, is required, must be unique
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: string,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be a valid email!']
        },
        password: {
            type: String,
            required: true,
            minlength: 7
        },
        dates: [
            // reference dates model to store dates for foods tied to user
            {
                type: Schema.Types.ObjectId,
                ref: 'Date'
            }
        ]
    },
    {
        toJson: {
            virtuals: true
        }
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.new || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
module.exports = User;