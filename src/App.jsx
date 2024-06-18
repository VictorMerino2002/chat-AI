import { useEffect, useState } from "react"
import { Chat } from "./components/Chat"
import { useEngine } from "./hooks/useEngine"
import { Storage } from "./service/Storage"
import { v4 as uuidv4 } from 'uuid'
import { Menu } from "./components/Menu"
import { LoadingSpinner } from "./components/LoadingSpiner"
import { AISelector } from "./components/AISelector"

function App() {
  const [chatList, setChatList] = useState(() => Storage.loadChatList())
  const [chatID,setChatID] = useState('')
  const [messages, setMessages] = useState(() => Storage.load(chatID))
  useEffect(() => {
    setMessages(Storage.load(chatID))
  },[chatID]) 
  const [AIModel, setAIModel] = useState('gemma-2b-it-q4f32_1-MLC')
  const {engine, loading, loadState, disableBtn:[disableBtn, setDisableBtn]} = useEngine(AIModel)
  const [messageText, setMessageText] = useState('')

  const addMessage = ({content, role},messages) => {
    if (messages) {
      setMessages([...messages, { role, content }])
    } else setMessages(prevMessages => [...prevMessages, {role, content}])
  }

  const getAIReply = async (userMsg) => {
    const newMessages = [...messages, userMsg]
    const chunks = await engine.chat.completions.create({ messages: newMessages, stream: true })

    let reply = ''

    for await (const chunk of chunks) {
      const [choice] = chunk.choices
      const content = choice?.delta?.content ?? ''
      reply += content
      addMessage({content:reply,role: 'assistant'},newMessages)
    }
    return {role: 'assistant', content:reply}
  }

  const saveChatContent = (chatContent) => {
    if (!chatID) {
      const newChatID = `chat-${uuidv4()}`
      const newChatList = [...chatList, {id: newChatID, name: [messageText.split(20)]}]
      
      Storage.saveChatList(newChatList)
      Storage.save(newChatID,chatContent)
      
      setChatID(newChatID)
      setChatList(newChatList)
    } else {
      Storage.save(chatID,chatContent)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (messageText === '') return

    const userMsg = {role:'user', content:messageText}
    addMessage(userMsg)
    setMessageText('')
    setDisableBtn(true)

    const chatContent = [...messages,userMsg,await getAIReply(userMsg)]

    saveChatContent(chatContent)
    setDisableBtn(false)
  }

  return (
    <main>
        <Menu chatList={chatList} setChatID={setChatID} setChatList={setChatList} setAIModel={setAIModel}/>
        <section>
            <div className="container">
                <AISelector setAIModel={setAIModel}/>
                {loading ? <LoadingSpinner /> : null}
                <Chat messages={messages}/>
            </div>

            <form onSubmit={handleSubmit}>
                <input placeholder="Write your message here ..." value={messageText} onChange={(event) => setMessageText(event.target.value)}/>
                <button disabled={disableBtn ? true : false}><i className="fa-solid fa-arrow-up"></i></button>
            </form>

            <small>{loadState}</small>
        </section>
    </main>
  )
}

export default App
