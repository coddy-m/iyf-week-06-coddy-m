// ============================================
// TASK 11.1: Understanding Async 🟢
// ============================================

const output = document.getElementById("output");
function log(msg, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const line = `[${timestamp}] ${msg}\n`;
    output.textContent += line;
    output.scrollTop = output.scrollHeight;
    console.log(`%c${line}`, `color: ${type === "error" ? "#f44336" : type === "success" ? "#4CAF50" : "#2196F3"}`);
}

function clearOutput() {
    output.textContent = "";
}

// Exercise 1: Synchronous vs Asynchronous
function runSyncDemo() {
    clearOutput();
    log("=== SYNC DEMO ===", "info");
    log("1 - Start");
    log("2 - Middle");
    log("3 - End");
    log("✅ All synchronous - executed in order!");
}

function runAsyncDemo() {
    clearOutput();
    log("=== ASYNC DEMO ===", "info");
    log("1 - Start");
    
    setTimeout(() => {
        log("2 - This is delayed (2 seconds)", "success");
    }, 2000);
    
    log("3 - End");
    log("⚠️ Notice: '3 - End' appears BEFORE '2 - This is delayed'");
}

// Predict the output challenge
function predictOutput() {
    clearOutput();
    log("=== PREDICT OUTPUT CHALLENGE ===", "info");
    log("Code:");
    log('console.log("A");');
    log('setTimeout(() => console.log("B"), 0);');
    log('console.log("C");');
    log('setTimeout(() => console.log("D"), 100);');
    log('console.log("E");');
    log("\n🤔 What order will these print?");
    log("\n💡 Answer in 3 seconds...");
    
    setTimeout(() => {
        log("\n✅ Actual Output:", "success");
        console.log("A"); log("A");
        setTimeout(() => { console.log("B"); log("B"); }, 0);
        console.log("C"); log("C");
        setTimeout(() => { console.log("D"); log("D"); }, 100);
        console.log("E"); log("E");
        log("\n📝 Explanation:");
        log("• Synchronous code (A, C, E) runs first");
        log("• setTimeout with 0ms still goes to task queue");
        log("• B runs after sync code (0ms delay)");
        log("• D runs after B (100ms delay)");
        log("Final order: A → C → E → B → D");
    }, 3000);
}

// Exercise 2: Callback Pattern
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

// ✅ Build: loadUser function with callback
function loadUser(userId, callback) {
    log(`🔄 Loading user ${userId}...`);
    
    setTimeout(() => {
        // Simulate database lookup
        const users = {
            1: { id: 1, name: "Alice", email: "alice@example.com" },
            2: { id: 2, name: "Bob", email: "bob@example.com" },
            3: { id: 3, name: "Charlie", email: "charlie@example.com" }
        };
        
        const user = users[userId] || { error: "User not found" };
        log(`✅ User ${userId} loaded`, "success");
        callback(user);
    }, 1500);
}

function runCallbackDemo() {
    clearOutput();
    log("=== CALLBACK DEMO ===", "info");
    
    log("\n📦 fetchData example:");
    fetchData(function(data) {
        log(`Data received: ${JSON.stringify(data)}`, "success");
    });
    
    log("\n👤 loadUser example:");
    loadUser(2, function(user) {
        if (user.error) {
            log(`❌ Error: ${user.error}`, "error");
        } else {
            log(`✅ Loaded: ${user.name} (${user.email})`, "success");
        }
    });
    
    log("\n⚠️ Notice: Callbacks execute AFTER the function returns!");
}

// Export functions for use in other files
if (typeof window !== "undefined") {
    window.runSyncDemo = runSyncDemo;
    window.runAsyncDemo = runAsyncDemo;
    window.predictOutput = predictOutput;
    window.runCallbackDemo = runCallbackDemo;
    window.loadUser = loadUser;
}