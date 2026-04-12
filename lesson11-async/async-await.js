// ============================================
// TASK 11.4: Async/Await 🔴
// ============================================

// Exercise 1: Converting to Async/Await
async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}

// Exercise 2: Error Handling with Try/Catch
async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        log(`❌ Failed to fetch: ${error}`, "error");
        throw error;
    }
}

// Exercise 3: Parallel with Async/Await
async function getAllUsers() {
    // Parallel (fast) - recommended!
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    return [u1, u2, u3];
}

// ✅ Build: Rewrite callback hell with async/await
async function getUserDataComplete(userId) {
    try {
        log(`\n🔄 Starting flow for user ${userId}...`, "info");
        
        const user = await getUserData(userId);
        log(`✅ Got user: ${user.name}`, "success");
        
        const posts = await getUserPosts(user.id);
        log(`✅ Got ${posts.length} posts`, "success");
        
        const comments = await getPostComments(posts[0].id);
        log(`✅ Got ${comments.length} comments`, "success");
        
        return { user, posts, comments };
    } catch (error) {
        log(`❌ Error in flow: ${error}`, "error");
        throw error;
    }
}

// Demo functions for buttons
function runAsyncAwait() {
    clearOutput();
    log("=== ASYNC/AWAIT DEMO ===", "info");
    
    log("\n📦 Simple async function:");
    getDataWithAsync()
        .then(comments => {
            log(`✅ Final result: ${comments.length} comments`, "success");
        });
}

function runErrorHandling() {
    clearOutput();
    log("=== ERROR HANDLING ===", "info");
    
    log("\n🔍 Testing with valid ID (1):");
    fetchUserData(1)
        .then(result => {
            log(`✅ Success: ${result.user.name} has ${result.posts.length} posts`, "success");
        });
    
    setTimeout(() => {
        log("\n🔍 Testing with invalid ID (-1):");
        fetchUserData(-1)
            .catch(() => {
                log("✅ Error was caught and handled!", "success");
            });
    }, 2500);
}

function runParallelAsync() {
    clearOutput();
    log("=== PARALLEL ASYNC/AWAIT ===", "info");
    
    const startTime = Date.now();
    log("\n🚀 Fetching all users in parallel...");
    
    getAllUsers()
        .then(users => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            log(`✅ All done in ${elapsed}s!`, "success");
            users.forEach(u => log(`   • ${u.name}`));
        });
}

// Export
if (typeof window !== "undefined") {
    window.runAsyncAwait = runAsyncAwait;
    window.runErrorHandling = runErrorHandling;
    window.runParallelAsync = runParallelAsync;
    window.getUserDataComplete = getUserDataComplete;
}