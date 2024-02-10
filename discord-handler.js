const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { message } = req.body;
    const channelId = 'ID_SALURAN_DISCORD_ANDA'; // Ganti dengan ID saluran Discord Anda
    const discordApiUrl = `https://discord.com/api/v9/channels/${channelId}/messages`;

    const response = await fetch(discordApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bot TOKEN_BOT_DISCORD_ANDA', // Ganti dengan token bot Discord Anda
      },
      body: JSON.stringify({ content: message }),
    });

    if (response.ok) {
      res.status(200).json({ success: true, message: 'Pesan dikirim ke Discord!' });
    } else {
      const errorText = await response.text();
      res.status(response.status).json({ success: false, error: errorText });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
