class ModuleLoader {
    constructor() {
        const Class = this.constructor;
        if (globalThis[Class.name] instanceof Class) {
            return globalThis[Class.name];
        } globalThis[Class.name] = this;

        this.currentModuleChestIndex = 1;
        this.maxChestIndexModule = 35 - api.getStandardChestFreeSlotCount(globalThis.Game.modulesChestPos)
        console.log("ModuleLoader successfully initialised.");
    }

    initNextModule() {
        if (this.currentModuleChestIndex <= this.maxChestIndexModule) {
            try {
                eval(api.getStandardChestItemSlot(globalThis.Game.modulesChestPos, this.currentModuleChestIndex).attributes.customDisplayName);
                console.log("ModuleLoader: Successfully loaded module from slot " + this.currentModuleChestIndex + ".");
            } catch (e) {
                console.log("ModuleLoader: Failed to load module from slot " + this.currentModuleChestIndex + ". Error:", e);
            }

            this.currentModuleChestIndex += 1;

        } else {
            delete this.currentModuleChestIndex;
            this.allModulesInitialised = true;
        }
    }

    static {
        new this();
    }
}
