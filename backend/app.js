const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const pacientesRoutes = require('./routes/pacientes');

app.use('/api/pacientes', pacientesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
