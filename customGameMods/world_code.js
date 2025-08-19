const CODE_CHEST_POS = [0, 0, 0];
this.game = {};

tick = (ms) => {
    if (this.game.pendingInit) {
        if (this.game.pendingInit.requested) {
            try {
                const p = this.game.pendingInit;
                eval(api.getStandardChestItemSlot(CODE_CHEST_POS, 0).attributes.customAttributes.code);
                api.log("Game initialized successfully");
                this.game.modules.playerLogic.onJoin(p.id, p.fromReset);
            } catch (e) {
                api.log(`FATAL ERROR: ${e.message}`);
            }
            this.game.pendingInit = null;
        } else {
            api.getBlock(CODE_CHEST_POS[0], CODE_CHEST_POS[1], CODE_CHEST_POS[2]);
            this.game.pendingInit.requested = true;
        }
    }
    this.game.modules?.gameLogic?.tick(ms);
};

onPlayerJoin = (playerId, fromGameReset) => {
    if (!this.game.modules && !this.game.pendingInit) {
        this.game.pendingInit = { id: playerId };
        return;
    }
    this.game.modules?.playerLogic?.onJoin(playerId, fromGameReset);
};

onPlayerLeave = (playerId, serverIsShuttingDown) => {
    this.game.modules?.playerLogic?.onLeave(playerId, serverIsShuttingDown);
};