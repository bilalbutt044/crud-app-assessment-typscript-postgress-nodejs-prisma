import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import { handleError } from "./utils/errorHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleError); //  catch all errors
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
