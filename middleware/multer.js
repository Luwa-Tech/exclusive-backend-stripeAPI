const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: async (req, file) => {
    try {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        throw new Error("File type is not supported");
      }
      return true;
    } catch (error) {
      return false;
    }
  },
});

//router.post("/createPost", upload.single("file"), postsController.createPost);
