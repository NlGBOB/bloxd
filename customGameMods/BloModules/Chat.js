class Chat {
    constructor() {
        const Class = this.constructor;
        if (globalThis[Class.name] instanceof Class) {
            return globalThis[Class.name];
        } globalThis[Class.name] = this;
    }
    test = () => {
        api.log("Chat module works!")
    }
    onPlayerJoin = (playerId) => {
        api.log("Successfully called Chat's onplayerjoin")
    };
    /* And any other callback */
    onPlayerChat = (playerId, chatMessage, channelName) => { };


    static {
        new this();
    }
}