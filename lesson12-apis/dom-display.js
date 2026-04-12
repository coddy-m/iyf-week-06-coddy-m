// TASK 12.2: Display API Data in DOM
let allUsers = [];

async function loadUsersToDOM() {
    const loading = document.getElementById("loading");
    const errorDiv = document.getElementById("api-error");
    const container = document.getElementById("users-container");
    
    try {
        loading.classList.remove("hidden");
        errorDiv.classList.add("hidden");
        container.innerHTML = "";
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch");
        
        allUsers = await response.json();
        displayUsers(allUsers);
        
    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function displayUsers(users) {
    const container = document.getElementById("users-container");
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

if (typeof window !== "undefined") {
    window.loadUsersToDOM = loadUsersToDOM;
    window.allUsers = allUsers;
}