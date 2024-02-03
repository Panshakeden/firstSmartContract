import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./abi.json";
import "./App.css"

function App() {
  const contractAddress = "0x8806D9c5AA4DaEF4386F408875a1019747dB9614";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [inputMessage, setInputMessage] = useState(""); // Renamed state variable
  const [getmsg, setGetMessage] = useState(" ");
  
  async function sendMessageTo() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessage(inputMessage);
        await transaction.wait();
        console.log("message sent");
        setInputMessage("  ");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessageTo() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();
        setGetMessage(transaction);
        console.log(" ssent");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  const MessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <div id="message">Messaging app</div>
        <input
          type="text"
          placeholder="Enter your message"
          value={inputMessage}
          onChange={MessageChange}
        /> <br></br>
        <button onClick={sendMessageTo}>Set Message</button> <br></br>
        <button onClick={getMessageTo}>Get message</button>
      </div>
      <div>
        <p>{getmsg}</p>
      </div>
    </div>
  );
}

export default App;
