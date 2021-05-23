//criando o banco de dados WebSQL
var db = openDatabase("Test", "1.0", "Banco de Dados", 2 * 1024 * 1024); //Criar tabela
db.transaction(function (criar) {
  criar.executeSql(
    "CREATE TABLE IF NOT EXISTS Client (id PRIMARY KEY,cpf INTEGER, nome TEXT, fone TEXT, email TEXT)"
  );
}); //criando a função de cadastro
function cadUsuario() {
  //declarando variáveis
  var cpf = document.getElementById("cpf").value;
  var nome = document.getElementById("nome").value;
  var fone = document.getElementById("fone").value;
  var mail = document.getElementById("mail").value;
  //validando os campos
  if (cpf == "" || cpf.length < 6) {
    alert("Favor digite seu CPF!");
    formulario.cpf.focus();
    return false;
  }
  if (nome == "") {
    alert("Favor digite seu nome!");
    formulario.nome.focus();
    return false;
  }
  if (fone == "") {
    alert("Favor digitar o telefone!");
    formulario.fone.focus();
    return false;
  }
  if (mail == "") {
    alert("Favor digite seu Email!");
    formulario.mail.focus();
    return false;
  } //inserindo os dados no banco
  db.transaction(function (cadastrar) {
    cadastrar.executeSql(
      'INSERT INTO Client (cpf,nome,fone,email)VALUES ("' +
        cpf +
        '","' +
        nome +
        '","' +
        fone +
        '","' +
        mail +
        '")'
    );
  });
  alert("Cliente cadastrado com sucesso");
  return;
}
