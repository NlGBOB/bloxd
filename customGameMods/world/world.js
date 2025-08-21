this.modulesChestPos = [98, 1, 63];
this.allModulesInitialised = false;
this.onPlayerJoinPendingPlayers = new Set();

const moduleLoaderChestIndex = 0;

onPlayerJoin = (playerId) => {
    if (!this.allModulesInitialised) {
        api.getBlock(...this.modulesChestPos);
        this.pendingInit = true;
    }
    this.onPlayerJoinPendingPlayers.add(playerId);
};

onPlayerJoinAfterAllModulesHaveLoaded = (playerId) => {
    this.Chat.onPlayerJoin(playerId)
};

tick = () => {
    if (!this.allModulesInitialised && api.getBlock(...this.modulesChestPos)) {
        if (this.pendingInit) {
            this.pendingInit = false;
            eval(api.getStandardChestItemSlot(this.modulesChestPos, moduleLoaderChestIndex).attributes.customDisplayName)
        }
        if (this.ModuleLoader?.currentModuleChestIndex) {
            this.ModuleLoader.initModule(this.ModuleLoader?.currentModuleChestIndex)
        }
        return;
    }
    if (this.onPlayerJoinPendingPlayers.size) {
        const playerId = this.onPlayerJoinPendingPlayers.values().next().value;
        onPlayerJoinAfterAllModulesHaveLoaded(playerId)
        this.onPlayerJoinPendingPlayers.delete(playerId);
    }


    // this.Chat.test()
};