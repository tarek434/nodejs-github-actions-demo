// App state
let isConnected = true;

// DOM elements
const responseSection = document.getElementById('responseSection');
const responseOutput = document.getElementById('responseOutput');
const timestamp = document.getElementById('timestamp');

// Fetch message from server
async function fetchMessage() {
    try {
        showResponse('Fetching message from server...');
        
        // Use the API endpoint instead of root
        const response = await fetch('/api/message');
        const text = await response.text();
        
        showResponse(text, 'success');
    } catch (error) {
        showResponse('❌ Error: Could not connect to server', 'error');
        console.error('Fetch error:', error);
    }
}

// Test API endpoint
async function testAPI() {
    try {
        showResponse('Testing API connection...');
        
        const response = await fetch('/api/info');
        const data = await response.json();
        
        // Format the response beautifully
        const formattedOutput = `📊 Server Info:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Message: ${data.message}
⏰ Timestamp: ${data.timestamp}
🖥️  Server: ${data.server}
📦 Node.js: ${data.version}
⏱️  Uptime: ${Math.floor(data.uptime)} seconds
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 Status: Connected ✅`;
        
        showResponse(formattedOutput, 'api');
    } catch (error) {
        showResponse('❌ Error: Could not connect to server', 'error');
        console.error('API error:', error);
    }
}

// Show response in UI
function showResponse(content, type = 'success') {
    responseSection.style.display = 'block';
    
    // Update timestamp
    timestamp.textContent = new Date().toLocaleString();
    
    // Format output based on type
    let output = content;
    if (type === 'api') {
        output = content; // Already formatted
    } else if (type === 'success') {
        output = `✓ ${content}`;
    } else if (type === 'error') {
        output = content;
    }
    
    responseOutput.textContent = output;
    
    // Scroll to response section
    responseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Check server health
async function checkHealth() {
    try {
        const response = await fetch('/api/message');
        if (response.ok) {
            updateStatus(true);
        } else {
            updateStatus(false);
        }
    } catch (error) {
        updateStatus(false);
    }
}

// Update server status
function updateStatus(connected) {
    isConnected = connected;
    const statusElement = document.getElementById('serverStatus');
    const dotElement = document.querySelector('.status-dot');
    
    if (connected) {
        statusElement.textContent = 'Connected';
        dotElement.style.background = '#22c55e';
        document.querySelector('.status-badge').style.borderColor = '#86efac';
        document.querySelector('.status-badge').style.background = '#f0fdf4';
    } else {
        statusElement.textContent = 'Disconnected';
        dotElement.style.background = '#ef4444';
        document.querySelector('.status-badge').style.borderColor = '#fca5a5';
        document.querySelector('.status-badge').style.background = '#fef2f2';
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            fetchMessage();
        }
    }
    if (e.key === 't' || e.key === 'T') {
        if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            testAPI();
        }
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Check health every 30 seconds
    checkHealth();
    setInterval(checkHealth, 30000);
    
    console.log('🚀 GitHub Actions Demo App Loaded');
    console.log('📨 Press "F" to fetch message');
    console.log('🔌 Press "T" to test API');
});

// Export for testing (if needed)
window.fetchMessage = fetchMessage;
window.testAPI = testAPI;