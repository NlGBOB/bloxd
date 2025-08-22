# The Definitive Guide to a Robust Module Loader in Bloxd.io


This guide details a highly robust, automatic module loading system for your bloxd.io world or custom lobby. Not only is it incredibly reliable, but it also allows for true separation of concerns. You can organize your project into distinct modules for chat, minigames, farming logic, or anything else, making it possible to build highly complex modes that don't specialize in a single thing.

This system is designed for performance, loading up to 36 modules in under 2 seconds and automatically retrying failures. It completely eliminates the need for "press to initialize" boards. Players join, and your world just works instantly.

---

### Step 1: Place and Secure the Module Chest

1.  **Place a Chest:** Put one standard chest anywhere in your map.
2.  **Make It Inaccessible:** You must prevent players from accessing this chest. How you do this depends on your gamemode.
    *   **Why?** The chest only needs to be safe **during the first ~2 seconds** of the world loading. If a player breaks it during this critical window, your code will fail to load.
    *   **The Good News:** After initialization, your code is completely safe. Even if the chest is found and broken, it will have no effect on your game logic. The only minor risk is a player looting the "temp" items inside.
    *   **Good Hiding Spots:** Inside bedrock, or far below the map (e.g., at Y: -1000). Just don't place it at spawn.

_**Note:** In gamemodes like Peaceful Adventure where looting is disabled, hiding is less critical but still highly recommended._

---

### Step 2: Get the Chest's Coordinates

You need the exact coordinates of this chest for the system to find it.

1.  Open the **World Code** tab by pressing F8.
2.  Temporarily paste this single line of code at the top:
    ```js
    onPlayerAttemptAltAction=(a,b,c,d)=>api.log(b,c,d);
    ```
3.  Close it and **right-click** on the chest you just hid.
4.  The coordinates (e.g., `[118, 0, -87]`) will be printed in the chat.
5.  **Memorize or Write down these coordinates** You will need them for every following step.

---

### Step 3: Create the Module Loader

The Module Loader is the "brain" of the system. It's a piece of code that will read all other modules from the chest.

1.  Create a **Code Block** item anywhere.
2.  Paste the following code into it.
3.  **Crucially, update `moduleChestCoords`** with the coordinates you saved from Step 2.

```js
let moduleLoaderCode = `class m{constructor(){const t=this.constructor;if(globalThis.m instanceof t)return globalThis.m;globalThis.m=this,this.i=1,this.l=35-api.getStandardChestFreeSlotCount(globalThis.w.MODULE_CHEST_COORDS)}n(){try{const c=api.getStandardChestItemSlot(globalThis.w.MODULE_CHEST_COORDS,this.i).attributes.customDisplayName;if(eval(c),this.i>=this.l)return delete this.i,this.a=!0,void console.log("m: All modules have been initialized successfully");this.i+=1}catch(t){console.log("m: Failed to load module from slot "+this.i+". Error:",t)}}static{new this}}`;

/*
 TODO 1: Set these coordinates to the chest where you want to load the ModuleLoader.
*/
let moduleChestCoords = [118, 0, -87]; // <-- CHANGE THIS TO YOUR CHEST'S COORDINATES

// There's no need to modify anything else.
// This places the loader code into the first slot (slot 0) of the chest.
api.setStandardChestItemSlot(moduleChestCoords, 0, "temp", 1, myId, {customDisplayName: moduleLoaderCode});
```
4.  Run this Code Block. This will place a special "temp" item into slot `0` of your hidden chest. You can now delete this Code Block item from your world.

---

### Step 4: Create and Add Your First Module

Now you can start adding your own code as separate modules. Each module will be an item in the chest.

