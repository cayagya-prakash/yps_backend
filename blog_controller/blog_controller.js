
import { format } from 'date-fns';
import { db } from '../db.js'
import { ObjectId } from "mongodb";
import path from 'path';
import fs from "fs";
import { deleteFile } from '../unility/deleteFile.js';
const collections = await db();


export const AddBlog = async (req, res) => {
  const { posttype, title, summry, publishdate, status, category, content, videoLink } = req.body
  const featuredImage = req.files?.featuredImage?.[0] || null;
  const thumbnail = req.files?.thumbnail?.[0] || null;
  try {
    if (!posttype || !title || !summry || !publishdate || !status || !category) {
      res.status(400).json({
        message: "Please add all requried fields"
      })
    }
    const addblog = await collections.blogs
    const newBlogs = await addblog.insertOne({
      posttype, title, summry, publishdate, status, category, content, videoLink, featuredImage: featuredImage
        ? `/uploads/blogs/${featuredImage.filename}`
        : null,

      thumbnail: thumbnail
        ? `/uploads/thumbnails/${thumbnail.filename}`
        : null,
    })
    res.status(200).json({
      status: true,
      message: "Blog is added scussfully!!!",
      newBlogs
    })

  } catch (error) {
    console.log("errorr", error)
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    const rawblogs = await collections.blogs.find({}).toArray()

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    const formatImage = (path, folder) => {
      if (!path) return null;

      const name = path.split("/").pop();
      return {
        name,
        url: `${BASE_URL}${path}`,
      };
    };
    const blogs = rawblogs.map((u, i) => ({
      id: i + 1,
      _id: u._id.toString(),  // MUI needs this
      posttype: u.posttype,
      title: u.title,
      summry: u.summry,
      publishdate: format(u.publishdate, 'dd-MM-yyyy'),
      status: u.status,
      category: u.category,
      featuredImage:formatImage(u.featuredImage) ,
      content: u.content,
      videoLink: u.videoLink,
      thumbnail:formatImage(u.thumbnail) ,
      created_at: u.created_at,
    }));

    
    res.status(200).json({
      message: "Get Blogs Scussfully!!!",
      status: true,
      blogs
    })
  } catch (error) {
    console.log("error", error)
  }


}

export const getBlogbyId = async (req, res) => {
  const { _id } = req.params;

  try {
    const blog = await collections.blogs.findOne({
      _id: new ObjectId(_id),
    });

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    const formatImage = (path, folder) => {
      if (!path) return null;

      const name = path.split("/").pop();
      return {
        name,
        url: `${BASE_URL}${path}`,
      };
    };
    const result = {
      ...blog,
      featuredImage: formatImage(blog.featuredImage),
      thumbnail: formatImage(blog.thumbnail),
    };

    return res.status(200).json({
      status: true,
      message: "Get Blog details successfully!",
      result,
    });

  } catch (error) {
    console.error("getBlogbyId error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const UpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      posttype,
      title,
      summry,
      publishdate,
      status,
      category,
      content,
      videoLink,
    } = req.body || {};

    const blogCollection = collections.blogs;

    const existingBlog = await blogCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingBlog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const updateData = {
      posttype,
      title,
      summry,
      publishdate,
      status,
      category,
      content,
      videoLink,
    };
    const featuredImage = req.files?.featuredImage?.[0];
    const thumbnail = req.files?.thumbnail?.[0] || null;
    if (featuredImage) {
      deleteFile(existingBlog.featuredImage);

      updateData.featuredImage =
        `/uploads/blogs/${featuredImage.filename}`;
    }
    if (thumbnail) {
      deleteFile(existingBlog.thumbnail);

      updateData.thumbnail =
        `/uploads/blogs/${thumbnail.filename}`;
    }
    await blogCollection.updateOne(
      { _id: existingBlog._id },
      { $set: updateData }
    );

    res.status(200).json({
      status: true,
      message: "Blog updated successfully",
    });

  } catch (error) {
    console.error("UpdateBlog error:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const deleteblogbyid = async (req, res) => {
    const { _id } = req.params
    const blogs = collections.blogs
    try {
        const result = await blogs.deleteOne({ _id: new ObjectId(_id) })

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({
            message: "Blog deleted Scussfully!!!",
            status: true
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message
        });
    }
}

