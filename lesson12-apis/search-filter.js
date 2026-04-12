// TASK 12.4: Search & Filter
let filteredUsers = [];

// Live search
document.getElementById("search")?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    displayFilteredUsers();
});

// Sort
function sortUsers(direction) {
    filteredUsers = [...allUsers].sort((a, b) => {
        return direction === "asc" 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });
    displayFilteredUsers();
}

// Filter by city
async function populateCityFilter() {
    if (allUsers.length === 0) {
        await loadUsersToDOM();
    }
    
    const cities = [...new Set(allUsers.map(u => u.address.city))].sort();
    const select = document.getElementById("city-filter");
    
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        select.appendChild(option);
    });
}

function filterByCity(city) {
    filteredUsers = city 
        ? allUsers.filter(u => u.address.city === city)
        : [...allUsers];
    displayFilteredUsers();
}

function displayFilteredUsers() {
    const container = document.getElementById("filtered-container");
    if (filteredUsers.length === 0) {
        container.innerHTML = "<p>No users found</p>";
        return;
    }
    
    container.innerHTML = filteredUsers.map(user => `
        <div class="user-card">
            <strong>${user.name}</strong><br>
            <small>${user.email} • ${user.address.city}</small>
        </div>
    `).join("");
}

// Initialize
if (typeof window !== "undefined") {
    window.sortUsers = sortUsers;
    window.filterByCity = filterByCity;
    window.populateCityFilter = populateCityFilter;
    // Auto-populate on load
    setTimeout(populateCityFilter, 1000);
}