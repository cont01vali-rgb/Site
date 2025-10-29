/*************************************************
 * FORMULA LEARNING - TRACK SELECTION JAVASCRIPT
 * Handles track selection and navigation to races
 *************************************************/

// Track configurations
const trackConfigs = {
    monaco: {
        name: "Monaco GP",
        difficulty: "Beginner",
        questions: 5,
        timeEstimate: "3 minutes",
        description: "Perfect for first-time racers"
    },
    silverstone: {
        name: "Silverstone", 
        difficulty: "Intermediate",
        questions: 8,
        timeEstimate: "5 minutes",
        description: "A balanced challenge"
    },
    spa: {
        name: "Spa-Francorchamps",
        difficulty: "Expert", 
        questions: 12,
        timeEstimate: "8 minutes",
        description: "For experienced drivers only"
    }
};

// AI Drivers pool with enhanced difficulty ratings
const aiDrivers = [
    // Top Tier - Very Difficult
    { name: "M. Verstappen", flag: "🇳🇱", speed: "Champion", team: "Red Bull", difficulty: "legendary", skillLevel: 0.95 },
    { name: "C. Leclerc", flag: "🇲🇨", speed: "Champion", team: "Ferrari", difficulty: "legendary", skillLevel: 0.93 },
    
    // Elite Tier - Difficult  
    { name: "L. Hamilton", flag: "🇬🇧", speed: "Very Fast", team: "Mercedes", difficulty: "elite", skillLevel: 0.90 },
    { name: "G. Russell", flag: "��", speed: "Very Fast", team: "Mercedes", difficulty: "elite", skillLevel: 0.88 },
    { name: "S. Perez", flag: "🇲🇽", speed: "Fast", team: "Red Bull", difficulty: "elite", skillLevel: 0.85 },
    
    // Professional Tier - Moderate
    { name: "C. Sainz", flag: "��", speed: "Fast", team: "Ferrari", difficulty: "pro", skillLevel: 0.82 },
    { name: "L. Norris", flag: "🇬🇧", speed: "Fast", team: "McLaren", difficulty: "pro", skillLevel: 0.80 },
    { name: "O. Piastri", flag: "��", speed: "Fast", team: "McLaren", difficulty: "pro", skillLevel: 0.78 },
    { name: "F. Alonso", flag: "🇪🇸", speed: "Experienced", team: "Aston Martin", difficulty: "pro", skillLevel: 0.83 },
    
    // Competitive Tier - Easier
    { name: "L. Stroll", flag: "��", speed: "Steady", team: "Aston Martin", difficulty: "competitive", skillLevel: 0.72 },
    { name: "P. Gasly", flag: "🇫🇷", speed: "Quick", team: "Alpine", difficulty: "competitive", skillLevel: 0.75 },
    { name: "E. Ocon", flag: "🇫🇷", speed: "Reliable", team: "Alpine", difficulty: "competitive", skillLevel: 0.73 },
    { name: "A. Albon", flag: "��", speed: "Consistent", team: "Williams", difficulty: "competitive", skillLevel: 0.70 },
    { name: "N. Sargeant", flag: "🇺🇸", speed: "Learning", team: "Williams", difficulty: "competitive", skillLevel: 0.68 }
];

// Initialize track selection page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏁 Formula Learning - Track Selection Initialized');
    
    // Add event listeners to all start race buttons
    const raceButtons = document.querySelectorAll('.start-race-btn');
    raceButtons.forEach(button => {
        button.addEventListener('click', handleTrackSelection);
    });
    
    // Add hover effects to track cards
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach(card => {
        card.addEventListener('mouseenter', handleTrackHover);
        card.addEventListener('mouseleave', handleTrackLeave);
    });
    
    // Initialize random AI drivers display
    displayRandomDrivers();
    
    // Add racing sound effects (optional)
    addSoundEffects();
});

