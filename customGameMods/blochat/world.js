const chestPos = [0, 0, 0];

this.game = this.game || new (class {
    constructor(modules) {
        this.
    }


    initializeModule(moduleName, chestPos, chestIdx) {
        // something like eval (getStandart...)
        const code = api.getStandardChestItemSlot(...chestPos, chestIdx);
        try {
            eval(code);
            this[moduleName].initialized = true;
        } catch (e) {
            // handle error
        }

    }
})(modules);





tick = () => {
    if (!this.game.pendingInit && !this.game.allModulesInitialized()) {
        this.game.initializeModules();
        return;
    }
    tick_blochat();
};

const lobbyInitHandler = (playerId) => {

}

onPlayerJoin = (playerId) => {
    api.getBlock(0, 0, 0)

    onPlayerJoin_blochat(playerId);
};

onPlayerLeave = (playerId) => {
    onPlayerLeave_blochat(playerId);
};

playerCommand = (playerId, command) => {
    // Let the bloChat system try to handle the command first.
    // If it returns true, the command was handled. If false, it wasn't.
    const wasHandled = playerCommand_blochat(playerId, command);

    // You could add other command handlers here like:
    // if (!wasHandled) {
    //     wasHandled = playerCommand_otherSystem(playerId, command);
    // }

    return wasHandled;
};

onPlayerChat = (playerId, chatMessage, channelName) => {
    // The handler returns `false` to cancel default chat, `true` to allow it.
    return onPlayerChat_blochat(playerId, chatMessage, channelName);
};