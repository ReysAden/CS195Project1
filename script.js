let debugOutput;

function logDebug(message, type = 'info') {
    console.log(message);
    
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared</p>';
    }
}

// Correct Connections
const correctConnections = [
    ["Mercury", "Venus", "Earth", "Mars"], // Planets
    ["Red", "Blue", "Green", "Yellow"],   // Colors
    ["Dog", "Cat", "Mouse", "Rabbit"],    // Animals
    ["Apple", "Banana", "Orange", "Grape"] // Fruits
];
let selectedItems = [];
let groupsFormed = 0;

// event listener for grid items and to see if their been selcted 
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('selected')) {
            item.classList.remove('selected');
            selectedItems = selectedItems.filter(i => i !== item);
        } else {
            item.classList.add('selected');
            selectedItems.push(item);
        }
        // check to see what item was selected in the console log ie mercury or dog was selcted
        logDebug(`Selected items: ${selectedItems.map(i => i.textContent).join(', ')}`);
    });
});
//select only 4 items, if it would pass the limit it will not let you select more log debug
document.getElementById('submit-btn').addEventListener('click', () => {
    if (selectedItems.length !== 4) {
        logDebug('Please select exactly 4 items before submitting.', 'error');
        return;
    } else {
        checkSelection();
    }
    selectedItems.forEach(i => i.classList.remove('selected'));
    selectedItems = [];
});