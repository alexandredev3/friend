function permissao(req, res, next) {
    if (req.session.userId != undefined) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = permissao;