class 🕜 {
    constructor() {
        const Class = this.constructor;
        if (globalThis[Class.name] instanceof Class) {
            return globalThis[Class.name];
        } globalThis[Class.name] = this;

        this.🕔 = 1;
        this.🕠 = 35 - api.getStandardChestFreeSlotCount(globalThis.🕛.🕧)
        console.log("ModuleLoader successfully initialised.");
    }

    🕓() {
        if (this.🕔 <= this.🕠) {
            try {
                eval(api.getStandardChestItemSlot(globalThis.🕛.🕧, this.🕔).attributes.customDisplayName);
                console.log("ModuleLoader: Successfully loaded module from slot " + this.🕔 + ".");
            } catch (e) {
                console.log("ModuleLoader: Failed to load module from slot " + this.🕔 + ". Error:", e);
            }

            this.🕔 += 1;

        } else {
            delete this.🕔;
            this.🕑 = true;
        }
    }

    static {
        new this();
    }
}