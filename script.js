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
    {
        name: "PLANETS",
        items: ["Mercury", "Venus", "Earth", "Mars"],
        color: "#ed6060ff" 
    },
    {
        name: "COLORS", 
        items: ["Red", "Blue", "Green", "Yellow"],
        color: "#78eda1ff"
    },
    {
        name: "ANIMALS",
        items: ["Dog", "Cat", "Mouse", "Rabbit"], 
        color: "#6b6deeff"
    },
    {
        name: "FRUITS",
        items: ["Apple", "Banana", "Orange", "Grape"],
        color: "#edb25aff"
    }
];
let selectedItems = [];
let groupsFormed = 0;

document.getElementById("shuffle-grid").addEventListener('click', (e) => {
    logDebug(`Shuffle Clicked`);
    
    const gridItems = document.querySelectorAll('.grid-item');
    const itemsArray = Array.from(gridItems);
    
    logDebug(`Before shuffle: ${itemsArray.map(item => item.textContent).join(', ')}`);
    
    // Shuffle the array
    itemsArray.sort(() => Math.random() - 0.5);
    
    logDebug(`After shuffle: ${itemsArray.map(item => item.textContent).join(', ')}`);
    
    // Get the grid container
    const gridContainer = document.querySelector('.grid-container');
    
    // Remove all current items
    gridContainer.innerHTML = '';
    
    // Add back the shuffled items
    itemsArray.forEach(item => {
        gridContainer.appendChild(item);
    });
    
    logDebug(`Grid updated with new order!`);
});
//selection 
document.querySelectorAll('.grid-item').forEach(element => {
    element.addEventListener('click', (e) => {
        // Check if already selected 
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            selectedItems = selectedItems.filter(item => item !== element);
            logDebug(`Deselected: ${element.textContent}`);
            logDebug(`Current items: ${selectedItems.map(item => item.textContent).join(', ')}`);
        } else {
            if (selectedItems.length >= 4) {
                logDebug("Can't select more than 4 items!");
                return; 
            }
            selectedItems.push(element);
            element.classList.add('selected');
            logDebug(`Selected: ${element.textContent}`);
            logDebug(`Current items: ${selectedItems.map(item => item.textContent).join(', ')}`);
        }
    });
});
//submission
document.getElementById("submit-btn").addEventListener('click', (e) => {
    logDebug(`Submit Button Clicked`);
    if (selectedItems.length < 4) {
        logDebug("Select 4 items");
        return; 
    }
    
    const selectedTexts = selectedItems.map(item => item.textContent);
    logDebug(`User selected: ${selectedTexts.join(', ')}`);
    
    let foundConnection = null; 
    
    for (let i = 0; i < correctConnections.length; i++) {
        const connection = correctConnections[i];
        if (selectedTexts.every(item => connection.items.includes(item))) {
            foundConnection = connection; 
            break;
        }
    }
    
if (foundConnection) {
    logDebug(`CONNECTION: ${foundConnection.name}!!`);
    logDebug(`Items: ${foundConnection.items.join(', ')}`);
    
    const gridContainer = document.querySelector('.grid-container');
    
    selectedItems.forEach(item => {
        item.classList.add('connection');
        item.style.backgroundColor = foundConnection.color; 
        item.style.transform = 'translateY(-10px) scale(1.12)';
        
        setTimeout(() => {
            // Move to front of grid
            gridContainer.insertBefore(item, gridContainer.firstChild);
            
            // Add styling and disable clicking
            item.classList.add('connection');
            item.classList.remove('selected');
            item.style.pointerEvents = 'none';
            
            // Reset the transform (animate back to normal)
            item.style.transform = 'translateY(0px) scale(1)';
        },700); 
    });
    
    selectedItems = [];

} else {
    logDebug(`Not A Connection`);
    let currentTries = parseInt(document.getElementById('tries-count').textContent);
    currentTries--;
    document.getElementById('tries-count').textContent = currentTries;
    
    if (currentTries <= 0) {
        logDebug(`GAME OVER`);
        document.querySelectorAll('.grid-item').forEach(item => {
            item.style.pointerEvents = 'none';
        });
        document.getElementById('submit-btn').disabled = true;
    }
    
    // Clear selection after wrong guess
    selectedItems.forEach(item => item.classList.remove('selected'));
    selectedItems = [];
}
});