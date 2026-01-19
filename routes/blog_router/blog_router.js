import express from "express";
import { AddBlog, deleteblogbyid, getAllBlogs, getBlogbyId, UpdateBlog } from "../../blog_controller/blog_controller.js";
import auth from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";

const router = express.Router()
router.post('/addBlog', auth, upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), AddBlog)
router.get('/getAllBlogs', getAllBlogs)
router.get('/getBlogbyId/:_id', getBlogbyId)
router.put( "/UpdateBlog/:id",auth,upload.fields([{ name: "featuredImage" }, { name: "thumbnail" }]),
  UpdateBlog
);
router.delete('/deleteBlog/:_id',auth,deleteblogbyid)

export default router;