// Handle track selection
function handleTrackSelection(event) {
    const trackId = event.target.getAttribute('data-track');
    const track = trackConfigs[trackId];
    
    if (!track) {
        console.error('Track not found:', trackId);
        return;
    }
    
    console.log(`🏎️ Starting race on: ${track.name}`);
    
    // Show loading animation
    showRaceLoadingAnimation(event.target);
    
    // Store selected track in localStorage for the race page
    localStorage.setItem('selectedTrack', JSON.stringify({
        id: trackId,
        config: track,
        timestamp: Date.now()
    }));
    
    // Select random AI opponents
    const opponents = selectRandomOpponents(5); // Increase to 5 opponents
    localStorage.setItem('raceOpponents', JSON.stringify(opponents));
    
    // Navigate to race page after animation
    setTimeout(() => {
        window.location.href = 'race.html';
    }, 2000);
}

// Show race loading animation
function showRaceLoadingAnimation(button) {
    const originalText = button.textContent;
    
    button.style.background = 'linear-gradient(45deg, #22c55e, #16a34a)';
    button.textContent = '🏁 Preparing Race...';
    button.disabled = true;
    
    // Add racing countdown
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        button.textContent = `🏎️ Starting in ${countdown}...`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(countdownInterval);
            button.textContent = '🚀 Race Starting!';
        }
    }, 500);
}

// Handle track card hover effects
function handleTrackHover(event) {
    const card = event.currentTarget;
    const trackMini = card.querySelector('.track-mini');
    
    // Add racing pulse animation
    if (trackMini) {
        trackMini.style.animation = 'racingPulse 0.6s infinite';
    }
    
    // Add subtle sound effect
    playHoverSound();
}

function handleTrackLeave(event) {
    const card = event.currentTarget;
    const trackMini = card.querySelector('.track-mini');
    
    // Remove animation
    if (trackMini) {
        trackMini.style.animation = '';
    }
}

// Select random AI opponents with strategic difficulty
function selectRandomOpponents(count = 5) {
    // Always include at least one legendary driver for challenge
    const legendaryDrivers = aiDrivers.filter(d => d.difficulty === 'legendary');
    const otherDrivers = aiDrivers.filter(d => d.difficulty !== 'legendary');
    
    let opponents = [];
    
    // Add one legendary driver
    if (legendaryDrivers.length > 0) {
        const legendary = legendaryDrivers[Math.floor(Math.random() * legendaryDrivers.length)];
        opponents.push(legendary);
    }
    
    // Fill the rest with mixed difficulty
    const remainingCount = count - opponents.length;
    const shuffledOthers = otherDrivers.sort(() => Math.random() - 0.5);
    opponents = opponents.concat(shuffledOthers.slice(0, remainingCount));
    
    return opponents.map(driver => ({
        ...driver,
        position: Math.floor(Math.random() * 15) + 85, // Start AI ahead (85-100%)
        speed: driver.skillLevel + (Math.random() * 0.1 - 0.05) // Add slight randomness
    }));
}

// Display random drivers in the preview
function displayRandomDrivers() {
    const driversContainer = document.querySelector('.drivers-list');
    if (!driversContainer) return;
    
    const randomDrivers = selectRandomOpponents(5); // Show 5 drivers
    
    driversContainer.innerHTML = randomDrivers.map(driver => `
        <div class="driver-card ${driver.difficulty}">
            <span class="driver-flag">${driver.flag}</span>
            <span class="driver-name">${driver.name}</span>
            <span class="driver-speed">${driver.speed}</span>
            <span class="driver-difficulty">${driver.difficulty}</span>
        </div>
    `).join('');
}

// Add sound effects (optional, using Web Audio API)
function addSoundEffects() {
    // Create audio context for sound effects
    try {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

function playHoverSound() {
    if (!window.audioContext) return;
    
    // Create a simple beep sound for hover
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, window.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.1);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + 0.1);
}

// Utility function to get track info
function getTrackInfo(trackId) {
    return trackConfigs[trackId] || null;
}

// Export for use in other modules
window.FormulaLearning = {
    trackConfigs,
    aiDrivers,
    getTrackInfo,
    selectRandomOpponents
};