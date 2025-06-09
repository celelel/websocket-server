const WebSocket = require('ws');
const readline = require('readline');

const ws = new WebSocket('wss://websocket-server-owe4.onrender.com'); // Change to your deployed server URL

const packetMap = {
  "h": {
    audio_path: "res://audios/example4_happy.ogg",
    emotion: "happy",
    visemes: [
      { time: 0.00, viseme: "viseme_aa" },
      { time: 0.25, viseme: "viseme_M" },
      { time: 0.45, viseme: "viseme_aa" },
      { time: 0.65, viseme: "viseme_PP" },
      { time: 0.85, viseme: "viseme_E" },
      { time: 1.30, viseme: "viseme_sil" }
    ]
  },
  "a": {
    audio_path: "res://audios/example4_angry.ogg",
    emotion: "angry",
    visemes: [
      { time: 0.00, viseme: "viseme_aa" },
      { time: 0.30, viseme: "viseme_M" },
      { time: 0.55, viseme: "viseme_aa" },
      { time: 1.00, viseme: "viseme_G" },
      { time: 1.30, viseme: "viseme_RR" },
      { time: 1.65, viseme: "viseme_E" },
      { time: 2.30, viseme: "viseme_sil" }
    ]
  },
  "s": {
    audio_path: "res://audios/example4_sad.ogg",
    emotion: "sad",
    visemes: [
      { time: 0.00, viseme: "viseme_aa" },
      { time: 0.15, viseme: "viseme_I" },
      { time: 0.30, viseme: "viseme_aa" },
      { time: 0.40, viseme: "viseme_PP" },
      { time: 0.55, viseme: "viseme_SS" },
      { time: 0.65, viseme: "viseme_aa" },
      { time: 0.75, viseme: "viseme_DD" },
      { time: 0.95, viseme: "viseme_CH" },
      { time: 1.05, viseme: "viseme_aa" },
      { time: 1.25, viseme: "viseme_CH" },
      { time: 1.35, viseme: "viseme_U" },
      { time: 1.45, viseme: "viseme_DD" },
      { time: 1.65, viseme: "viseme_aa" },
      { time: 1.75, viseme: "viseme_I" },
      { time: 1.90, viseme: "viseme_DD" },
      { time: 2.00, viseme: "viseme_U" },
      { time: 2.20, viseme: "viseme_sil" }
    ]
  },
  "f": {
    audio_path: "res://audios/example4_fear.ogg",
    emotion: "fear",
    visemes: [
      { time: 0.00, viseme: "viseme_aa" },
      { time: 0.25, viseme: "viseme_M" },
      { time: 0.45, viseme: "viseme_aa" },
      { time: 0.65, viseme: "viseme_PP" },
      { time: 0.85, viseme: "viseme_E" },
      { time: 1.30, viseme: "viseme_sil" }
    ]
  },
  "d": {
    audio_path: "res://audios/example4_disgust.ogg",
    emotion: "disgust",
    visemes: [
      { time: 0.00, viseme: "viseme_aa" },
      { time: 0.25, viseme: "viseme_M" },
      { time: 0.45, viseme: "viseme_aa" },
      { time: 0.65, viseme: "viseme_PP" },
      { time: 0.85, viseme: "viseme_E" },
      { time: 1.30, viseme: "viseme_sil" }
    ]
  },
  "n": {
    audio_path: "res://audios/example4_neutral.ogg",
    emotion: "neutral",
    visemes: [
      { time: 0.00, viseme: "viseme_aa" },
      { time: 0.25, viseme: "viseme_M" },
      { time: 0.45, viseme: "viseme_aa" },
      { time: 0.65, viseme: "viseme_PP" },
      { time: 0.85, viseme: "viseme_E" },
      { time: 1.30, viseme: "viseme_sil" }
    ]
  }
};

ws.on('open', () => {
  console.log("✅ WebSocket connected. Press 'h', 'a', 's', 'f', 'd', or 'n' then Enter to send emotion packets.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    const packet = packetMap[input.trim()];
    if (packet) {
      ws.send(JSON.stringify(packet));
      console.log(`📤 Sent packet for "${packet.emotion}"`);
    } else {
      console.log("⚠️ Invalid input. Use h, a, s, f, d, or n.");
    }
  });
});

ws.on('message', (data) => {
  console.log("📩 Received:", data.toString());
});

ws.on('close', () => {
  console.log("❌ Connection closed");
});

ws.on('error', (err) => {
  console.error("❗ WebSocket error:", err);
});