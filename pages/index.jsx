import { useState } from "react";
import { OpenAI } from "langchain/llms/openai";
import { ThreeDots } from "react-loader-spinner";

const llm = new OpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
  temperature: 0.9,
});

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [click, setClick] = useState(false);

  const sendMessage = async () => {
    if (input === "") {
      alert("Write Something");
      return;
    }
    setClick(true);
    try {
      let tempInput = input;
      setInput("");
      let tempMessages = [...messages, { text: tempInput, type: "User" }];
      setMessages(tempMessages);
      const result = await llm.predict(tempInput);
      setMessages([...tempMessages, { text: result, type: "OpenAI" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setClick(false);
  };
  return (
    <>
      <div
        style={{
          width: "90%",
          border: "2px solid lightgrey",
          padding: "10px",
          borderRadius: "20px",
          height: "90vh",
          position: "relative",
          margin: "auto",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "50px",
            fontWeight: 800,
          }}
        >
          {" "}
          CHAT BOT
        </div>
        <div
          className="chat-window"
          style={{ overflowY: "auto", height: "77vh", paddingBottom: "10px" }}
        >
          {messages.map((message, index) => (
            <>
              <div
                key={index}
                className={`message ${
                  message.type === "User" ? "User" : "OpenAI"
                }`}
                style={{
                  backgroundColor:
                    message.type === "User" ? "#DCF8C6" : "#E5E5EA",
                  borderRadius: "20px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{message.type} : </span>{" "}
                {message.text}
              </div>
            </>
          ))}
          {click && (
            <div style={{ marginLeft: "12px" }}>
              <ThreeDots
                height="60"
                width="50"
                radius="9"
                color="#0804f9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            position: "absolute",
            bottom: 10,
            width: "98%",
          }}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "16px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            disabled={click}
          >
            Send
          </button>
        </div>
      </div>
      <div
        style={{
          marginTop: "14px",
          marginRight: "10px",
          fontSize: "20px",
          fontWeight: 600,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        Developed By Techlabs.cc
      </div>
    </>
  );
}
