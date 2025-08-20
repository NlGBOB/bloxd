const modules = [
    {
        chestPos: [0, 0, 0],
        moduleMap: {
            blochat: [1, 2, 3],
            foo: [4, 5],
            bar: [6]
        }
    },
    {
        chestPos: [1, 0, 0],
        moduleMap: {
            blochat: [7, 8],
            baz: [9]
        }
    },
    {
        chestPos: [0, 1, 0],
        moduleMap: {
            qux: [10, 11],
            foo: [12]
        }
    }
];


this.game = this.game || new (class {
    constructor(modulesMap = {}) {
        this.moduleNames = []
        for (const item of modulesMap) {
            const { chestPos, moduleMap } = item;
            for (const [moduleName, chestIdx] of Object.entries(moduleMap)) {
                this.moduleNames.push(moduleName);
                this[moduleName] = {};
                this[moduleName].initialized = false;
                this[moduleName].chestPos = chestPos;
                this[moduleName].chestIdx = chestIdx;
            }
        }
        this.initializeModules();
    }

    initializeModules() {
        for (const moduleName of this.moduleNames) {
            const module = this[moduleName];

            // if (no errors)
            this.setInitialized(moduleName)
        }
    }


    setInitialized(moduleName) {
        this[moduleName].initialized = true;
    }

    allModulesInitialized() {
        return Object.keys(this._modulesData).every(
            key => this[key]?.initialized === true
        );
    }


})(modules);





tick = () => {
    if (!this.game.pendingInit && !this.game.allModulesInitialized()) {
        this.game.initializeModules();
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