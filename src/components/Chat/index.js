import React, { useEffect, useState, useRef } from 'react';
import { sendMessage } from '../../sockets/emit/roomEmit';
import './style.css';
import { MessageContainer, Sender, Message } from './styles';

const Chat = (props) => {

    const [ chatInput, setChatInput ] = useState("");

    const containerRef = useRef(null);

    const { messagesList, user, roomId } = props; 


    useEffect(() => {
        if(containerRef && containerRef.current) {
            const element = containerRef.current;
            element.scroll({
              top: element.scrollHeight,
              left: 0,
              behavior: "smooth"
            })
          }
    })

    const handleInputChange = (event) => {
        const { value } = event.target;
        setChatInput(value);
    }

    const handleSendMessage = () => {
        sendMessage(user, chatInput, roomId);
        setChatInput("");
    }

    const displayListMessages = () => {
       return messagesList && messagesList.map((msg, index) => {
           return (
               <MessageContainer yourMessage={msg.sender === user.username} key={index}>
                    <Sender>{msg.sender}</Sender>
                    <Message yourMessage={msg.sender === user.username}>{msg.message}</Message> 
               </MessageContainer>
           )
       })
    }

    return (
        <div className="chat-container">
            <div className="list-messages-container" ref={containerRef}>
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