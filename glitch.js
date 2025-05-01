// glitch.js - Handles the glitch simulation phase

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

const warningMessages = [
    "WARNING: Facial recognition database accessed...",
    "CAUTION: Your device's camera is now streaming...",
    "WARNING: Personal data transfer 45% complete...",
    "ALERT: Remote access obtained to this device!",
    "CAUTION: Your location has been triangulated!",
    "WARNING: Battery overcharge protocol initiated...",
    "ALERT: Social media accounts are being linked...",
    "CAUTION: Microphone recording in progress..."
]

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
    'audio/aaaaahhhh.mp3'
];

// Transition effect classes
const transitions = [
    'glitch-wipe', 'static-burst', 'comic-splat', 'horror-fade', 'jump-cut'
];

// Main transition function to glitch simulation
function transitionToGlitchSimulation() {
    console.log("Transitioning into glitch simulation...");

    const introSeq = document.getElementById('intro-sequence');
    const glitchSim = document.getElementById('glitch-simulation');
    if (introSeq) introSeq.classList.remove('active');
    if (glitchSim) glitchSim.classList.add('active');

    startGlitchSimulation();
}

// Main glitch simulation logic
function startGlitchSimulation() {
    const videoContainer = document.getElementById('video-container');
    const textMessages = document.getElementById('text-messages');
    const glitchOverlays = document.querySelectorAll('.glitch-overlay');

    if (!videoContainer || !textMessages) {
        console.warn('Missing video or text message container!');
        return;
    }

    // Clear previous content
    videoContainer.innerHTML = '';
    textMessages.innerHTML = '';

    // Create video element
    const video = document.createElement('video');
    video.className = 'fullscreen';
    video.autoplay = true;
    video.muted = false; // Set to false for sound
    video.playsInline = true; // For iOS compatibility
    video.loop = true;
    video.style.objectFit = 'cover'; // Cover the entire screen
    video.style.zIndex = '1'; // Ensure it's on top of other elements
    video.style.pointerEvents = 'none'; // Allow clicks to pass through
    videoContainer.appendChild(video);

    // Non-repeating randomizers
    const nextVideo = createNonRepeatingRandomizer(videoClips);
    const nextSound = createNonRepeatingRandomizer(glitchSounds);
    const nextTransition = createNonRepeatingRandomizer(transitions);
    const nextOverlay = createNonRepeatingRandomizer(Array.from(glitchOverlays));
    const nextErrorMsg = createNonRepeatingRandomizer(errorMessages);
    const nextTaunt = createNonRepeatingRandomizer(taunts);
    const nextWarning = createNonRepeatingRandomizer(warningMessages);

    let isVideoPlaying = false;

    // Audio volume controls
    const GLOBAL_AUDIO_VOLUME = 1.0; // Default volume
    // Adjust volume for specific audio files
    const AUDIO_VOLUME_MAP = {
        'audio/static.mp3' : 0.1,
        'audio/glitch-beep.mp3': 0.1,
        'audio/glitch-brokenradio.mp3': 0.1,
        'audio/digital-error.mp3': 0.1,
        'audio/comic-boing.mp3': 0.1,
        'audio/spooky-sound.mp3': 0.1,
        'audio/falling-sound.mp3': 0.1,
        'audio/evil-laugh.mp3': 0.1,
        'audio/silly-giggle.mp3': 0.1,
        'audio/john-cena.mp3': 0.1,
        'audio/aaaaahhhh.mp3': 0.7
    };

    // Play audio with volume control
    function playAudio(src) {
        const audio = new Audio(src);
        let volume = AUDIO_VOLUME_MAP[src] !== undefined ? AUDIO_VOLUME_MAP[src] : GLOBAL_AUDIO_VOLUME;
        if (isVideoPlaying) {
            volume = Math.min(volume, 0.08); // Lower volume if video is playing
        }
        audio.volume = volume;
        audio.play().catch(e => console.log('Audio playback error:', e));
    }

    // Play a random video clip and sound, non-repeating
    function playRandomVideo() {
        const randomClip = nextVideo();
        video.src = randomClip;
        video.play().catch(e => console.log('Video playback error:', e));
        isVideoPlaying = true;
        playAudio(nextSound());
    }

    playRandomVideo();
    // Change video every 10-15 seconds with non-repeating transitions
    let videoInterval = setInterval(() => {
        const transition = document.createElement('div');
        transition.className = 'transition-effect fullscreen';
        document.body.appendChild(transition);

        transition.classList.add(nextTransition());

        setTimeout(() => {
            playRandomVideo();
            transition.remove();
        }, 500);
    }, 10000 + Math.floor(Math.random() * 5000));

    // Show non-repeating glitch overlays
    let overlayInterval = setInterval(() => {
        if (glitchOverlays.length === 0) return;
        const randomOverlay = nextOverlay();
        randomOverlay.style.opacity = '1';

        // If it's the error message overlay, add a non-repeating message
        if (randomOverlay.id === 'error-message-overlay') {
            randomOverlay.textContent = nextErrorMsg();
        }

        setTimeout(() => {
            randomOverlay.style.opacity = '0';
        }, 1000 + Math.floor(Math.random() * 2000));
    }, 3000 + Math.floor(Math.random() * 2000));

    // Display non-repeating text messages
    let messageTypes = ['error-message', 'warning-message', 'taunt-message'];
    const nextMsgType = createNonRepeatingRandomizer(messageTypes);

    let messageInterval = setInterval(() => {
        const message = document.createElement('div');
        const randomType = nextMsgType();
        message.className = randomType;

        if (randomType === 'taunt-message') {
            message.textContent = nextTaunt();
        }
        else if (randomType === 'warning-message') {
            message.textContent = nextWarning();
        } 
        else {
            message.textContent = nextErrorMsg();
        }

        textMessages.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }, 4000 + Math.floor(Math.random() * 3000));

    // Store intervals for cleanup
    if (typeof prankState !== 'undefined') {
        prankState.glitchIntervals = [videoInterval, overlayInterval, messageInterval];
    }

    // End glitch simulation after about 90 seconds
    setTimeout(() => {
        clearInterval(videoInterval);
        clearInterval(overlayInterval);
        clearInterval(messageInterval);

        // Hide overlays
        glitchOverlays.forEach(overlay => overlay.style.opacity = '0');
        textMessages.innerHTML = '';

        // Transition to troll phase
        if (typeof prankState !== 'undefined') prankState.glitchSimulationCompleted = true;
        if (typeof prankState === 'undefined' || !prankState.skipPrank) {
            transitionToTrollPhase();
        }
    }, 90000);
}

// Dummy implementations for playAudio and transitionToTrollPhase if not defined
if (typeof playAudio !== 'function') {
    function playAudio(src) { console.log(`(Simulated) Playing audio: ${src}`); }
}
if (typeof transitionToTrollPhase !== 'function') {
    function transitionToTrollPhase() { console.log('(Simulated) Transition to troll phase'); }
}

// Expose for debugging
window.transitionToGlitchSimulation = transitionToGlitchSimulation;
window.startGlitchSimulation = startGlitchSimulation;