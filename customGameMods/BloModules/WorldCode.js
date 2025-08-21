
// Coordinates of the chest that contains the modules.
// Slot 0 always has to be ModuleLoader
this.Game = {}
this.Game.modulesChestPos = [333, 1, 112]


onPlayerJoin_ = (playerId) => {
    // You can use modules here.

};


tick = (ms) => {
    if (!this.Game.fullyInitialised) initialize()

    // Can safely use all modules here
};

onPlayerLeave = (playerId) => {
}

onPlayerJoin = (playerId) => {
    if (this.ModuleLoader?.allModulesInitialised)
        return onPlayerJoin_(playerId);
    (this.Game.pendingPlayers ??= new Set()).add(playerId);
    if (!this.Game.modulesChest || this.Game.modulesChest === "Unloaded")
        return this.Game.modulesChest = api.getBlock(...this.Game.modulesChestPos);
    this.Game.pendingModuleLoaderInit ??= true;
};


initialize = () => {
    if (!this.ModuleLoader?.allModulesInitialised) {
        if (!this.Game.modulesChest || this.Game.modulesChest === "Unloaded")
            return this.Game.modulesChest = api.getBlock(...this.Game.modulesChestPos);
        if (this.Game.pendingModuleLoaderInit) {
            eval(api.getStandardChestItemSlot(this.Game.modulesChestPos, 0).attributes.customDisplayName)
            delete this.Game.pendingModuleLoaderInit
            return;
        }
        this.ModuleLoader?.initNextModule()
        return;
    }
    if (this.ModuleLoader?.allModulesInitialised && this.Game.pendingPlayers?.size) {
        const playerId = this.Game.pendingPlayers.values().next().value;
        api.playerIsInGame(playerId) && onPlayerJoin_(playerId);
        this.Game.pendingPlayers.delete(playerId);

        if (!this.Game.pendingPlayers.size) {
            delete this.Game.pendingPlayers;
            this.Game.fullyInitialised = true;
        }
    }
}