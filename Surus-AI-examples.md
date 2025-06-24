# Speech to text with Surus AI
## This code might need some addons since the edge function that serves this speech to text cannot handle very big files. 

```javascript
const GS_API_KEY = "tu_clave_api";
const API_URL = 'https://api.surus.dev/functions/v1/audio/transcriptions';
const formData = new FormData();
formData.append('model', 'marianbasti/whisper-large-v3-turbo-latam');
formData.append('file', audioFileInput.files[0]); // audioFileInput is an <input type='file'>
fetch(API_URL, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + GS_API_KEY
  },
  body: formData
})
.then(res => res.json())
.then(data => console.log(data));
```

```bash
curl -X POST https://api.surus.dev/functions/v1/audio/transcriptions \
  -H "Authorization: Bearer tu_clave_api" \
  -F "model=marianbasti/whisper-large-v3-turbo-latam" \
  -F "file=@file.wav"
```


# Text to speech with Surus AI

```javascript
const GS_API_KEY = "tu_clave_api";
const API_URL = 'https://api.surus.dev/functions/v1/audio/speech';
fetch(API_URL, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + GS_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'marianbasti/Llama-3.2-3B-Orpheus-Rioplatense-1795',
    input: 'Hola, ¿cómo estás?',
    voice: 'male',
    response_format: 'wav'
  })
})
.then(res => res.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.wav';
  a.click();
});
```

```bash
curl -X POST https://api.surus.dev/functions/v1/audio/speech \
  -H "Authorization: Bearer tu_clave_api" \
  -H "Content-Type: application/json" \
  -d '{"model": "marianbasti/Llama-3.2-3B-Orpheus-Rioplatense-1795", "input": "Hola, ¿cómo estás?", "voice": "female", "response_format": "wav"}' --output output.wav
```


# Text model with Surus AI
## This text model should be properly system-prompted to make good translations between english and castellano rioplatense spanish. 

```javascript
const GS_API_KEY = "tu_clave_api";
const API_URL = 'https://api.surus.dev/functions/v1/chat/completions';
fetch(API_URL, {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + GS_API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'Qwen/Qwen3-1.7B',
        messages: [{ role: 'user', content: 'Hola, cómo estás?' }],
        max_tokens: 200
    })
})
.then(res => res.json())
.then(data => {
    console.log("Full response:", JSON.stringify(data, null, 2));
    console.log("\nAI response:", data.choices[0].message.content);
});
```


```bash
curl -X POST https://api.surus.dev/functions/v1/chat/completions \
  -H "Authorization: Bearer tu_clave_api" \
  -H "Content-Type: application/json" \
  -d '{"model": "Qwen/Qwen3-1.7B", "messages": [{"role": "user", "content": "Hola, cómo estás?"}], "max_tokens": 200}'
```