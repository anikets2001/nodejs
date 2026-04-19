const mongoose = require('mongoose');

// mongoose connection
async function connectMongoDb(url) {
    return mongoose.connect(url, { dbName: 'Users' })
}

module.exports = {
    connectMongoDb
}