const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

app.post('discord-handler.js', (req, res) => {
  try {
    const { messages } = req.body;

    const channel = client.channels.cache.get('1205841803623006208'); // Replace with your channel ID

    messages.forEach((message) => {
      const formattedMessage = `
        **NAMA:** ${message.author.givenName} ${message.author.familyName || ''}
        **Message:** ${message.message}
        **WAKTU:** ${new Date(message.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}
      `;

      channel.send(formattedMessage);
    });

    res.status(200).send('Messages sent to Discord channel successfully.');
  } catch (error) {
    console.error('Error handling Discord messages:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Connect to Discord
client.login('MTE2ODE2NDMzNzA3MzAxNjkwMg.G4ToOu.YEyUz3lqQPPw2CVOT_cAikf_wW79A1bNpEWeuw');

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
