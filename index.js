import { create } from "venom-bot";
import sharp from "sharp";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function criarBaralhos(numBaralhos) {
  const naipes = ["Paus", "Ouros", "Copas", "Espadas"];
  const valores = [
    "Ás",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Valete",
    "Dama",
    "Rei",
  ];
  const baralhos = [];

  for (let i = 0; i < numBaralhos; i++) {
    for (let naipe of naipes) {
      for (let valor of valores) {
        const carta = {
          naipe: naipe,
          valor: valor,
        };
        baralhos.push(carta);
      }
    }
  }

  return baralhos;
}

async function commands(client, message) {
  console.log("message.type", message.type);
  const iaCommands = {
    sticker: "/sticker",
    blackjack: "/blackjack",
  };

  if (message.type === "chat") {
    console.log("message.type ==chat");
    // let firstWord = message.body.substring(0, message.body.indexOf(" "));
    const messageParts = message.body.split(" ");
    const firstWord = messageParts[0];
    const command2 = messageParts[1];
    console.log("messageParts[0]", messageParts[0]);

    switch (messageParts[0]) {
      case iaCommands.blackjack:
        console.log("entrou case blackjack");
        const numBaralhos = 4;
        const baralhos = criarBaralhos(numBaralhos);
        console.log(baralhos);

        const shuffledArray = shuffleArray(baralhos);

        console.log("\n\n\nshuffledArray\n\n\n", shuffledArray);

        const cartasJogador = shuffledArray.slice(0, 2);
        const cartasBanca = [];

        console.log("\n\n\n\nCartas do jogador:", cartasJogador);
        function formatarCarta(carta) {
          return `${carta.valor} de ${carta.naipe}`;
        }

        const cartas = cartasJogador.map(formatarCarta);

        client.sendText(message.chatId, ` Cartas 🤖\n\n ${cartas}`);

        break;
    }
  }

  if (message.type == "image" && message.caption === "/sticker") {
    const imgBuffer = await client.decryptFile(message);
    console.log("imgBuffer", imgBuffer);
    const randomId = uuidv4();
    console.log("randomId", randomId);

    // fs.writeFileSync("output.webp", imgBuffer);

    sharp(imgBuffer)
      .toFormat("webp") // Converter para formato webp
      .toBuffer()
      .then((webpBuffer) => {
        fs.writeFileSync(`temp/${randomId}.webp`, webpBuffer);

        client
          .sendImageAsSticker(message.chatId, `temp/${randomId}.webp`)
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      })
      .catch((error) => {
        // Tratar erros, se necessário
        console.error(error);
      });
  }
}

// Função que inicia o cliente do WhatsApp e trata as mensagens recebidas
async function start(client) {
  client.onAnyMessage((message) => {
    commands(client, message);
  });
}
