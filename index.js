import { create } from "venom-bot";
import sharp from "sharp";
import fs from "fs";

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

async function commands(client, message) {
  const iaCommands = {
    sticker: "/sticker",
  };

  if (message.type == "image" && message.caption === "/sticker") {
    const imgBuffer = await client.decryptFile(message);
    console.log("imgBuffer", imgBuffer);

    fs.writeFileSync("output.webp", imgBuffer);

    sharp(imgBuffer)
      .toFormat("webp") // Converter para formato webp
      .toBuffer()
      .resize(200)
      .then((webpBuffer) => {
        fs.writeFileSync("output.webp", webpBuffer);

        client
          .sendImageAsSticker(message.chatId, "./output.webp")
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
