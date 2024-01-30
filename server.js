const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
// Initialize Database
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
}).then(con => {
    console.log('DB connection successful!')
})

const port = process.env.PORT || 4000 ;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})