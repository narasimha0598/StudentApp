var mongoose = require('mongoose'),
    db       = mongoose.connection,
    user  = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        sid: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number
        },
        startDate: {
            type: Date
        },
        rollno: {
            type: Number,
            unique: true
        },
        gender: {
            type: String
        }
    }),
    User  = mongoose.model('User', user, 'user');
db.once('open' , () => { console.log('connection with user is succeeded') });
db.on('error' , console.error.bind(console , 'connection with user is failed'));
module.exports = User;