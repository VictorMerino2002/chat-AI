/* eslint-disable react/prop-types */
import { useState } from "react"
import { ChatList } from "./ChatList"
import "./styles/Menu.css"

export const Menu = ({chatList, setChatID, setChatList}) => {
    const [showMenu, setShowMenu] = useState(true)

    return (
        <aside className={`menu ${showMenu ? 'open' : ''}`}>
            <header>
                <button onClick={() => setShowMenu(!showMenu)}><i className="fa-solid fa-bars"></i></button>
            </header>

            <ChatList setChatID={setChatID} chatList={chatList} setChatList={setChatList} />
        </aside>
    )
}