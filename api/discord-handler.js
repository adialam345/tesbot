const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { message } = req.body;
    const channelId = '1205841803623006208'; // Ganti dengan ID saluran Discord Anda
    const webhookUrl = 'https://discordapp.com/api/webhooks/1205867563490222150/SEVhk7dD0JpcOoQH32ea4nvA3_5181TMyH0eSwku7NP6MD_9DFRTqbLd3ywuOJbh7PDe'; // Ganti dengan URL Webhook Discord Anda

    const formattedMessage = `
      **NAMA:** ${message.author ? `${message.author.givenName} ${message.author.familyName}` : 'Unknown'}
      **Message:** ${formatMessage(message.message)}
      **WAKTU:** ${new Date(message.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}
    `;

    // Kirim pesan ke Discord menggunakan Webhook
    await axios.post(webhookUrl, {
      content: formattedMessage,
    });

    res.status(200).json({ success: true, message: 'Pesan dikirim ke Discord!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const formatMessage = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url => `[${url}](${url})`);
};
