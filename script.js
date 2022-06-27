let nome;
let mensagens = [];

nomeUsuario();

function nomeUsuario() {
  nome = prompt("Digite seu lindo nome:");
  logarSala();
}

function pesquisaMensagem() {
  let promise1 = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  promise1.then((response) => {
    let mensagens = response.data;
    writeMensagemHTML(mensagens);
    scroll();
  });
}

function atualizaMensagem() {
  setInterval(conexao, 5000);
  setInterval(pesquisaMensagem, 3000);
  setInterval(procuraPessoas, 5000);
}

function conexao() {
  let promise3 = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    {
      name: `${nome}`,
    }
  );
  promise3.then((response) => {
    response.data;
  });
}

function procuraPessoas() {
  let people = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/participants"
  );
  people.then(function (response) {
    let online = response.data;
  });
}

function writeMensagemHTML(mensagens) {
  let ulMensagem = document.querySelector(".mensagens");
  ulMensagem.innerHTML = "";

  for (let i = 0; i < mensagens.length; i++) {
    let typeMessage = mensagens[i].type;
    if (
      typeMessage === "private_message" &&
      (mensagens[i].to === nome || mensagens[i].from === nome)
    ) {
      ulMensagem.innerHTML += `
            <div class="mensagem ${typeOfMessage(typeMessage)}">
                <p> <span> (${mensagens[i].time})</span> <strong>${
        mensagens[i].from
      }</strong> (Reservadamente) para <strong>${mensagens[i].to}</strong> : ${
        mensagens[i].text
      } </p>
            </div>`;
    }
    if (typeMessage === "message" || typeMessage === "status") {
      ulMensagem.innerHTML += `
            <div class="mensagem ${typeOfMessage(typeMessage)}">
                <p> <span> (${mensagens[i].time})</span> <strong>${
        mensagens[i].from
      }</strong> para <strong>${mensagens[i].to}</strong> : ${
        mensagens[i].text
      } </p>
            </div>`;
    }
  }
}

function entrarComMensagem(event){
  const tecla = event.which;
  if (tecla === 13){
    document.querySelector(".footer ion-icon").click();
  }
}

function enviarMensagem(){
  let envioFormulario = document.querySelector(".mensagem input").value;
  if (envioFormulario !== ""){
    let enviar = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",{
      from: `${nome}`,
      to: "Todos",
      text: `${envioFormulario}`,
      type: "message"
    })
    enviar.then((response) => {
      response.data;
      pesquisaMensagem();
    })
    document.querySelector("input") = "";
    enviar.catch(mensagemErro());
  }
}

function mensagemErro(){
  alert("Usuário não logado");
  window.location.reload();
}

function typeOfMessage(typeMessage) {
  if (typeMessage == "message") {
    return "normal";
  }
  if (typeMessage == "status") {
    return "status";
  }
  if (typeMessage == "private_message") {
    return "private";
  }
}

function scroll() {
  const chat = document.querySelector(".mensagens");
  const ultimochat = chat.lastElementChild;
  ultimochat.scrollIntoView();
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
  promise.then(() => {
    atualizaMensagem();
  });
  promise.catch(nomeUsuario);
}
