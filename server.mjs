import express from "express";
import { upload } from "./multer.mjs";
import extract from 'extract-zip';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.post("/api/v1", upload.any(), async (req, res, next) => {
    
    const uploadedFile = req.files[0];

    if (!uploadedFile) {
        return res.status(400).send({
            message: "No file uploaded",
            data: {
                success: false
            }
        });
    }

    const source = path.join(__dirname, 'uploads', uploadedFile.filename);
    const target = path.join(__dirname, 'extracted');

    try {
        await extract(source, { dir: target });
        console.log('Extraction complete');
    } catch (err) {
        console.error('Extraction error:', err);
        return res.status(500).send({
            message: "Extraction failed",
            data: {
                success: false
            }
        });
    }

    res.send({
        message: "success",
        data: {
            success: true
        }
    });
});

const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});