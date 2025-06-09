
const WebSocket = require('ws');
const readline = require('readline');

const wss = new WebSocket.Server({ host: "192.168.18.85", port: 8080 });
console.log("✅ WebSocket server started on ws://localhost:8080");

let clients = [];

wss.on('connection', function connection(ws) {
  console.log("🧩 Client connected");
  clients.push(ws);

  ws.on('message', function incoming(message) {
    console.log('📩 Received:', message);
  });

  ws.on('close', () => {
    console.log("❌ Client disconnected");
    clients = clients.filter(c => c !== ws);
  });

  ws.send("Hello from server!");
});

function broadcastPacket(packet) {
  const json = JSON.stringify(packet);
  clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(json);
      console.log("📤 Sent packet:", json);
    }
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("⌨️  Press h = happy | a = angry | s = sad | f = fear | d = disgust | n = neutral");

rl.on('line', (input) => {
  input = input.trim().toLowerCase();
  const packetMap = {
    "h": {
      audio_path: "res://audios/example4_happy.ogg",
      emotion: "happy",
      visemes: [{"time": 0.00, "viseme": "viseme_aa"}, 
        {"time": 0.25, "viseme": "viseme_M"}, 
        {"time": 0.45, "viseme": "viseme_aa"}, 
        {"time": 0.65, "viseme": "viseme_PP"},
        {"time": 0.85, "viseme": "viseme_E"},   
        {"time": 1.30, "viseme": "viseme_sil"}]       
    },
    "a": {
      audio_path: "res://audios/example4_angry.ogg",
      emotion: "angry",
      visemes: [{"time": 0.00, "viseme": "viseme_aa"}, 
        {"time": 0.30, "viseme": "viseme_M"}, 
        {"time": 0.55, "viseme": "viseme_aa"}, 
        {"time": 1.00, "viseme": "viseme_G"}, 
        {"time": 1.30, "viseme": "viseme_RR"},  
        {"time": 1.65, "viseme": "viseme_E"},   
        {"time": 2.30, "viseme": "viseme_sil"}]  
    },
    "s": {
      audio_path: "res://audios/example4_sad.ogg",
      emotion: "sad",
      visemes: [ {"time": 0.00, "viseme": "viseme_aa"},
        {"time": 0.15, "viseme": "viseme_I"},
        {"time": 0.30, "viseme": "viseme_aa"},
        {"time": 0.40, "viseme": "viseme_PP"},
        {"time": 0.55, "viseme": "viseme_SS"},
        {"time": 0.65, "viseme": "viseme_aa"},
        {"time": 0.75, "viseme": "viseme_DD"},
        {"time": 0.95, "viseme": "viseme_CH"},
        {"time": 1.05, "viseme": "viseme_aa"},
        {"time": 1.25, "viseme": "viseme_CH"},
        {"time": 1.35, "viseme": "viseme_U"},
        {"time": 1.45, "viseme": "viseme_DD"},
        {"time": 1.65, "viseme": "viseme_aa"},
        {"time": 1.75, "viseme": "viseme_I"},
        {"time": 1.90, "viseme": "viseme_DD"},
        {"time": 2.00, "viseme": "viseme_U"},
        {"time": 2.20, "viseme": "viseme_sil"}]       
    }, 
    "f": {
      audio_path: "res://audios/example4_sad.ogg",
      emotion: "fear",
      visemes: [ {"time": 0.00, "viseme": "viseme_aa"},
        {"time": 0.15, "viseme": "viseme_I"},
        {"time": 0.30, "viseme": "viseme_aa"},
        {"time": 0.40, "viseme": "viseme_PP"},
        {"time": 0.55, "viseme": "viseme_SS"},
        {"time": 0.65, "viseme": "viseme_aa"},
        {"time": 0.75, "viseme": "viseme_DD"},
        {"time": 0.95, "viseme": "viseme_CH"},
        {"time": 1.05, "viseme": "viseme_aa"},
        {"time": 1.25, "viseme": "viseme_CH"},
        {"time": 1.35, "viseme": "viseme_U"},
        {"time": 1.45, "viseme": "viseme_DD"},
        {"time": 1.65, "viseme": "viseme_aa"},
        {"time": 1.75, "viseme": "viseme_I"},
        {"time": 1.90, "viseme": "viseme_DD"},
        {"time": 2.00, "viseme": "viseme_U"},
        {"time": 2.20, "viseme": "viseme_sil"}
       ]
     
    }, 
    "d": {
      audio_path: "res://audios/example4_sad.ogg",
      emotion: "disgust",
      visemes: [ {"time": 0.00, "viseme": "viseme_aa"},
        {"time": 0.15, "viseme": "viseme_I"},
        {"time": 0.30, "viseme": "viseme_aa"},
        {"time": 0.40, "viseme": "viseme_PP"},
        {"time": 0.55, "viseme": "viseme_SS"},
        {"time": 0.65, "viseme": "viseme_aa"},
        {"time": 0.75, "viseme": "viseme_DD"},
        {"time": 0.95, "viseme": "viseme_CH"},
        {"time": 1.05, "viseme": "viseme_aa"},
        {"time": 1.25, "viseme": "viseme_CH"},
        {"time": 1.35, "viseme": "viseme_U"},
        {"time": 1.45, "viseme": "viseme_DD"},
        {"time": 1.65, "viseme": "viseme_aa"},
        {"time": 1.75, "viseme": "viseme_I"},
        {"time": 1.90, "viseme": "viseme_DD"},
        {"time": 2.00, "viseme": "viseme_U"},
        {"time": 2.20, "viseme": "viseme_sil"}
       ]
    }, 
    "n": {
      audio_path: "res://audios/example4_sad.ogg",
      emotion: "neutral",
      visemes: [ {"time": 0.00, "viseme": "viseme_aa"},
        {"time": 0.15, "viseme": "viseme_I"},
        {"time": 0.30, "viseme": "viseme_aa"},
        {"time": 0.40, "viseme": "viseme_PP"},
        {"time": 0.55, "viseme": "viseme_SS"},
        {"time": 0.65, "viseme": "viseme_aa"},
        {"time": 0.75, "viseme": "viseme_DD"},
        {"time": 0.95, "viseme": "viseme_CH"},
        {"time": 1.05, "viseme": "viseme_aa"},
        {"time": 1.25, "viseme": "viseme_CH"},
        {"time": 1.35, "viseme": "viseme_U"},
        {"time": 1.45, "viseme": "viseme_DD"},
        {"time": 1.65, "viseme": "viseme_aa"},
        {"time": 1.75, "viseme": "viseme_I"},
        {"time": 1.90, "viseme": "viseme_DD"},
        {"time": 2.00, "viseme": "viseme_U"},
        {"time": 2.20, "viseme": "viseme_sil"}
       ]
    }
  };

  if (packetMap[input]) {
    broadcastPacket(packetMap[input]);
  } else {
    console.log("❓ Unknown key. Use h (happy), a (angry), s (sad)");
  }
});
