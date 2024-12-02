import express from "express";
import bodyParser from "body-parser";
import codeRoutes from "./routes/codeRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", codeRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
