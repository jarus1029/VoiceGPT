import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useState} from "react";
import axios from 'axios'
import {useSpeechSynthesis} from 'react-speech-kit'

function App() {
  const [response,setResponse]=useState("");
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const [playing, setPlaying] = useState(false);
  
  
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  console.log(transcript);

  if (!browserSupportsSpeechRecognition) {
    return null
  }
  const prompt={
    "prompt":`"${transcript}"`,
  }
  const handleSubmit=(e)=>{
    e.preventDefault();

    axios.post("https://voicegpt-kgyb.onrender.com/chat",prompt)
    .then((res)=>{
      setResponse(res.data);
      // return res.json(response)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const refreshPage=()=>{
    window.location.reload();
  }

  const handlePlayPauseClick = () => {
    if (speaking) {
      cancel();
      setPlaying(false);
    } else {
      speak({text:response});
      setPlaying(true);
    }
  };
  return (
    <>
    <h1 className='head'>VOICE-GPT</h1>

    <div className='flex-container'>
      {/* audio to text converter */}
        <div className="container">
          <h2>Speech to Text Converter</h2>
          <br />
          <div className="main-content">
                    {transcript}
          </div>
          <div className="btn-style">
            <button onClick={startListening}>Start Recording</button>
            <button  onClick={SpeechRecognition.stopListening}>Stop Recording</button>
            <button onClick={handleSubmit}>
                {'Get Response from GPT'}
            </button>
            <button onClick={refreshPage}>Refresh Page</button>
          </div>
        </div>

        {/* response from gpt container */}
        <div className="container">
          <h2>GPT Response </h2>
          <br />
          <div className="main-content" >
            {response}
          </div>
          <div className="btn-style">
            <button onClick={handlePlayPauseClick}>
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
    </div>
    </>
  );
}

export default App;
