(() => {
    const handlePlayerJoin = (playerId) => {
        api.sendMessage(playerId, "Welcome to the server!", { color: "yellow" });
    };

    const handlePlayerLeave = (playerId) => {
        api.broadcastMessage(`${api.getEntityName(playerId)} has left.`);
    };

    return {
        onJoin: handlePlayerJoin,
        onLeave: handlePlayerLeave
    };
})();