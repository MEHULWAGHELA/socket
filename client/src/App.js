import { useEffect } from 'react';
import './App.css';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000");
function App() {
  const messageSend = () => {
    socket.emit("hello", { message: document.querySelector('input').value })
    // document.querySelector('input').value
    socket.on("hello", (response) => {
      console.log(response)
    })
  }
  useEffect(() => {
    socket.on("recieve-message", (response) => {
      console.log("effect", response)
      document.querySelector('input').value = response.message
    })
  }, [socket])
  return (
    <div>
      <input type="text" />
      <button onClick={messageSend}>Send Message</button>
    </div>
  );
}

export default App;
