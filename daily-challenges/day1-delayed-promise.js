// Day 1: Delayed Promise 🟢
// Create delay(ms) that resolves after ms milliseconds

console.log("=== Day 1: Delayed Promise ===\n");

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Test it
(async () => {
    console.log("⏱️ Starting timer...");
    const start = Date.now();
    
    await delay(2000);
    
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`✅ This printed after ${elapsed} seconds!`);
    
    // Chain multiple delays
    console.log("\n🔗 Chaining delays:");
    await delay(500); console.log("   • 0.5s");
    await delay(500); console.log("   • 1.0s");
    await delay(500); console.log("   • 1.5s");
    console.log("✅ All delays completed!");
})();