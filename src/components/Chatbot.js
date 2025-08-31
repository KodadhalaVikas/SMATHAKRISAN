import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../styles/Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faTimes, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const KrishnaHelpline = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = (text) => {
    const userMessage = { sender: 'user', text };
    let reply;
    if (selectedLanguage === 'te-IN') {
      reply = { sender: 'bot', text: 'హే, ఇది స్మతక్రిసన్. నేను ఇంకా నేర్చుకుంటున్నాను. కొంత సమయం కావాలి!!!' };
    } else if (selectedLanguage === 'hi-IN') {
      reply = { sender: 'bot', text: 'अरे, यह स्मथकृष्णन है। मैं अभी भी सीख रहा हूँ। कुछ समय चाहिए!!!' };
    } else {
      reply = { sender: 'bot', text: 'Hey, this is Smathakrisan. I am still learning. Need some time!!!' };
    }

    setMessages([...messages, userMessage, reply]);
    setInputText('');

    if (text !== inputText) {
      speak(reply.text);
    }
  };

  const handleSpeechInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLanguage;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputText);
    }
  };

  return (
    <Draggable>
      <div className={`chatbot ${isMinimized ? 'minimized' : ''}`}>
        {isMinimized ? (
          <div className="chatbot-icon" onClick={toggleMinimize}>
            <FontAwesomeIcon icon={faCommentDots} size="2x" />
          </div>
        ) : (
          <>
            <div className="chatbot-header">
              Krisan-Helpline
              <button className="close-button" onClick={toggleMinimize}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown} // Add keydown event handler
              />
              <button onClick={handleSpeechInput}>
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
              <button onClick={() => handleSendMessage(inputText)}>Send</button>
              <div className="dropdown">
                <select value={selectedLanguage} onChange={handleLanguageChange}>
                  <option value="en-US">English</option>
                  <option value="te-IN">Telugu</option>
                  <option value="hi-IN">Hindi</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
};

export default KrishnaHelpline;
