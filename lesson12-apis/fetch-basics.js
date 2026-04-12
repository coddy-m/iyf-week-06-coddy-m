// ============================================
// TASK 12.1: Fetch API Basics 🟢
// ============================================

const API_BASE = "https://jsonplaceholder.typicode.com";
const fetchOutput = document.getElementById("fetch-output");

function logFetch(msg, type = "info") {
    const line = `[${new Date().toLocaleTimeString()}] ${msg}\n`;
    fetchOutput.textContent += line;
    fetchOutput.scrollTop = fetchOutput.scrollHeight;
    console.log(`%c${line}`, `color: ${type === "error" ? "#dc3545" : type === "success" ? "#198754" : "#0d6efd"}`);
}

// Exercise 1: Basic Fetch with .then()
async function fetchSingleUser() {
    fetchOutput.textContent = "";
    logFetch("=== Fetch Single User ===", "info");
    
    try {
        logFetch("🔄 Fetching user #1...");
        const response = await fetch(`${API_BASE}/users/1`);
        
        logFetch(`📡 Status: ${response.status} ${response.ok ? "✅" : "❌"}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        logFetch(`✅ Success!`, "success");
        logFetch(`👤 ${data.name} (${data.email})`);
        logFetch(`🏢 ${data.company.name}`);
        logFetch(`📍 ${data.address.city}, ${data.address.country}`);
        
    } catch (error) {
        logFetch(`❌ Error: ${error.message}`, "error");
    }
}

// Exercise 2: Fetch All Users
async function fetchAllUsers() {
    fetchOutput.textContent = "";
    logFetch("=== Fetch All Users ===", "info");
    
    try {
        logFetch("🔄 Fetching all users...");
        const response = await fetch(`${API_BASE}/users`);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const users = await response.json();
        logFetch(`✅ Loaded ${users.length} users`, "success");
        
        users.slice(0, 5).forEach(user => {
            logFetch(`   • ${user.name} - ${user.email}`);
        });
        if (users.length > 5) {
            logFetch(`   ... and ${users.length - 5} more`);
        }
        
    } catch (error) {
        logFetch(`❌ Error: ${error.message}`, "error");
    }
}

// Practice: Fetch posts for user
async function fetchUserPosts() {
    fetchOutput.textContent = "";
    logFetch("=== Fetch User Posts ===", "info");
    
    try {
        logFetch("🔄 Fetching posts for user #1...");
        const response = await fetch(`${API_BASE}/users/1/posts`);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const posts = await response.json();
        logFetch(`✅ Loaded ${posts.length} posts`, "success");
        
        posts.slice(0, 3).forEach(post => {
            logFetch(`   📝 "${post.title}"`);
        });
        
    } catch (error) {
        logFetch(`❌ Error: ${error.message}`, "error");
    }
}

// Export
if (typeof window !== "undefined") {
    window.fetchSingleUser = fetchSingleUser;
    window.fetchAllUsers = fetchAllUsers;
    window.fetchUserPosts = fetchUserPosts;
}