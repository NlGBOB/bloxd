class Chat {
    constructor() {
        if (globalThis.Chat) {
            return globalThis.Chat;
        }
        globalThis.Chat = this;
        api.log("Chat successfully initialised")
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
        api.log("AMONGIS, HI FROM Chat class");
    };
}
new Chat();