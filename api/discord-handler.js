// api/discord-handler.js
module.exports = async function (req, res) {
  try {
    const { messages } = req.body;

    // Lakukan apa yang Anda butuhkan dengan data pesan di sini
    console.log('Received messages:', messages);

    res.status(200).json({ success: true, message: 'Messages received successfully.' });
  } catch (error) {
    console.error('Error handling Discord messages:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
