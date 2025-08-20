const modules = ["blochat", "foo", "bar"];
this.game = this.game || new (class {
    constructor(moduleKeys = []) {
        moduleKeys.forEach(key => {
            this[key] = { initialized: false };
        });
    }
    setInitialized(moduleKey) {
        if (this[moduleKey]) this[moduleKey].initialized = true;
    }
    allModulesInitialized() {
        return modules.every(key => this[key]?.initialized === true);
    }

    // doesn't work gotta find smth smarter
    initializeModules() {
        Object.keys(moduleInitializers).forEach(key => {
            if (this[key] && !this[key].initialized) {
                moduleInitializers[key](this); // pass the game singleton
            }
        });
    }
})(modules);


tick = () => {
    if (!this.game.allModulesInitialized()) {
        return;
    }
    tick_blochat();
};

onPlayerJoin = (playerId) => {
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