// ============================================
// TASK 11.2 & 11.3: Promises & Chaining 🟡
// ============================================

// Exercise 1: Creating a Promise
function createSimplePromise() {
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.3; // 70% success rate
        
        setTimeout(() => {
            if (success) {
                resolve("✅ It worked!");
            } else {
                reject("❌ Something went wrong");
            }
        }, 1000);
    });
}

// ✅ Refactored functions returning Promises
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0 && userId <= 3) {
                resolve({ 
                    id: userId, 
                    name: ["Alice", "Bob", "Charlie"][userId - 1],
                    email: `user${userId}@example.com`
                });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: `Post 1 by User ${userId}`, content: "Content here..." },
                    { id: 2, title: `Post 2 by User ${userId}`, content: "More content..." }
                ]);
            } else {
                reject("Invalid user ID for posts");
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!", author: "Reader1" },
                    { id: 2, text: "Thanks for sharing", author: "Reader2" }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}

// Exercise 2: Using Promises
function runPromiseDemo() {
    clearOutput();
    log("=== PROMISE DEMO ===", "info");
    
    log("\n🎲 Simple promise (70% success):");
    createSimplePromise()
        .then(result => {
            log(result, "success");
        })
        .catch(error => {
            log(error, "error");
        });
    
    log("\n👤 getUserData promise:");
    getUserData(1)
        .then(user => {
            log(`✅ Got user: ${user.name}`, "success");
            return getUserPosts(user.id);
        })
        .then(posts => {
            log(`✅ Got ${posts.length} posts`, "success");
        })
        .catch(error => {
            log(`❌ Error: ${error}`, "error");
        });
}

// Exercise 1: Promise Chaining
function runPromiseChain() {
    clearOutput();
    log("=== PROMISE CHAINING ===", "info");
    
    const startTime = Date.now();
    
    getUserData(2)
        .then(user => {
            log(`\n👤 User: ${user.name}`, "success");
            return getUserPosts(user.id);
        })
        .then(posts => {
            log(`📝 Posts (${posts.length}):`, "success");
            posts.forEach(p => log(`   • ${p.title}`));
            return getPostComments(posts[0].id);
        })
        .then(comments => {
            log(`💬 Comments (${comments.length}):`, "success");
            comments.forEach(c => log(`   • "${c.text}" by ${c.author}`));
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            log(`\n⏱️ Total time: ${elapsed}s`, "info");
        })
        .catch(error => {
            log(`❌ Chain error: ${error}`, "error");
        });
}

// Exercise 2: Promise.all
function runPromiseAll() {
    clearOutput();
    log("=== PROMISE.ALL (Parallel) ===", "info");
    
    const startTime = Date.now();
    log("\n🚀 Fetching 3 users in parallel...");
    
    Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ])
    .then(users => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        log(`✅ All users loaded in ${elapsed}s!`, "success");
        users.forEach(u => log(`   • ${u.name} (${u.email})`));
    })
    .catch(error => {
        log(`❌ One failed: ${error}`, "error");
    });
    
    log("\n💡 Note: Total time ≈ 1 second (not 3)!");
}

// Exercise 3: Promise.race
function runPromiseRace() {
    clearOutput();
    log("=== PROMISE.RACE ===", "info");
    
    const fast = new Promise(resolve => 
        setTimeout(() => resolve("🐇 Fast! (100ms)"), 100)
    );
    const slow = new Promise(resolve => 
        setTimeout(() => resolve("🐌 Slow! (500ms)"), 500)
    );
    const medium = new Promise(resolve => 
        setTimeout(() => resolve("🚶 Medium! (300ms)"), 300)
    );
    
    log("\n🏁 Starting race between 3 promises...");
    
    Promise.race([fast, slow, medium])
        .then(winner => {
            log(`🏆 Winner: ${winner}`, "success");
            log("\n💡 Promise.race returns the FIRST settled promise");
        });
}

// ✅ Build: Fetch 3 users simultaneously
async function fetchThreeUsers() {
    clearOutput();
    log("=== BUILD: Fetch 3 Users ===", "info");
    
    try {
        const [user1, user2, user3] = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);
        
        log("\n✅ All users fetched:", "success");
        [user1, user2, user3].forEach(u => {
            log(`   👤 ${u.name}: ${u.email}`);
        });
        
        return [user1, user2, user3];
    } catch (error) {
        log(`❌ Error: ${error}`, "error");
        throw error;
    }
}

// Export for use
if (typeof window !== "undefined") {
    window.runPromiseDemo = runPromiseDemo;
    window.runPromiseChain = runPromiseChain;
    window.runPromiseAll = runPromiseAll;
    window.runPromiseRace = runPromiseRace;
    window.fetchThreeUsers = fetchThreeUsers;
    window.getUserData = getUserData;
    window.getUserPosts = getUserPosts;
    window.getPostComments = getPostComments;
}