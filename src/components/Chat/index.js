import React, { useState } from 'react';
import './style.css';
import { MessageContainer, Sender, Message } from './styles';

const Chat = (props) => {

    const [ chatInput, setChatInput ] = useState("");

    const { messagesList, user } = props; 

    const handleInputChange = (event) => {
        const { value } = event.target;
        setChatInput(value);
    }

    const handleSendMessage = () => {

    }

    const displayListMessages = () => {
       return messagesList && messagesList.map(msg => {
           return (
               <MessageContainer yourMessage={msg.sender === user.username}>
                    <Sender>{msg.sender}</Sender>
                    <Message>{msg.message}</Message> 
               </MessageContainer>
           )
       })
    }

    return (
        <div className="chat-container">
            <div className="list-messages-container">
                {displayListMessages()}
            </div>

            <div className="input-container">
                <input className="chat-input" value={chatInput} onChange={ e => handleInputChange(e)}></input>
                <button className="send-button" onClick={e => handleSendMessage(e)}>Send</button>
            </div>
        </div>
    )
}

export default Chat;