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

    };

    onPlayerLeave = (playerId) => {

    };

    playerCommand = (playerId, command) => {

    };

    onPlayerChat = (playerId, chatMessage, channelName) => {
    };
}
new Chat();