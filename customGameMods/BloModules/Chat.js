class Chat {
    constructor() {
        if (globalThis.Chat instanceof ModuleLoader) {
            return globalThis.Chat;
        }
        globalThis.Chat = this;
    }
    test = () => {
        api.log("Chat module works!")
    }
    onPlayerJoin = (playerId) => {
        api.log("Successfully called Chat's onplayerjoin")
    };
    /* And any other callback */
    onPlayerChat = (playerId, chatMessage, channelName) => { };
}
new Chat();