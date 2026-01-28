import express  from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { apiRouter } from "./router/apiRouter.js";

const app = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(cors());
app.use(express.json())
app.use("/api", apiRouter);

const __filename = fileURLToPath(import.meta.url);
const buildDir = path.join(path.dirname(__filename), 'dist');
if(fs.existsSync(buildDir)) {
    app.use(express.static(buildDir));
}

app.use((req, res) => {
  return res.sendFile(path.join(buildDir, 'index.html'));
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})