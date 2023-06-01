import { create } from "venom-bot";
import sharp from "sharp";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

let shuffledArray =[];

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

async function sendBlackjackButtons(client, chatId) {
  console.log("sendBlackjackButtons");

  // Send Messages with Buttons Reply
  const buttons = [
    {
      buttonText: {
        displayText: "Hit",
        type: 1,
      },
    },
    {
      buttonText: {
        displayText: "Stand",
        type: 2,
      },
    },

    {
      buttonText: {
        displayText: "Double Down",
        type: 3,
      },
    },
    {
      buttonText: {
        displayText: "Split",
        type: 3,
      },
    },
  ];
  // await client
  //   .sendButtons("000000000000@c.us", "Title", buttons, "Description")
  //   .then((result) => {
  //     console.log("Result: ", result); //return object success
  //   })
  //   .catch((erro) => {
  //     console.error("Error when sending: ", erro); //return object error
  //   });

  // const messageOptions = {
  //   title: "Opções de Blackjack",
  //   subtitle: "Escolha uma opção",
  //   buttons: buttons,
  // };

  // const buttons = [
  //   { buttonId: "banca_cartas", buttonText: "Ver cartas da banca", type: 1 },
  //   { buttonId: "pedir_carta", buttonText: "Pedir outra carta", type: 1 },
  //   { buttonId: "parar", buttonText: "Parar", type: 1 },
  // ];
  console.log("buttons", buttons);

  const messageOptions = {
    title: "Opções de Blackjack",
    subtitle: "Escolha uma opção",
    buttons: buttons,
  };

  // const messageOptions = {
  //   title: "Opções de Blackjack",
  //   buttons: buttons,
  //   footerText: "Escolha uma opção",
  // };
  console.log("messageOptions", messageOptions);

  await client
    .sendButtons(chatId, "O que você deseja fazer?", buttons, "Description")
    .then((result) => {
      console.log("Result: ", result); //return object success
    })
    .catch((erro) => {
      console.error("Error when sending: ", erro); //return object error
    });
}

// await client
//   .sendButtons("000000000000@c.us", "Title", buttons, "Description")
//   .then((result) => {
//     console.log("Result: ", result); //return object success
//   })
//   .catch((erro) => {
//     console.error("Error when sending: ", erro); //return object error
//   });

// async function commands(client, message) {
//   // ...

//   switch (messageParts[0]) {
//     case iaCommands.blackjack:
//       // ...
//       console.log("\n\n\n\nCartas do jogador:", cartasJogador);

//       const cartasJogadorFormatadas = cartasJogador.map(formatarCarta);
//       client.sendText(message.chatId, ` Cartas 🤖\n\n ${cartasJogadorFormatadas}`);

//       // Enviar botões para continuar o jogo
//       await sendBlackjackButtons(client, message.chatId);
//       break;
//   }

//   // ...
// }

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
  const buttonId = message.selectedButtonId;


  
  switch (buttonId) {
    case 'id0':
      console.log("\n\n\nshuffledArray.length\n\n\n", shuffledArray.length);
      console.log("Lógica para a ação de  (pedir uma nova carta)");
      const novasCarta = shuffledArray.splice(0, 1);
      console.log("\n\n\nshuffledArray.length\n\n\n", shuffledArray.length);

      function formatarCarta(carta) {
        return `${carta.valor} de ${carta.naipe}`;
      }

      const novaCarta = novasCarta.map(formatarCarta);


      client.sendText(message.chatId, ` Nova Carta 🤖\n\n ${novaCarta}`);

      break;
    case 'id1':
      // Lógica para a ação de "Stand" (manter a mão atual)
      console.log("manter a mão atual");
      break;
    case 'id2':
      // Lógica para a ação de "Double Down" (dobrar a aposta e pedir apenas uma carta adicional)
      console.log("dobrar a aposta e pedir apenas uma carta adicional");
      break;
    case 'id3':
      // Lógica para a ação de "Split" (dividir a mão em duas mãos separadas)
      console.log("dividir a mão em duas mãos separadas");
      break;
    default:
      // Tratar ação inválida
      console.log("Tratar ação inválida");
      break;
  }



  console.log("buttonId", buttonId);
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
        const numBaralhos = 1;
        const baralhos = criarBaralhos(numBaralhos);
        console.log(baralhos);

        shuffledArray = shuffleArray(baralhos);

        console.log("\n\n\nshuffledArray.length\n\n\n", shuffledArray.length);

        const cartasJogador = shuffledArray.splice(0, 2);
        console.log("\n\n\nshuffledArray.length\n\n\n", shuffledArray.length);

        const cartasBanca = shuffledArray.splice(0, 2);


        console.log("\n\n\n\nCartas do jogador:", cartasJogador);
        function formatarCarta(carta) {
          return `${carta.valor} de ${carta.naipe}`;
        }

        const cartaJogador = cartasJogador.map(formatarCarta);
        const cartaBanca = cartasBanca.map(formatarCarta);

        client.sendText(message.chatId, ` Cartas Jogador 🤖\n\n ${cartaJogador}`);
        client.sendText(message.chatId, ` Cartas da Banca 🤖\n\n ${cartaBanca}`);
        await sendBlackjackButtons(client, message.chatId);
        console.log("\n\n\nshuffledArray.length\n\n\n", shuffledArray.length);

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

  if (message.type === "buttons_response") {
    console.log("buttons_response");
  }
}

// Função que inicia o cliente do WhatsApp e trata as mensagens recebidas
async function start(client) {
  client.onAnyMessage((message) => {
    console.log("message", message);
    commands(client, message);
  });
}
