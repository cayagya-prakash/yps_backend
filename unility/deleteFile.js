import fs from "fs";
import path from "path";

export const deleteFile = (filePath) => {
  try {
    if (!filePath) return;

    // filePath example: /uploads/blogs/abc.jpg
    const absolutePath = path.join(process.cwd(), filePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log("Deleted file:", absolutePath);
    }
  } catch (error) {
    console.error("deleteFile error:", error);
  }
};
