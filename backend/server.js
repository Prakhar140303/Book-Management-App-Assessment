import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bookRoutes from './routes/bookRoutes.js'
const app = express();
app.use(express.json({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(cors());
const PORT = 5000;

app.use('/api',bookRoutes);


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
