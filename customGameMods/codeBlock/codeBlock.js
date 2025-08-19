const CODE_CHEST_POS = [0, 0, 0];
const bootstrapperCode = `
(() => {
    const CHEST_POS = [0, 0, 0];
    const loadModule = (moduleName, slotIndex) => {
        try {
            const itemData = api.getStandardChestItemSlot(CHEST_POS, slotIndex);
            if (itemData && itemData.attributes.customAttributes.code) {
                const moduleInterface = eval(itemData.attributes.customAttributes.code);
                this.game.modules[moduleName] = moduleInterface;
                api.log(\`Loaded module: ${moduleName} from slot \`);
            } else {
                throw new Error(\`No code found in chest slot \${slotIndex}\`);
            }
        } catch (e) {
            api.log(\`ERROR loading module '${moduleName}': ${e.message}\`);
        }
    };
    a
    const moduleSlots = {
        "playerLogic": 1,
        "gameLogic": 2,
    };

    this.game.modules = {};

    for (const moduleName in moduleSlots) {
        const slot = moduleSlots[moduleName];
        loadModule(moduleName, slot);
    }
})();
`;

const playerLogicCode = `

`;

const gameLogicCode = `

`;



api.setStandardChestItemSlot(CODE_CHEST_POS, 0, "Compass", 1, myId, {
    customDisplayName: "Bootstrapper",
    customAttributes: { code: bootstrapperCode }
});

api.setStandardChestItemSlot(CODE_CHEST_POS, 1, "Compass", 1, myId, {
    customDisplayName: "Module: playerLogic",
    customAttributes: { code: playerLogicCode }
});

api.setStandardChestItemSlot(CODE_CHEST_POS, 2, "Compass", 1, myId, {
    customDisplayName: "Module: gameLogic",
    customAttributes: { code: gameLogicCode }
});



api.log("Code chest at [0,0,0] has been configured.");