1.  Use another **Code Block** item.
2.  Paste the following template code. The example provided is a simple `Chat` module. You can replace the code inside the backticks (\`) with your own.
3.  Carefully follow the `TODO` instructions in the code.

```js
let module = 
`
/* 
  PASTE YOUR MODULE CODE HERE.
  This is an example with a non-minified Chat module.
*/
class Chat {
    constructor() {
        const Class = this.constructor;
        if (globalThis[Class.name] instanceof Class) {
            return globalThis[Class.name];
        } 
        globalThis[Class.name] = this;
    }

    onPlayerJoin = (playerId) => {
        api.log("Successfully called Chat's onPlayerJoin for player: " + playerId);
    };

    sayHi = () => {
        api.log("Hi from the Chat module!");
    }

    static {
        new this();
    }
}
`;

/* 
 TODO 1: Set these coordinates to your hidden module chest.
 TODO 2: Set the slotIndex for this module.
*/
let moduleChestCoords = [118, 0, -87]; // <-- CHANGE THIS TO YOUR CHEST'S COORDINATES
let slotIndex = 1;                     // <-- SET THE SLOT (1, 2, 3...)

// There's no need to modify anything else.
// This places your module code into the specified slot of the chest.
api.setStandardChestItemSlot(moduleChestCoords, slotIndex, "temp", 1, myId, {customDisplayName: module});
```

> **IMPORTANT RULES FOR MODULES:**
> *   The **Module Loader is always in slot `0`**.
> *   Your custom modules must start from **slot `1`** and be sequential (e.g., `1`, `2`, `3`, `4`). **Do not skip slots.**
> *   The chest should **only** contain these module items. Do not store other items like wood or stone in it.
> *   If you get an "Argument too large" error, your code is too long. Minify it using an online tool like [minify-js.com](https://minify-js.com/).

4.  Run this Code Block **once** to place your module in the chest. Repeat this step for every new module you create, simply incrementing the `slotIndex` (`2`, `3`, etc.).

---

### Step 5: Set Up the Main World Code

This is the final and most important step. This code will manage the loading process.

1.  Open the **World Code** tab.
2.  **Delete all existing code** and replace it with the following.
3.  Update `this.w.MODULE_CHEST_COORDS` with your chest's coordinates one last time.

```js
// Global object for the world state
this.w = {};

/* 
    TODO 1: Set these coordinates to your hidden module chest.
*/
this.w.MODULE_CHEST_COORDS = [118, 0, -87]; // <-- CHANGE THIS TO YOUR CHEST'S COORDINATES


// This function is called for each player AFTER all modules are successfully loaded.
// It is safe to call your module functions here.
onPlayerJoinReady = (playerId) => {
    // Example:
    // this.Chat.onPlayerJoin(playerId);
    // this.OtherModule.onPlayerJoin(playerId);
};


// This function runs every game tick (60 times per second).
tick = (ms) => {
    // The 'i()' function handles the loading process. Do not remove it.
    // The 'if' statement acts as a gate, preventing code from running before modules are ready.
    if (!this.w.f) return i();

    // After loading is complete, you can safely use all your modules here.
    // Example:
    this.Chat.sayHi();
};


// ----- Core Loader Logic (DO NOT MODIFY THIS SECTION) -----
onPlayerJoin=t=>{if(this.m?.a)return onPlayerJoinReady(t);(this.w.q??=new Set).add(t),this.w.p??=!0,api.getBlock(...this.w.MODULE_CHEST_COORDS)},i=()=>{if(!this.m?.a)return this.w.c&&"Unloaded"!==this.w.c?this.w.p?(eval(api.getStandardChestItemSlot(this.w.MODULE_CHEST_COORDS,0).attributes.customDisplayName),void delete this.w.p):void this.m?.n():void(this.w.c=api.getBlock(...this.w.MODULE_CHEST_COORDS));if(this.m?.a&&this.w.q?.size){const t=this.w.q.values().next().value;api.playerIsInGame(t)&&onPlayerJoinReady(t),this.w.q.delete(t),this.w.q.size||(delete this.w.q,this.w.f=!0)}};
```

---

### Step 6: Final Test

1.  Make sure the lobby is **empty** so the world can do a full, fresh restart.
2.  Leave and rejoin the lobby.

If everything is working, you will see messages like:
*   `m: All modules have been initialized successfully`
*   `Hi from the Chat module!` (from our example tick function)

Your fully automatic module loader is now active! You can add more modules anytime by repeating **Step 4**.