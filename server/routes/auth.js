const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db/db");

router.post("/register", async (req, res) => {

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  db.run(
    "INSERT INTO users(username,email,password,bio) VALUES(?,?,?,?)",
    [
      username,
      email,
      hashedPassword,
      ""
    ],
    function (err) {

      if (err) {

        console.log(err);

        return res.status(400).json({
          error: "User already exists"
        });

      }

      res.json({
        message: "User registered"
      });

    }
  );

});

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, user) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);

      }

      if (!user) {

        return res.status(404).json({
          error: "User not found"
        });

      }

      const validPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!validPassword) {

        return res.status(400).json({
          error: "Wrong password"
        });

      }

      const token = jwt.sign(
        { id: user.id },
        "secretkey"
      );

      res.json({
        token,
        user
      });

    }
  );

});

router.put("/profile/:id", (req, res) => {

  const userId = req.params.id;

  const { username, bio } = req.body;

  db.run(
    "UPDATE users SET username=?, bio=? WHERE id=?",
    [username, bio, userId],
    function (err) {

      if (err) {

        console.log(err);

        return res.status(400).json(err);

      }

      db.get(
        "SELECT * FROM users WHERE id=?",
        [userId],
        (err, updatedUser) => {

          if (err) {

            console.log(err);

            return res.status(500).json(err);

          }

          res.json({
            message: "Profile updated",
            user: updatedUser
          });

        }
      );

    }
  );

});

module.exports = router;