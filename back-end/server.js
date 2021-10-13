const express = require('express');
const connectDB = require('./config/config');

const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// connecting
connectDB();

// middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// deklarasi rout
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/job', require('./routes/api/job'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
