// Day 2: Promise Chain 🟢
// 3 functions with random delays, chain them, time total execution

console.log("=== Day 2: Promise Chain ===\n");

function randomDelay(min = 200, max = 800) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}

async function step1() {
    const delay = await randomDelay();
    console.log(`✅ Step 1 completed after ${delay}ms`);
    return "Result 1";
}

async function step2(prev) {
    const delay = await randomDelay();
    console.log(`✅ Step 2 completed after ${delay}ms (received: ${prev})`);
    return "Result 2";
}

async function step3(prev) {
    const delay = await randomDelay();
    console.log(`✅ Step 3 completed after ${delay}ms (received: ${prev})`);
    return "Final Result";
}

// Run and time
(async () => {
    const start = Date.now();
    console.log("🚀 Starting chained execution...\n");
    
    const result = await step1()
        .then(step2)
        .then(step3);
    
    const total = Date.now() - start;
    console.log(`\n🎯 Final result: ${result}`);
    console.log(`⏱️ Total time: ${total}ms`);
    console.log(`💡 Note: Times add up because promises run sequentially!`);
})();