// ============================================
// SHARED UTILITY FUNCTIONS
// ============================================

// Format numbers
export function formatNumber(num, decimals = 0) {
    return Number(num).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debounce function for search inputs
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Simple logger
export function log(message, type = "info") {
    const styles = {
        info: "color: #0d6efd",
        success: "color: #198754",
        warning: "color: #ffc107",
        error: "color: #dc3545"
    };
    console.log(`%c[${new Date().toLocaleTimeString()}] ${message}`, styles[type]);
}

// LocalStorage helpers
export const storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            console.warn("localStorage write failed");
            return false;
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

// Export for browser globals
if (typeof window !== "undefined") {
    window.utils = { formatNumber, debounce, log, storage };
}