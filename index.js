import { create } from "venom-bot";

// Criação do cliente do WhatsApp
const createOption = {
  session: "my-session", // Define a opção session como "my-session"
  useChrome: true,
};

create(createOption)
  .then((client) => {
    start(client); // Inicia o cliente de WhatsApp
    console.log("Whats-Jarvis connected\n");
  })
  .catch((erro) => {
    console.log("erro\n", erro);
  });

// Função que inicia o cliente do WhatsApp e trata as mensagens recebidas
async function start(client) {
  console.log("Start Client\n");
  client.onAnyMessage((message) => {
    console.log("Start Client\n");
    commands(client, message);
  });
}
