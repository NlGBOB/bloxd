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
        api.log("Successfully called chat's onplayerjoin")
    };

    onPlayerLeave = (playerId) => {

    };

    playerCommand = (playerId, command) => {

    };

    onPlayerChat = (playerId, chatMessage, channelName) => {
    };
}
new Chat();