
// Coordinates of the chest that contains the modules.
// Slot 0 always has to be ModuleLoader
this.modulesChestPos = [98, 1, 63];

this.modulesChest = null;

onPlayerJoin = (playerId) => {
    if (!this.allModulesInitialised) {
        if (!this.onPlayerJoinPendingPlayers)
            this.onPlayerJoinPendingPlayers = new Set();

        this.modulesChest = api.getBlock(...this.modulesChestPos);
        this.pendingInit = true;
        this.onPlayerJoinPendingPlayers.add(playerId);
        return;
    }
    onPlayerJoinAfterAllModulesHaveLoaded(playerId);
};

onPlayerJoinAfterAllModulesHaveLoaded = (playerId) => {
    this.Chat.onPlayerJoin(playerId)
};

onPlayerJoinHelper = () => {
    // TODO before doing any operations, check if player still in game
    if (!this.onPlayerJoinPendingPlayers) return;

    if (this.onPlayerJoinPendingPlayers.size) {
        const playerId = this.onPlayerJoinPendingPlayers.values().next().value;
        onPlayerJoinAfterAllModulesHaveLoaded(playerId)
        this.onPlayerJoinPendingPlayers.delete(playerId);
        if (!this.onPlayerJoinPendingPlayers.size) {
            delete this.onPlayerJoinPendingPlayers;
        }
    }
}

tick = () => {
    if (!this.allModulesInitialised) {
        if (!this.modulesChest) {
            this.modulesChest = api.getBlock(...this.modulesChestPos)
            return;
        }
        if (this.pendingInit) {
            try {
                eval(api.getStandardChestItemSlot(this.modulesChestPos, 0).attributes.customDisplayName)
                this.pendingInit = false;
            } catch (e) {
                console.log("Error loading ModuleLoader, trying again...")
            }
            this.pendingInit = false;
        }
        if (this.ModuleLoader?.currentModuleChestIndex) {
            this.ModuleLoader.initModule(this.ModuleLoader?.currentModuleChestIndex)
        }
        return;
    }

    onPlayerJoinHelper()


    this.Chat.test()
};