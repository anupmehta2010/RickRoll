// intro.js - Handles the cinematic intro sequence

// Glitch texts for diagnostics (non-repeating)
const glitchTexts = [
    "Detected your big Forehead.",
    "WARNING: System compromised by dancing skeletons",
    "ERROR 404: Error itself not found!",
    "ALERT: Too much awesomeness detected",
    "SCANNING: Found 42 embarrassing selfies",
    "VIRUS DETECTED: Everybody was Kung Fu Fighting! Huu!! Haa!!",
    "SYSTEM FAILURE: Brain.exe has stopped working",
    "HACKED: Your secrets are now in the cloud. Literally.",
    "CAUTION: Phone may explode with confetti"
];
const nextGlitchText = createNonRepeatingRandomizer(glitchTexts);

// Array of common names for random whispers (non-repeating)
const commonNames = ['Laxmi', 'Laxman', 'Lacmi', 'Laxman-Rekha'];
const nextCommonName = createNonRepeatingRandomizer(commonNames);

// Function to generate fake device info (non-repeating model)
function generateFakeDeviceInfo() {
    const models = ['Samsung A35'];
    const model = createNonRepeatingRandomizer(models)();

    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    // Return HTML for device info display
    return `
        <div class="device-info-container">
            <p>MODEL: ${model} Laxman-Rekha-4HeadMax</p>
            <p>IMEI: ${Math.floor(Math.random() * 1000000000000000)}</p>
            <p>DATE: ${dateStr}</p>
            <p>TIME: ${timeStr}</p>
            <p>BATTERY: CRITICALLY LOW (JUST KIDDING)</p>
            <p>STATUS: COMPROMISED </p>
        </div>
    `;
}

// Sequence steps as non-repeating randomizers for overlays, sounds, etc.
const introSounds = [
    'audio/intro-sound.mp3',
    'audio/dramatic-sting.mp3',
    'audio/camera-shutter.mp3'
];
const nextIntroSound = createNonRepeatingRandomizer(introSounds);

const voiceovers = [
    { src: "audio/intro-voiceover.mp3", text: "In a world where phones have minds of their own... one device is about to face its worst nightmare... and its funniest!" }
];
const nextVoiceover = createNonRepeatingRandomizer(voiceovers);

// Function to start the intro sequence
function startIntroSequence() {
    console.log("Downloading Data...");

    const introSequence = document.getElementById('intro-sequence');
    if (!introSequence) {
        console.warn('intro-sequence element not found!');
        return;
    }
    const darkScreen = introSequence.querySelector('.dark-screen');
    if (!darkScreen) {
        console.warn('dark-screen element not found!');
        return;
    }

    // Play ambient sound (non-repeating)
    playAudio(nextIntroSound());

    // Sequence timeline with setTimeout for each step
    setTimeout(() => {
        // Fade in logo
        const logoContainer = document.getElementById('logo-container');
        if (logoContainer) {
            logoContainer.classList.remove('hidden');
            logoContainer.classList.add('fade-in');
            playAudio(nextIntroSound());
        }
    }, 2000);

    setTimeout(() => {
        // Show narrative text
        const narrativeText = document.getElementById('narrative-text');
        if (narrativeText) {
            narrativeText.classList.remove('hidden');
            narrativeText.classList.add('fade-in');
            const voiceover = nextVoiceover();
            playVoiceover(voiceover.src, voiceover.text);
        }
    }, 4000);

    setTimeout(() => {
        // Show system diagnostics with glitchy text (non-repeating)
        const systemDiagnostics = document.getElementById('system-diagnostics');
        if (systemDiagnostics) {
            systemDiagnostics.classList.remove('hidden');
            systemDiagnostics.innerHTML = ""; // Clear previous glitches if any

            // Add random glitchy text (non-repeating)
            for (let i = 0; i < 5; i++) {
                const glitchText = document.createElement('p');
                glitchText.className = 'glitch-text';
                glitchText.textContent = nextGlitchText();
                systemDiagnostics.appendChild(glitchText);

                // Animate each text entry
                setTimeout(() => {
                    glitchText.classList.add('glitch-anim');
                }, i * 800);
            }
        }

        // Start visual glitches
        startVisualGlitches(darkScreen);
    }, 8000);

    setTimeout(() => {
        // Show AR overlay
        const arOverlay = document.getElementById('ar-overlay');
        if (arOverlay) {
            arOverlay.classList.remove('hidden');
            arOverlay.classList.add('fade-in');
            playAudio(nextIntroSound());
        }
    }, 12000);

    setTimeout(() => {
        // Show device info
        const deviceInfoDiv = document.getElementById('device-info');
        if (deviceInfoDiv) {
            deviceInfoDiv.classList.remove('hidden');
            deviceInfoDiv.classList.add('fade-in');
            deviceInfoDiv.innerHTML = generateFakeDeviceInfo();
        }
    }, 15000);

    setTimeout(() => {
        // Show interactive prompts
        const prompts = document.getElementById('interactive-prompts');
        if (prompts) {
            prompts.classList.remove('hidden');
            prompts.classList.add('fade-in');
        }
    }, 18000);

    // Show "Do Not Click" button for 3 seconds at a random time
    const doNotClickTime = 5000 + Math.floor(Math.random() * 10000);
    setTimeout(() => {
        const doNotClickContainer = document.getElementById('do-not-click-container');
        if (doNotClickContainer) {
            doNotClickContainer.classList.remove('hidden');
            doNotClickContainer.classList.add('fade-in');

            // Position randomly on screen
            const button = document.getElementById('do-not-click');
            if (button) {
                button.style.position = 'absolute';
                button.style.left = Math.floor(Math.random() * 70) + '%';
                button.style.top = Math.floor(Math.random() * 70) + '%';
            }

            // Hide after 3 seconds
            setTimeout(() => {
                doNotClickContainer.classList.add('hidden');
            }, 3000);
        }
    }, doNotClickTime);

    // End intro sequence and move to glitch simulation
    setTimeout(() => {
        prankState.introCompleted = true;
        if (!prankState.skipPrank) {
            transitionToGlitchSimulation();
        }
        // Clean up glitches
        stopVisualGlitches();
    }, 25000);
}

