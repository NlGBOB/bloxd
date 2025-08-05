Imagine you've built a complex object. When you try to save it to the Moonstone Chest, the game converts it to JSON-stringified string.

*   **Without this tool:** Your data becomes, for example, a **668-character string**. This is **too big for the chest** (668 > 476) and will fail to save, forcing you to use more moonstone chest slots.

*   **With this tool:** The same data is compressed into a, for example, **269-character string**. You just saved almost **60%** of the space. Compression rate varies.

### How to Use It

```javascript
/* [Assume the minified code has been pasted here] */
const largeComplexJsonWithEdgeCases = {/*your complex Object*/}

// Setting
const compressed = compress(largeComplexJsonWithEdgeCases);
api.setMoonstoneChestItemSlot("-1", 1, "temp", 1, {customAttributes: compressed })

// Getting
const decompressed = decompress(api.getMoonstoneChestItemSlot("-1", 1))

// Accessing
api.log(decompressed.someKeyFromYourObject)

```

### Pro-Tip for Maximum Savings

For even more compression, use short keys in your data object (e.g., use `'p'` instead of `'position'`). This makes the initial string smaller and easier for the encoder to shrink.

### Important Note

This is a new tool for the community. While it works well, it's always smart to back up important data. Please test it with your setups.