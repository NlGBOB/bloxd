class ModuleLoader {
    constructor() {
        if (globalThis.ModuleLoader instanceof ModuleLoader) {
            return globalThis.ModuleLoader;
        }
        globalThis.ModuleLoader = this;
        this.currentModuleChestIndex = 1;
        console.log("ModuleLoader successfully initialised.");
    }

    initModule() {
        if (this.currentModuleChestIndex <= 35 - api.getStandardChestFreeSlotCount(globalThis.modulesChestPos)) {

            const module = api.getStandardChestItemSlot(globalThis.modulesChestPos, this.currentModuleChestIndex);

            if (module && module.attributes && typeof module.attributes.customDisplayName === 'string' && module.attributes.customDisplayName.trim() !== '') {
                try {
                    eval(module.attributes.customDisplayName);
                    console.log("ModuleLoader: Successfully loaded module from slot " + this.currentModuleChestIndex + ".");
                } catch (e) {
                    console.log("ModuleLoader: Failed to load module from slot " + this.currentModuleChestIndex + ". Error:", e);
                }
            } else {
                console.log("ModuleLoader: Slot " + this.currentModuleChestIndex + " is empty or missing a valid 'customDisplayName' attribute. Skipping.");
            }
            this.currentModuleChestIndex += 1;

        } else {
            delete this.currentModuleChestIndex;

            globalThis.allModulesInitialised = true;
            console.log("ModuleLoader: Finished loading modules");
        }
    }
}
new ModuleLoader();
