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
            blochat2: [7, 8],
            baz2: [9]
        }
    },
    {
        chestPos: [0, 1, 0],
        moduleMap: {
            qux3: [10, 11],
            foo3: [12]
        }
    }
];

// this is the initializer function, is defined in a chest slot
function blochat(values) {
    console.log("blochat:", values);
    // does something calls something
}



this.game = this.game || new (class {
    constructor(modules) {
        modules.forEach(({ chestPos, moduleMap }) =>
            Object.entries(moduleMap).forEach(([moduleName, chestIdx]) => {
                this[moduleName] = {};
                this.initializeModule(moduleName, chestPos, chestIdx);
            })
        );
    }


    initializeModule(moduleName, chestPos, chestIdx) {
        // something like eval (getStandart...)
        const code = api.getStandardChestItemSlot(...chestPos, chestIdx); /// TODO will contain code written beforehand.
        try {
            eval(code);
            this[moduleName].initialized = true;
        } catch (e) {
            // handle error
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