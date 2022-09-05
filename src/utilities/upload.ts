import multer from "multer";
import path from "path";

const storage: multer.StorageEngine = multer.diskStorage({});

const filefilter = (req: any, file: any, callback: Function) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({ storage: storage, fileFilter: filefilter });
