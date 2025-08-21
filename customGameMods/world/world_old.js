this.modulesChestPos = [98, 1, 63];
this.chestMaxSlots = 36;
const moduleLoaderChestIndex = 0;

onPlayerJoin = (playerId) => {
    if (!this.allModulesInitialised) {
        api.getBlock(...this.modulesChestPos); // just to load the chest to make it available
        this.pendingInit = true;
    }
};


tick = () => {
    if (!this.allModulesInitialised) {
        if (this.pendingInit) {
            this.pendingInit = false;
            moduleLoaderInit();
            // this.allModulesInitialised = true; this should be set when we initialise!
        }
        if (this.ModuleLoader?.currentModuleChestIndex) {
            this.ModuleLoader.initModule(this.ModuleLoader?.currentModuleChestIndex)
        }
        return;
    }
    this.updateGameState();
    this.handlePlayerActions();
};

moduleLoaderInit = () => {
    const moduleLoaderCode = api.getStandardChestItemSlot(this.modulesChestPos, moduleLoaderChestIndex).attributes.customDisplayName;
    eval(moduleLoaderCode)
    this.chestModuleIndexToLoad = 1;
};
