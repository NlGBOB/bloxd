class Chat {
    constructor() {
        const Class = this.constructor;
        if (globalThis[Class.name] instanceof Class) {
            return globalThis[Class.name];
        } globalThis[Class.name] = this;
    }
    onPlayerJoin = (playerId) => {
        api.log("Successfully called Chat's onplayerjoin")
    };
    /* Any other callback */
    onPlayerChat = (playerId, chatMessage, channelName) => { };


    static {
        new this();
    }
}