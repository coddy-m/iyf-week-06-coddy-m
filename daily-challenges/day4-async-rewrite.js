// Day 4: Rewrite with Async/Await 🟡
// Convert callback-based code to async/await

console.log("=== Day 4: Async/Await Rewrite ===\n");

// Original callback-based function
function fetchDataCallback(url, callback) {
    setTimeout(() => {
        if (url.includes("error")) {
            callback(new Error("Simulated error"), null);
        } else {
            callback(null, { url, data: "Sample data", timestamp: Date.now() });
        }
    }, 500);
}

// ✅ Rewritten with Promise
function fetchDataPromise(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes("error")) {
                reject(new Error("Simulated error"));
            } else {
                resolve({ url, data: "Sample data", timestamp: Date.now() });
            }
        }, 500);
    });
}

// ✅ Rewritten with async/await
async function fetchDataAsync(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes("error")) {
                reject(new Error("Simulated error"));
            } else {
                resolve({ url, data: "Sample data", timestamp: Date.now() });
            }
        }, 500);
    });
}

// Comparison demo
console.log("📦 Callback style:");
fetchDataCallback("https://api.example.com/data", (err, data) => {
    if (err) {
        console.log(`❌ ${err.message}`);
    } else {
        console.log(`✅ ${data.data} from ${data.url}`);
    }
});

console.log("\n🔗 Promise style:");
fetchDataPromise("https://api.example.com/data")
    .then(data => console.log(`✅ ${data.data} from ${data.url}`))
    .catch(err => console.log(`❌ ${err.message}`));

console.log("\n✨ Async/await style:");
(async () => {
    try {
        const data = await fetchDataAsync("https://api.example.com/data");
        console.log(`✅ ${data.data} from ${data.url}`);
    } catch (err) {
        console.log(`❌ ${err.message}`);
    }
})();

console.log("\n💡 Async/await makes async code read like synchronous code!");