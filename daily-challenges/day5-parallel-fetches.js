// Day 5: Parallel Fetches 🟡
// Fetch from 3 endpoints, display as each completes (Promise.allSettled)

console.log("=== Day 5: Parallel Fetches ===\n");

const ENDPOINTS = [
    { name: "Users", url: "https://jsonplaceholder.typicode.com/users?_limit=3" },
    { name: "Posts", url: "https://jsonplaceholder.typicode.com/posts?_limit=3" },
    { name: "Comments", url: "https://jsonplaceholder.typicode.com/comments?_limit=3" }
];

async function fetchWithProgress(endpoint) {
    const start = Date.now();
    console.log(`🔄 Fetching ${endpoint.name}...`);
    
    try {
        const response = await fetch(endpoint.url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const elapsed = Date.now() - start;
        
        console.log(`✅ ${endpoint.name}: ${data.length} items in ${elapsed}ms`);
        return { success: true, name: endpoint.name, data, time: elapsed };
        
    } catch (error) {
        const elapsed = Date.now() - start;
        console.log(`❌ ${endpoint.name}: ${error.message} (${elapsed}ms)`);
        return { success: false, name: endpoint.name, error: error.message, time: elapsed };
    }
}

// Run all in parallel with allSettled
(async () => {
    const start = Date.now();
    console.log(`🚀 Starting ${ENDPOINTS.length} parallel fetches...\n`);
    
    const promises = ENDPOINTS.map(ep => fetchWithProgress(ep));
    const results = await Promise.allSettled(promises);
    
    const total = Date.now() - start;
    console.log(`\n📊 All fetches completed in ${total}ms`);
    
    // Display results
    console.log("\n📋 Results:");
    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            const r = result.value;
            console.log(`   ${r.success ? "✅" : "⚠️"} ${r.name}: ${r.data?.length || 0} items (${r.time}ms)`);
        } else {
            console.log(`   ❌ ${ENDPOINTS[i].name}: Promise rejected`);
        }
    });
    
    console.log("\n💡 Promise.allSettled waits for ALL to settle (success or fail)");
    console.log("💡 Unlike Promise.all, it doesn't short-circuit on first error");
})();