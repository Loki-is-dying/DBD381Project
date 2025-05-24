require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

connectDB();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Main route")
})

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
