function permissao(req, res, next) {
    // req.session.userId: vai retornar o userId que salvei la no cookies
    if (req.session.userId != undefined) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = permissao;