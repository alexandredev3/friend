const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/create-login", (req, res) => {
  return res.render("create-login");
});

router.post("/create-login/save", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      User.create({
        email: email,
        password: hash,
      }).then(() => {
          res.redirect("/create-login");
         })
        .catch((err) => {
          res.redirect("/");
        });
    } else {
        res.redirect("/create-login")
    }
  });
});

router.get("/", (req, res) => {
  return res.render("index");
});

router.post("/autenticate", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    where: {
      email,
    }
  });

  if (!user) {
    return res.status(400).send(`O email ${email} nao foi encontrado!`);
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(400).send('Senha e invalida');
  }
 
  req.session.userId = user.id;

  res.cookie('userId', String(user.id), {
    maxAge: 90000,
    httpOnly: true,
  });

  return res.redirect('/create-instituicao');
});

module.exports = router;
