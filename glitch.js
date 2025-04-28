// glitch.js - Handles the glitch simulation phase
// This file contains the logic for the glitch simulation phase of the prank
// including video playback, sound effects, and visual glitches.


// const prankState = {
//     introCompleted: false,
//     glitchSimulationCompleted: false,
//     skipPrank: false,
//     glitchInterval: null,
//     glitchIntervals: []
// };


// Function to get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to play audio with optional text-to-speech
// function playAudio(audioSrc, speechText) {
//     const audio = new Audio(audioSrc);
//     audio.play().catch(e => console.log('Audio playback error:', e));
    
//     // If speech text is provided and speech synthesis is available
//     if (speechText && window.speechSynthesis) {
//         const speech = new SpeechSynthesisUtterance(speechText);
//         window.speechSynthesis.speak(speech);
//     }
// }

// Video clips for the glitch simulation
const videoClips = [
    'video/glitch-laxman1.mp4',
    'video/horror-comic.mp4',
    'video/idgaf.mp4',
    'video/time-limit.mp4',
    'video/meme-construct.mp4',
    'video/maire.mp4',
    'video/glitch.mp4',
    'video/glitch2.mp4',
    'video/aeee.mp4',
    'video/unbox.mp4',
    'video/aee-macarena.mp4',
    'video/shut-up.mp4'
];

// Error messages for overlays
const errorMessages = [
    "System compromised... by Shit!",
    "Your secrets are now... in the cloud. Literally.",
    "Spooky error: Too much awesomeness detected.",
    "WARNING: Your coolness detected.",
    "ERROR 666: Demon found in your cookies.",
    "ALERT: Your phone is possessed... by cuteness!",
    "CRITICAL: Meme overload imminent.",
    "DANGER: Excessive selfie detection."
];

// Threatening but humorous taunts
const taunts = [
    "I'm watching your selfies...",
    "Your secrets are mine now!",
    "I can see all your embarrassing photos!",
    "Your meme collection is... interesting.",
    "Nice playlist you got there...",
    "Your browser history is quite revealing...",
    "I've counted your 42 selfies from Mumbai!",
    "Your phone background is so... you."
];

// Sound effects for the glitch simulation
const glitchSounds = [
    'audio/static.mp3',
    'audio/glitch-beep.mp3',
    'audio/glitch-brokenradio.mp3',
    'audio/digital-error.mp3',
    'audio/comic-boing.mp3',
    'audio/spooky-sound.mp3',
    'audio/falling-sound.mp3',
    'audio/evil-laugh.mp3',
    'audio/silly-giggle.mp3',
    'audio/john-cena.mp3',
    'audio/aaaaahhhh.mp3',

];

// Function to transition to glitch simulation
function transitionToGlitchSimulation() {
    console.log("Transitioning into glitch simulation...");
    
    // Hide intro sequence
    document.getElementById('intro-sequence').classList.remove('active');
    
    // Show glitch simulation
    document.getElementById('glitch-simulation').classList.add('active');
    
    // Start the glitch simulation sequence
    startGlitchSimulation();
}

// Function to start the glitch simulation
function startGlitchSimulation() {
    const videoContainer = document.getElementById('video-container');
    const glitchOverlays = document.querySelectorAll('.glitch-overlay');
    const textMessages = document.getElementById('text-messages');
    
    // Clear any previous content
    videoContainer.innerHTML = '';
    textMessages.innerHTML = '';
    
    // Create video element
    const video = document.createElement('video');
    video.className = 'fullscreen';
    video.autoplay = true;
    video.muted = true; 
    video.loop = true;
    videoContainer.appendChild(video);
    
    // Function to play a random video clip
    function playRandomVideo() {
        const randomClip = getRandomItem(videoClips);
        video.src = randomClip;
        video.play().catch(e => console.log('Video playback error:', e));
        
        // Play a random sound effect
        const randomSound = getRandomItem(glitchSounds);
        playAudio(randomSound);
    }
    
    // Start with a random video
    playRandomVideo();
    
    // Change video every 10-15 seconds with transition effects
    let videoInterval = setInterval(() => {
        // Create a transition effect
        const transition = document.createElement('div');
        transition.className = 'transition-effect fullscreen';
        document.body.appendChild(transition);
        
        // Random transition style
        const transitions = ['glitch-wipe', 'static-burst', 'comic-splat', 'horror-fade', 'jump-cut'];
        const randomTransition = getRandomItem(transitions);
        transition.classList.add(randomTransition);
        
        // After transition effect, change video
        setTimeout(() => {
            playRandomVideo();
            transition.remove();
        }, 500);
    }, 10000 + Math.floor(Math.random() * 5000));
    
    // Show random glitch overlays
    let overlayInterval = setInterval(() => {
        // Choose a random overlay
        const randomOverlay = glitchOverlays[Math.floor(Math.random() * glitchOverlays.length)];
        
        // Show the overlay
        randomOverlay.style.opacity = '1';
        
        // If it's the error message overlay, add a random message
        if (randomOverlay.id === 'error-message-overlay') {
            randomOverlay.textContent = getRandomItem(errorMessages);
        }
        
        // Hide after a random time
        setTimeout(() => {
            randomOverlay.style.opacity = '0';
        }, 1000 + Math.floor(Math.random() * 2000));
    }, 3000 + Math.floor(Math.random() * 2000));
    
    // Display random text messages
    let messageInterval = setInterval(() => {
        // Create a new message
        const message = document.createElement('div');
        
        // Randomly choose message type
        const messageTypes = ['error-message', 'warning-message', 'taunt-message'];
        const randomType = getRandomItem(messageTypes);
        message.className = randomType;
        
        // Set message content based on type
        if (randomType === 'taunt-message') {
            message.textContent = getRandomItem(taunts);
        } else {
            message.textContent = getRandomItem(errorMessages);
        }
        
        // Add to container
        textMessages.appendChild(message);
        
        // Remove after a few seconds
        setTimeout(() => {
            message.remove();
        }, 3000);
    }, 4000 + Math.floor(Math.random() * 3000));
    
    // Store intervals for cleanup
    prankState.glitchIntervals = [videoInterval, overlayInterval, messageInterval];
    
    // End glitch simulation after about 90 seconds
    setTimeout(() => {
        // Clear intervals
        clearInterval(videoInterval);
        clearInterval(overlayInterval);
        clearInterval(messageInterval);
        
        // Transition to troll phase
        prankState.glitchSimulationCompleted = true;
        if (!prankState.skipPrank) {
            transitionToTrollPhase();
        }
    }, 90000);
}
