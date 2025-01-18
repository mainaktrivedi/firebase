// server.js
import express from 'express';
import routes from './routes/routes.js';
import commonUtil from './src/utils/commonUtil.js';

const app = express();

const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json());

app.use((err, req, res, next) => {  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  });

// Use routes
app.use('/api', commonUtil.authCheck, routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

