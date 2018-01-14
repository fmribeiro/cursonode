module.exports = function(application) {
  application.get("/admin", function(req, res) {
    res.render("admin/form_add_noticia.ejs", { validacao: {}, noticia: {} });
  });

  application.post("/noticias/salvar", function(req, res) {
    var noticia = req.body;

    req.assert("titulo", "Título é obrigatorio").notEmpty();
    req.assert("resumo", "Resumo é obrigatorio").notEmpty();
    req.assert("autor", "Autor é obrigatorio").notEmpty();
    req.assert("data_noticia", "Data é obrigatoria").notEmpty();
    //.isDate({ format: "YYYY-MM-DD" });//nao esta funcionando
    //req
    //.assert("resumo", "Resumo deve conter entre 10 e 100 caracteres")
    // .len(10, 100);

    var erros = req.validationErrors();
    if (erros) {
      res.render("admin/form_add_noticia", {
        validacao: erros,
        noticia: noticia
      });
      return;
    }

    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function(error, result) {
      res.redirect("/noticias");
    });
  });
};
