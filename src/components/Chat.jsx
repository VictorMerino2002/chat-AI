/* eslint-disable react/prop-types */
import "./styles/Chat.css"

export const Chat = ({messages}) => {
    return (
        <ul>
        {messages.map((msg, index) => (
            <li key={index} className={"message " + msg.role}>
                <span>{msg.role === 'user' ? 'Tú' : 'AI'}</span>
                <p>{msg.content}</p>
            </li>
        ))}
        </ul>
    )
}