
// Coordinates of the chest that contains the modules.
// Slot 0 always has to be ModuleLoader
this.Game = {}

this.Game.modulesChestPos = [98, 1, 63]



onPlayerJoinAfterAllModulesHaveLoaded = (playerId) => {
    this.Chat.onPlayerJoin(playerId)
};


onPlayerJoinHelper = () => {
    if (this.pendingPlayers) return;

    if (this.pendingPlayers.size) {
        const playerId = this.pendingPlayers.values().next().value;
        if (api.playerIsInGame(playerId))
            onPlayerJoinAfterAllModulesHaveLoaded(playerId)
        this.pendingPlayers.delete(playerId);
        if (!this.pendingPlayers.size) {
            delete this.pendingPlayers;
        }
    }
}


onPlayerJoin = (playerId) => {
    if (this.ModuleLoader?.allModulesInitialised)
        return onPlayerJoinAfterAllModulesHaveLoaded(playerId);
    (this.Game.pendingPlayers ??= new Set()).add(playerId);
    this.Game.modulesChest ||= api.getBlock(...this.Game.modulesChestPos);
    this.Game.pendingModuleLoaderInit ??= true;
};


tick = () => {
    // if (doneProcessing)


    if (!this.ModuleLoader?.allModulesInitialised) {
        if (!(this.Game.modulesChest ||= api.getBlock(...this.Game.modulesChestPos))) return;
        if (this.Game.pendingModuleLoaderInit ||= api.getStandardChestItemSlot(this.modulesChestPos, 0)) {
            eval(this.Game.pendingModuleLoaderInit.attributes.customDisplayName)
            delete this.Game.pendingModuleLoaderInit
            return; // We're gonna process the rest of the modules in the next tick.
        }
        this.ModuleLoader.initNextModule()
        return;
    }

    onPlayerJoinHelper()


    this.Chat.test()
};