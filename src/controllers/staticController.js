module.exports = {
    index(req, res, next) {
        res.render("static/index", { title: "Welcome to Blocipedia" });
    },
    about(req, res, next) {
        res.render("static/about", { title: "About Blocipedia" });
    }
}