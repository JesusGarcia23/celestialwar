import styled, { css } from 'styled-components';

export const TeamSocket = styled.div`
    border: ${props => props.side === "angel" ? "1px solid blue" : "1px solid red" };
    width: 77%;
    height: 100%;

    ${props => props.team && props.team.findIndex(playerToFind => playerToFind.username === props.username) >= 0 && css`  
        &:hover { 
            border: 1px solid yellow; 
            cursor: pointer;
        }
    `}
`

export const SocketOptions = styled.div`
    border: 1px solid green;
    width: 23%;
`