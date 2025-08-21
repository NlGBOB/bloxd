this.modulesChestPos = [98, 1, 63];
this.chestMaxSlots = 36;
this.allModulesInitialised = false;
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
            api.log("the chest:", api.getStandardChestItemSlot(this.modulesChestPos, moduleLoaderChestIndex).attributes.customDisplayName)
            eval(api.getStandardChestItemSlot(this.modulesChestPos, moduleLoaderChestIndex).attributes.customDisplayName)
        }
        if (this.ModuleLoader?.currentModuleChestIndex) {
            this.ModuleLoader.initModule(this.ModuleLoader?.currentModuleChestIndex)
        }
        return;
    }
    // Only after all modules are initialised, you can use them!
    // this.Chat.test()
};