const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost:27017/fleettab'
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(instance => {
    console.log(`Connected to the db: ${instance.connection.name}`);
})
.catch(err => console.log(`Connection failed`, err))

module.exports = mongoose