// Function to start visual glitches (non-repeating effects)
let visualGlitchInterval = null;
function startVisualGlitches(element) {
    const glitchEffects = [
        () => { element.style.filter = 'hue-rotate(90deg)'; },
        () => { element.style.filter = 'invert(100%)'; },
        () => { element.style.transform = 'skew(5deg, 5deg)'; },
        () => { element.style.opacity = '0.7'; },
        () => { element.style.filter = 'blur(5px)'; },
        () => { element.style.animation = 'shake 0.5s'; }
    ];
    const nextGlitchEffect = createNonRepeatingRandomizer(glitchEffects);

    visualGlitchInterval = setInterval(() => {
        const randomEffect = nextGlitchEffect();
        randomEffect();

        // Reset after a short time
        setTimeout(() => {
            element.style.filter = '';
            element.style.transform = '';
            element.style.opacity = '1';
            element.style.animation = '';
        }, 300);
    }, 2000);
}

// Function to stop visual glitches
function stopVisualGlitches() {
    if (visualGlitchInterval) {
        clearInterval(visualGlitchInterval);
        visualGlitchInterval = null;
    }
}

// Function to trigger more intense glitches
function triggerMoreGlitches() {
    const container = document.getElementById('Fa-ke-Virus-Troll');
    if (!container) return;

    // More intense glitch effects
    container.style.animation = 'shake 0.5s';
    container.style.filter = 'hue-rotate(180deg) contrast(200%)';

    // Play glitch sound
    playAudio('audio/glitch-brokenradio.mp3');

    // Reset after a moment
    setTimeout(() => {
        container.style.animation = '';
        container.style.filter = '';
    }, 500);
}

// Utility: Get random item from array (used for fallback)
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Dummy implementations for playAudio, playVoiceover, transitionToGlitchSimulation, prankState
if (typeof playAudio !== 'function') {
    function playAudio(src) { console.log(`(Simulated) Playing audio: ${src}`); }
}
if (typeof playVoiceover !== 'function') {
    function playVoiceover(src, text) { console.log(`(Simulated) Voiceover: ${text}`); }
}
if (typeof transitionToGlitchSimulation !== 'function') {
    function transitionToGlitchSimulation() { console.log('(Simulated) Transition to glitch simulation'); }
}
if (typeof prankState === 'undefined') {
    window.prankState = { introCompleted: false, skipPrank: false };
}

// Optionally, start the intro sequence automatically if this is the entry point
startIntroSequence();