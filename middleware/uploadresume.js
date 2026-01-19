import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/resume",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadResume = multer({ storage });
