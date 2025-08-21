class ModuleLoader {
    constructor() {
        if (globalThis.ModuleLoader) {
            return globalThis.ModuleLoader;
        }
        globalThis.ModuleLoader = this;
        globalThis.ModuleLoader.currentModuleChestIndex = 1;
        globalThis.ModuleLoader.lastModuleIndex = globalThis.chestMaxSlots - api.getStandardChestFreeSlotCount(globalThis.modulesChestPos) - 1;
        api.log("ModuleLoader successfully initialised")

    }

    initModule(currentModuleChestIndex) {
        if (globalThis.ModuleLoader.currentModuleChestIndex <= globalThis.ModuleLoader.lastModuleIndex) {
            const module = api.getStandardChestItemSlot(globalThis.modulesChestPos, globalThis.ModuleLoader.currentModuleChestIndex);
            if (module && module.attributes && module.attributes.customDisplayName) {
                try {
                    eval(module.attributes.customDisplayName);
                    globalThis.ModuleLoader.currentModuleChestIndex += 1;
                } catch (e) {
                    console.error("Failed to load module from slot" + globalThis.ModuleLoader.currentModuleChestIndex, e);
                }
            }
        } else {
            globalThis.allModulesInitialised = true;
            delete globalThis.ModuleLoader.currentModuleChestIndex;
            delete globalThis.ModuleLoader.lastModuleIndex
        }

    }
}
new ModuleLoader()