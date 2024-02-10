const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { message } = req.body;
    const webhookUrl = 'https://discordapp.com/api/webhooks/1205867563490222150/SEVhk7dD0JpcOoQH32ea4nvA3_5181TMyH0eSwku7NP6MD_9DFRTqbLd3ywuOJbh7PDe'; // Ganti dengan URL webhook Discord Anda
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
