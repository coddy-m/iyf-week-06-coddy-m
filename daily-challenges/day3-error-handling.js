// Day 3: Error Handling 🟡
// Fetch user, return default on 404 instead of throwing

console.log("=== Day 3: Error Handling ===\n");

const DEFAULT_USER = {
    id: 0,
    name: "Guest User",
    email: "guest@example.com",
    isDefault: true
};

async function fetchUserWithFallback(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (response.status === 404) {
            console.log(`⚠️ User ${userId} not found, returning default`);
            return DEFAULT_USER;
        }
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.log(`❌ Network error: ${error.message}, returning default`);
        return DEFAULT_USER;
    }
}

// Test
(async () => {
    console.log("🔍 Testing with valid ID (1):");
    const user1 = await fetchUserWithFallback(1);
    console.log(`✅ ${user1.name} ${user1.isDefault ? "(default)" : ""}\n`);
    
    console.log("🔍 Testing with invalid ID (999):");
    const user999 = await fetchUserWithFallback(999);
    console.log(`✅ ${user999.name} ${user999.isDefault ? "(default)" : ""}\n`);
    
    console.log("💡 Pattern: Graceful degradation with fallback values!");
})();