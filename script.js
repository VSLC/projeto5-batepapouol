let nome;
let promise;

function nomeUsuario() {
  nome = prompt("Digite seu lindo nome:");
  logarSala();
}

function logarSala() {
  let nomeUser = {
    name: nome,
  };
  console.log(nomeUser);
  promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    nomeUser
  );
  console.log(promise);
  promise.catch(nomeUsuario);
}

function entraSala() {
  return;
}

nomeUsuario();