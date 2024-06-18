/* eslint-disable react/prop-types */
import { Storage } from "../service/Storage"

export const ChatList = ({chatList, setChatList, setChatID}) => {
    
    const deleteChat = (chatID) => {
        Storage.delete(chatID)
        const filteredChatList = chatList.filter(item => item.id !== chatID)
        setChatList(filteredChatList)
        setChatID('')
    }

    return (
        <ul>
            <li className="newChat" onClick={() => setChatID('')}>New chat</li>
            {chatList.map(chat => (
                <li key={chat.id}><span onClick={() => setChatID(chat.id)}>{chat.name}</span><i onClick={() => deleteChat(chat.id)} className="fa-regular fa-trash-can"></i></li>
            ))}
        </ul>
    )
}