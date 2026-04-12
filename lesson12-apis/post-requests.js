// TASK 12.3: POST Requests
document.getElementById("post-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;
    const userId = document.getElementById("post-user").value;
    const resultDiv = document.getElementById("post-result");
    
    try {
        resultDiv.innerHTML = "⏳ Creating post...";
        
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body, userId: Number(userId) })
        });
        
        if (!response.ok) throw new Error("Failed to create");
        
        const newPost = await response.json();
        resultDiv.innerHTML = `
            <div class="success">
                ✅ Post created!<br>
                <strong>ID:</strong> ${newPost.id}<br>
                <strong>Title:</strong> ${newPost.title}
            </div>
        `;
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        resultDiv.innerHTML = `<div class="error">❌ ${error.message}</div>`;
    }
});