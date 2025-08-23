class Loader {
    constructor() {
        const Class = this.constructor;

        // Ensure this class is a singleton
        if (globalThis[Class.name] instanceof Class) {
            return globalThis[Class.name];
        }
        globalThis[Class.name] = this;

        // --- Module Configuration ---
        // The chest where code chunks are stored.
        this.chestPosition = [-52, 1, -64];
        // The block where the source code is read from.
        this.sourceCodeBlockPosition = [-54, 1, -66];
        // The maximum character limit for a stringified chest slot payload.
        this.chunkSize = 1976;
        // The player ID used for the api.setStandardChestItemSlot call.
        this.myId = "your_player_id_here"; // <-- IMPORTANT: Set your player ID here

        // Counter for binary search iterations (for debugging/performance checks).
        this.counter = 0;
    }

    /**
     * Dynamically splits a raw code string using a BINARY SEARCH for optimal chunk size,
     * ensuring each chunk respects the server-side JSON.stringify() length limit.
     * @param {string} rawCodeString The raw JavaScript code to save.
     * @param {number[]} position The [x, y, z] coordinates of the chest.
     */
    saveCodeToChest = (rawCodeString, position) => {
        api.log(`--- Starting High-Performance Save Process ---`);
        api.log(`Total code length to save: ${rawCodeString.length}`);

        const finalChunks = [];
        let cursor = 0;

        while (cursor < rawCodeString.length) {
            const searchSpace = rawCodeString.substring(cursor, cursor + this.chunkSize);

            let low = 0;
            let high = searchSpace.length;
            let bestLength = 0;

            while (low <= high) {
                this.counter++;
                const mid = Math.floor((low + high) / 2);
                if (mid === 0) {
                    low = mid + 1;
                    continue;
                }
                const potentialChunk = searchSpace.substring(0, mid);
                const attributesToTest = { customDescription: potentialChunk };
                const finalPayloadString = JSON.stringify(attributesToTest);

                if (finalPayloadString.length <= this.chunkSize) {
                    bestLength = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }

            if (bestLength === 0) {
                api.log("❌ CRITICAL ERROR: Could not fit even a single character into a chunk. Aborting.");
                return;
            }

            const finalChunk = searchSpace.substring(0, bestLength);
            finalChunks.push(finalChunk);
            cursor += finalChunk.length;
        }

        const totalChunks = finalChunks.length;
        api.log(`Code was dynamically split into ${totalChunks} compliant chunks.`);

        for (let slotIndex = 0; slotIndex < totalChunks; slotIndex++) {
            const chunkToSave = finalChunks[slotIndex];
            const attributes = { customDescription: chunkToSave };
            const remainingChunks = totalChunks - slotIndex;
            api.setStandardChestItemSlot(position, slotIndex, "Net", remainingChunks, this.myId, attributes);
        }

        api.log(`✅ Saved ${totalChunks} chunks of code to the chest at [${position.join(', ')}].`);
    }

    /**
     * Loads code chunks from a chest, reassembles them, verifies integrity, and executes the code.
     * @param {number[]} position The [x, y, z] coordinates of the chest.
     */
    loadAndExecuteCodeFromChest = (position) => {
        api.log(`--- Starting Load & Execute Process from [${position.join(', ')}] ---`);
        const firstSlotItem = api.getStandardChestItemSlot(position, 0);

        if (!firstSlotItem || firstSlotItem.amount < 1) {
            api.log('❌ CRITICAL ERROR: Chest is empty or slot 0 metadata is invalid. Cannot load code.');
            return;
        }
        const totalChunksToRead = firstSlotItem.amount;
        api.log(`Metadata found: Expecting to read ${totalChunksToRead} total chunks.`);

        const rawCodeChunks = [];
        for (let i = 0; i < totalChunksToRead; i++) {
            const item = api.getStandardChestItemSlot(position, i);
            if (!item || !item.attributes || typeof item.attributes.customDescription !== 'string') {
                api.log(`❌ CRITICAL ERROR: Missing or corrupted data in slot ${i}. Aborting.`);
                return;
            }
            rawCodeChunks.push(item.attributes.customDescription);
        }

        if (rawCodeChunks.length !== totalChunksToRead) {
            api.log('❌ CRITICAL ERROR: Data integrity check FAILED. The number of loaded chunks does not match metadata.');
            return;
        }
        api.log(`✅ Data integrity check passed: Successfully loaded all ${totalChunksToRead} chunks.`);

        const reconstructedRawCode = rawCodeChunks.join('');

        try {
            api.log('--- Executing Final Code ---');
            const result = eval(reconstructedRawCode);
            console.log("Execution successful!", result);
            api.log(`Execution successful! Result type: ${typeof result}`);
        } catch (error) {
            console.error("Execution failed:", error);
            api.log(`Execution failed: ${error.toString()}`);
        }
    }

    /**
     * The main entry point to run the entire process:
     * Reads the source code, saves it to the chest, then loads and executes it.
     */
    run = () => {
        api.log("--- Running full save/load/execute process ---");
        this.counter = 0; // Reset counter for each run

        const codeToSave = api.getBlockData(this.sourceCodeBlockPosition).persisted.shared.text;

        if (typeof codeToSave !== 'string' || codeToSave.length === 0) {
            api.log(`❌ ERROR: No code found at source block [${this.sourceCodeBlockPosition.join(', ')}]. Aborting.`);
            return;
        }

        this.saveCodeToChest(codeToSave, this.chestPosition);
        this.loadAndExecuteCodeFromChest(this.chestPosition);

        api.log(`Binary search performance: ${this.counter} total checks.`);
    }

    /* Don't delete this static block. It automatically initializes your module
       when the script is loaded. */
    static {
        new this();
    }
}