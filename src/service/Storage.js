export class Storage {
    static save(chatID,content) {
        localStorage.setItem(chatID, JSON.stringify(content))
    }

    static load(chatID) {
        return JSON.parse(localStorage.getItem(chatID)) ?? []
    }

    static saveChatList(chatList) {
        localStorage.setItem('chatList',JSON.stringify(chatList))
    }

    static loadChatList() {
       return JSON.parse(localStorage.getItem('chatList')) ?? []
    }

    static delete(chatID) {
        localStorage.removeItem(chatID)
        const chatList = JSON.parse(localStorage.getItem('chatList'))

        const filteredChatList = chatList.filter(item => item.id !== chatID)
        localStorage.setItem('chatList',JSON.stringify(filteredChatList))
    }
}