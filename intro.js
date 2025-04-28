// intro.js - Handles the cinematic intro sequence

// Random text generator for glitches
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

// Array of common names for random whispers
const commonNames = ['Laxmi', 'Laxman', 'Lacmi', 'Laxman-Rekha'];

// Function to generate fake device info
function generateFakeDeviceInfo() {
    const models = ['Samsung A35'];
    const model = getRandomItem(models);
    
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

// Function to start the intro sequence
function startIntroSequence() {
    console.log("Downloading Data...");
    
    const introSequence = document.getElementById('intro-sequence');
    const darkScreen = introSequence.querySelector('.dark-screen');
    
    // Play ambient sound
    playAudio('audio/intro-sound.mp3');
    
    // Sequence timeline with setTimeout for each step
    setTimeout(() => {
        // Fade in logo
        const logoContainer = document.getElementById('logo-container');
        logoContainer.classList.remove('hidden');
        playAudio('audio/dramatic-sting.mp3');
    }, 2000);
    
    setTimeout(() => {
        // Show narrative text
        const narrativeText = document.getElementById('narrative-text');
        narrativeText.classList.remove('hidden');
        playVoiceover("audio/intro-voiceover.mp3", "In a world where phones have minds of their own... one device is about to face its worst nightmare... and its funniest!");
    }, 4000);
    
    setTimeout(() => {
        // Show system diagnostics with glitchy text
        const systemDiagnostics = document.getElementById('system-diagnostics');
        systemDiagnostics.classList.remove('hidden');
        
        // Add random glitchy text
        for (let i = 0; i < 5; i++) {
            const glitchText = document.createElement('p');
            glitchText.className = 'glitch-text';
            glitchText.textContent = getRandomItem(glitchTexts);
            systemDiagnostics.appendChild(glitchText);
            
            // Animate each text entry
            setTimeout(() => {
                glitchText.style.animation = 'glitch-anim 0.2s infinite';
            }, i * 800);
        }
        
        // Start visual glitches
        startVisualGlitches(darkScreen);
    }, 8000);
    
    setTimeout(() => {
        // Show AR overlay
        document.getElementById('ar-overlay').classList.remove('hidden');
        playAudio('audio/camera-shutter.mp3');
    }, 12000);
    
    setTimeout(() => {
        // Show device info
        const deviceInfoDiv = document.getElementById('device-info');
        deviceInfoDiv.classList.remove('hidden');
        deviceInfoDiv.innerHTML = generateFakeDeviceInfo();
    }, 15000);
    
    setTimeout(() => {
        // Show interactive prompts
        document.getElementById('interactive-prompts').classList.remove('hidden');
    }, 18000);
    
    // Show "Do Not Click" button for 3 seconds at a random time
    const doNotClickTime = 5000 + Math.floor(Math.random() * 10000);
    setTimeout(() => {
        const doNotClickContainer = document.getElementById('do-not-click-container');
        doNotClickContainer.classList.remove('hidden');
        
        // Position randomly on screen
        const button = document.getElementById('do-not-click');
        button.style.position = 'absolute';
        button.style.left = Math.floor(Math.random() * 70) + '%';
        button.style.top = Math.floor(Math.random() * 70) + '%';
        
        // Hide after 3 seconds
        setTimeout(() => {
            doNotClickContainer.classList.add('hidden');
        }, 3000);
    }, doNotClickTime);
    
    // End intro sequence and move to glitch simulation
    setTimeout(() => {
        prankState.introCompleted = true;
        if (!prankState.skipPrank) {
            transitionToGlitchSimulation();
        }
    }, 25000);
}

// Function to start visual glitches
function startVisualGlitches(element) {
    // Create various glitch effects
    const glitchEffects = [
        () => { element.style.filter = 'hue-rotate(90deg)'; },
        () => { element.style.filter = 'invert(100%)'; },
        () => { element.style.transform = 'skew(5deg, 5deg)'; },
        () => { element.style.opacity = '0.7'; },
        () => { element.style.filter = 'blur(5px)'; },
        () => { element.style.animation = 'shake 0.5s'; }
    ];
    
    // Apply random glitches at intervals
    let glitchInterval = setInterval(() => {
        const randomEffect = getRandomItem(glitchEffects);
        randomEffect();
        
        // Reset after a short time
        setTimeout(() => {
            element.style.filter = '';
            element.style.transform = '';
            element.style.opacity = '1';
            element.style.animation = '';
        }, 300);
    }, 2000);
    
    // Store interval for cleanup
    prankState.glitchInterval = glitchInterval;
}

// Function to trigger more intense glitches
function triggerMoreGlitches() {
    const container = document.getElementById('Fa-ke-Virus-Troll');
    
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
