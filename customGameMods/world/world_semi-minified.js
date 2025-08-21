this.modulesChestPos = [98, 1, 63];


onPlayerJoin_ = (playerId) => {
    this.Chat.onPlayerJoin(playerId)
};

tick = (ms) => {
    initHelper(ms)
};


this.onPlayerJoinPendingPlayers = new Set();
tickHelper = ms => { if (this.allModulesInitialised) onPlayerJoinHelper(); else { if (!this.modulesChest) return void (this.modulesChest = api.getBlock(...this.modulesChestPos)); if (this.pendingInit) { try { eval(api.getStandardChestItemSlot(this.modulesChestPos, 0).attributes.customDisplayName), this.pendingInit = !1 } catch (e) { console.log("Error loading ModuleLoader, trying again...") } this.pendingInit = !1 } this.ModuleLoader?.currentModuleChestIndex && this.ModuleLoader.initModule(this.ModuleLoader?.currentModuleChestIndex) } }, onPlayerJoin = e => { this.allModulesInitialised || (this.modulesChest = api.getBlock(...this.modulesChestPos), this.pendingInit = !0), this.onPlayerJoinPendingPlayers.add(e) }, initHelper = e => { tickHelper(e), onPlayerJoinHelper() }, onPlayerJoinHelper = () => { if (!this.onPlayerJoinPendingPlayers.size) return; this.onPlayerJoinPendingPlayers.size; const e = this.onPlayerJoinPendingPlayers.values().next().value; onPlayerJoin_(e), this.onPlayerJoinPendingPlayers.delete(e) };