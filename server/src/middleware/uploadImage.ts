import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";

const imagePath = path.resolve(__dirname, '../../public/uploads');

if (!existsSync(imagePath)) {
    mkdirSync(imagePath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagePath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix); 
    }
});

export const upload = multer({ storage: storage });