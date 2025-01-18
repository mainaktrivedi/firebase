// server.js
import express from 'express';
import routes from './routes/routes.js';
import commonUtil from './src/utils/commonUtil.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  
app.use(cors(corsOptions));  

const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json());

app.use((err, req, res, next) => {  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  });

// all routes
app.use('/api', commonUtil.authCheck, routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

