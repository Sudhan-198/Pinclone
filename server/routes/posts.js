const router = require("express").Router();

const multer = require("multer");
const path = require("path");

const db = require("../db/db");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  }

});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {

  try {

    const {
      title,
      userId,
      username,
      bio
    } = req.body;

    const image = req.file.filename;

    db.run(
      `INSERT INTO posts
      (title,image,userId,username,bio,likedBy)
      VALUES(?,?,?,?,?,?)`,
      [
        title,
        image,
        userId,
        username,
        bio,
        ""
      ],
      function (err) {

        if (err) {

          console.log(err);

          return res.status(400).json(err);

        }

        res.json({
          message: "Post uploaded"
        });

      }
    );

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

router.get("/", (req, res) => {

  db.all(
    "SELECT * FROM posts ORDER BY id DESC",
    [],
    (err, rows) => {

      if (err) {

        return res.status(400).json(err);

      }

      res.json(rows);

    }
  );

});

router.put("/like/:id", (req, res) => {

  const postId = req.params.id;

  const { userId } = req.body;

  db.get(
    "SELECT likedBy FROM posts WHERE id=?",
    [postId],
    (err, post) => {

      if (err) {

        return res.status(400).json(err);

      }

      let likedUsers = post.likedBy
        ? post.likedBy.split(",").filter(Boolean)
        : [];

      if (likedUsers.includes(String(userId))) {

        likedUsers = likedUsers.filter(
          (id) => id !== String(userId)
        );

      } else {

        likedUsers.push(String(userId));

      }

      const updatedLikedBy = likedUsers.join(",");

      db.run(
        "UPDATE posts SET likedBy=? WHERE id=?",
        [updatedLikedBy, postId],
        function (err) {

          if (err) {

            return res.status(400).json(err);

          }

          res.json({
            likedBy: updatedLikedBy
          });

        }
      );

    }
  );

});

router.delete("/:id", (req, res) => {

  db.run(
    "DELETE FROM posts WHERE id=?",
    [req.params.id],
    function (err) {

      if (err) {

        return res.status(400).json(err);

      }

      res.json({
        message: "Deleted"
      });

    }
  );

});

module.exports = router;