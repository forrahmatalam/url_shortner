import express from 'express';
import urlRoutes from '../routes/url.route.js';


const app = express();
app.use(express.json());

app.use("/api/url",urlRoutes);

export default app;