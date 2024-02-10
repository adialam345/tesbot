const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { message } = req.body;
    const channelId = '1160669101153337354/1205841803623006208'; // Ganti dengan ID saluran Discord Anda
    const discordApiUrl = `https://discord.com/api/v9/channels/${channelId}/messages`;

    const response = await fetch(discordApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'MTE2ODE2NDMzNzA3MzAxNjkwMg.G4ToOu.YEyUz3lqQPPw2CVOT_cAikf_wW79A1bNpEWeuw', // Ganti dengan token bot Discord Anda
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
