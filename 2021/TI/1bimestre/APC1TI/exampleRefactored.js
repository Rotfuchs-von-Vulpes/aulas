// criando o banco de dados WebSQL
// Criar tabela
let db = openDatabase("Test", "1.0", "Banco de Dados", 2 * 1024 * 1024);
// //criando a função de cadastro
db.transaction((create) => {
  create.executeSql(
    "CREATE TABLE IF NOT EXISTS Client (id PRIMARY KEY,cpf INTEGER, nome TEXT, fone TEXT, email TEXT)"
  );
});

// variaveis
const d = document;
const id = (id) => document.getElementById(id);

const elements = {
  form: elById("form"),
  nick: elById("nick"),
  mail: elById("mail"),
  phone: elById("phone"),
  cpf: elById("cpf"),
};

// funções de validação
let isInvalid = ({ value }) => value === "" || value.length < 3;
let cpfIsInvalid = ({ value }) => isInvalid({ value }) || value.length != 6;
let emailIsInvalid = ({ value }) => isInvalid({ value }) || !value.includes("@", 1);

// comunica os erros ao usuario
function message({ errorSource = className }, msg) {
  alert(`mensagem de ${errorSource}: ${msg}`);
}

// valida os dados
function validateData() {
  let errors = [];

  if (isInvalid(elements.nick)) errors.unshift([elements.nick, "Nome vazio inferior a 3 caracteres"]);
  if (emailIsInvalid(elements.mail)) {
    if (isInvalid(elements.mail)) {
      errors.unshift([elements.mail, "Email vazio ou inferior a 3 caracteres"]);
    } else {
      errors.unshift([elements.mail, "Email invalido: não contem @"]);
    }
  }
  if (isInvalid(elements.phone)) errors.unshift([elements.phone, "Telefone inferior a 3 caracteres"]);
  if (cpfIsInvalid(elements.cpf)) {
    if (isInvalid(elements.cpf)) {
      errors.unshift([elements.cpf, "CPF vazio inferior a 3 caracteres, deve ter 11 caracteres"]);
    } else {
      errors.unshift([elements.cpf, "CPF com valor diferente de 11 caracteres"]);
    }
  }

  return errors;
}

// comunica todos os erros de uma lista
function reportErrors(errors) {
  for (let error of errors) {
    message(error[0], error[1]);
    error[0].focus();
  }
}

// função principal de cadastro
function register() {
  let errors = validateData();

  if (errors.length == 0) {
    // inserindo os dados no banco de dados
    db.transaction((register) => {
      register.executeSql(
        `INSERT INTO Client (cpf,nome,fone,email) VALUES ("${cpf}","${nick}","${fone}","${mail}")`
      );
    });
    message(form, "Cadastro feito com sucesso");
  } else {
    reportErrors(errors);
  }
}
