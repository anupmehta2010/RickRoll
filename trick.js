// main.js - Main controller script for the prank website

// Global state object to track prank progress
const prankState = {
    currentStep: 'intro',
    introCompleted: false,
    glitchSimulationCompleted: false,
    skipPrank: false,
    randomSeed: Math.floor(Math.random() * 1000)
};

// Audio functions for playing sounds with fallback text
function playAudio(soundFile, fallbackText) {
    console.log(`Playing sound: ${soundFile}`);
    
    // Create audio element for sound effects
    const audio = new Audio();
    audio.src = soundFile;
    audio.play().catch(e => {
        console.log(`Audio couldn't play: ${e}`);
        
        // If audio fails, show text instead
        if (fallbackText) {
            const textOverlay = document.createElement('div');
            textOverlay.className = 'text-overlay';
            textOverlay.textContent = fallbackText;
            document.body.appendChild(textOverlay);
            
            setTimeout(() => {
                textOverlay.remove();
            }, 2000);
        }
    });
}

// Function for playing voiceovers with text fallback
function playVoiceover(soundFile, text) {
    console.log(`Playing voiceover: ${text}`);
    // In reality, you'd play the audio file
    
    // Create a text overlay for development
    const textOverlay = document.createElement('div');
    textOverlay.className = 'voiceover-overlay';
    textOverlay.textContent = text;
    textOverlay.style.position = 'absolute';
    textOverlay.style.bottom = '20px';
    textOverlay.style.left = '20px';
    textOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    textOverlay.style.color = '#fff';
    textOverlay.style.padding = '10px';
    textOverlay.style.borderRadius = '5px';
    textOverlay.style.zIndex = '1000';
    
    document.body.appendChild(textOverlay);
    
    setTimeout(() => {
        textOverlay.remove();
    }, 5000);
}

// Helper function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Initialize the prank when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, initializing prank...");

    // Helper to safely add event listeners
    function safeAddListener(id, event, handler) {
        const el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    }

    // Set up the "Do Not Click" button
    safeAddListener('do-not-click', 'click', function() {
        prankState.skipPrank = true;
        skipToSpotify();
    });

    // Set up interactive buttons
    safeAddListener('stabilize-btn', 'click', function() {
        triggerMoreGlitches();
        playAudio('audio/nice-try.mp3', 'Nice try! You just made it worse!');
    });

    safeAddListener('escape-btn', 'click', function() {
        triggerMoreGlitches();
        playAudio('audio/no-escape.mp3', 'There is no escape from the fun!');
    });

    safeAddListener('fake-skip', 'click', function() {
        playAudio('audio/no-skipping.mp3', 'No skipping allowed! Face your fears... and your laughs!');
    });

    // Start the intro sequence
    startIntroSequence();
});
