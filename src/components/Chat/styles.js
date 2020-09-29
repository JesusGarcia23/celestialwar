import styled from 'styled-components';

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: ${props => props.yourMessage ? "flex-end" : "flex-start"};
    align-items: ${props => props.yourMessage ? "flex-end" : "flex-start"};
    margin: 2px 10px;
    width: 60%;
    border: 1px solid red;
`

export const Sender = styled.div`
    font-size: 12px;
    margin: 5px 5px;
    text-align: right;
`

export const Message = styled.div`
    margin: 5px 5px;
    padding: 0px 10px;
    border-radius: 5px;
    background-color: ${props => props.yourMessage ? "rgba(137, 196, 244, 1)" : "rgb(206, 205, 205)"}; 
`
