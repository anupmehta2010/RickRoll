// Master Prank Script: intro → glitch → troll

// --- GLOBAL STATE ---
const prankState = {
    currentStep: 'intro',
    introCompleted: false,
    glitchSimulationCompleted: false,
    trollCompleted: false,
    skipPrank: false,
    glitchIntervals: [],
    countdownInterval: null,
    videoQueue: [],
    videoIndex: 0,
    currentAudio: null,
    videoPlaying: false,
    introTimeouts: [],
    trollTimeouts: [],
    loadingInterval: null
};

// --- AUDIO VOLUMES ---
const GLOBAL_AUDIO_VOLUME = 0.77;
const AUDIO_VOLUME_MAP = {
    'audio/static.mp3': 0.34,
    'audio/glitch-beep.mp3': 0.66,
    'audio/glitch-brokenradio.mp3': 0.67,
    'audio/digital-error.mp3': 0.66,
    'audio/comic-boing.mp3': 0.25,
    'audio/spooky-sound.mp3': 0.3,
    'audio/falling-sound.mp3': 0.5,
    'audio/evil-laugh.mp3': 0.4,
    'audio/silly-giggle.mp3': 0.4,
    'audio/john-cena.mp3': 0.6,
    'audio/aaaaahhhh.mp3': 0.7
};

// --- CONTENT ARRAYS ---

const glitchTexts = [
    "Detected your large Forehead.",
    "WARNING: System compromised by Shit!",
    "ERROR 404: Error itself not found!",
    "ALERT: Too much awesomeness detected, JK!",
    "SCANNING: Found 42 embarrassing selfies",
    "VIRUS DETECTED: Everybody was Kung Fu Fighting! Huu!! Haa!!",
    "SYSTEM FAILURE: Brain.exe has stopped working",
    "HACKED: Your secrets are now in the cloud. Literally.",
    "CAUTION: Phone may explode anytime with confetti"
];

const commonNames = ['Laxmi', 'Laxman', 'Lacmi', 'Laxman-Rekha'];

const videoClips = [
    'video/glitch-laxman1.mp4', 'video/horror-comic.mp4', 'video/time-limit.mp4',
    'video/meme-construct.mp4', 'video/maire.mp4', 'video/glitch.mp4', 'video/glitch2.mp4',
    'video/aeee.mp4', 'video/unbox.mp4', 'video/aee-macarena.mp4', 'video/shut-up.mp4'
];

const errorMessages = [
    "System compromised... by Shit!", "Your secrets are now... in the cloud. Literally.",
    "Spooky error: Too much awesomeness detected.", "WARNING: Your coolness detected.",
    "ERROR 666: Demon found in your cookies.", "ALERT: Your phone is possessed... by cuteness!",
    "CRITICAL: Meme overload imminent.", "DANGER: Excessive selfie detection."
];

const taunts = [
    "I'm watching your selfies...", "Your secrets are mine now!", "I can see all your embarrassing photos!",
    "Your meme collection is... interesting.", "Nice playlist you got there...",
    "Your browser history is quite revealing...", "I've counted your 42 selfies from Mumbai!",
    "Your phone background is so... you."
];

const warningMessages = [
    "WARNING: 4-head recognition database accessed...", "CAUTION: Your device's camera is now streaming...",
    "WARNING: Personal data transfer 45% complete...", "ALERT: Remote access obtained to this device!",
    "CAUTION: Your location has been triangulated!", "WARNING: Battery overcharge protocol initiated...",
    "ALERT: Social media accounts are being linked...", "CAUTION: Microphone recording in progress...Oh wait not the snoring again!"
];

const glitchSounds = [
    'audio/static.mp3', 'audio/glitch-beep.mp3', 'audio/glitch-brokenradio.mp3', 'audio/digital-error.mp3',
    'audio/comic-boing.mp3', 'audio/spooky-sound.mp3', 'audio/falling-sound.mp3', 'audio/evil-laugh.mp3',
    'audio/silly-giggle.mp3', 'audio/john-cena.mp3', 'audio/aaaaahhhh.mp3'
];

const glitchSpecific = [
    'audio/static.mp3', 'audio/glitch-beep.mp3', 'audio/glitch-brokenradio.mp3', 'audio/digital-error.mp3'
];

const transitions = [
    'glitch-wipe', 'static-burst', 'comic-splat', 'horror-fade', 'jump-cut'
];

const mascotTypes = ['ghost', 'skull', 'alien', 'robot', 'clown'];
const greetings = [
    'Happy New Year!', 'Happy Birthday!', 'Happy Holi!', 'Happy Diwali!',
    'Jai Ma Durgawali!', 'Jai Mahakali!', 'Jai Ho!!!'
];
const fileTypes = ['jpg', 'png', 'mp4', 'pdf', 'doc'];
const fileNames = [
    'images/1math.jpg', 'images/2khauf.jpg', 'images/3not-again.jpg', 'images/4kya-ree.jpg',
];
const hackerMessages = [
    "I'm watching you, Just kidding.. cat videos.",
    "You're not getting your phone back!",
    "Downloading your embarrassing playlist...",
    "Your memes are... interesting.",
    "I can see all your selfies! 😈"
];

// --- UTILS ---
function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createNonRepeatingRandomizer(items) {
    if (!items || !items.length) return () => null;
    let pool = shuffle(items.slice());
    let index = 0;
    return function next() {
        if (index >= pool.length) {
            pool = shuffle(items.slice());
            index = 0;
        }
        return pool[index++];
    };
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// --- AUDIO ---
function fadeOutAudio(audio, duration = 700) {
    if (!audio) return;
    const step = audio.volume / (duration / 30);
    const fade = setInterval(() => {
        if (audio.volume > step) {
            audio.volume -= step;
        } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(fade);
        }
    }, 30);
}

function fadeInAudio(audio, targetVolume = 1, duration = 700) {
    if (!audio) return;
    audio.volume = 0;
    audio.play();
    const step = targetVolume / (duration / 30);
    const fade = setInterval(() => {
        if (audio.volume < targetVolume - step) {
            audio.volume += step;
        } else {
            audio.volume = targetVolume;
            clearInterval(fade);
        }
    }, 30);
}

function playAudioWithFade(audioSrc, speechText) {
    if (prankState.currentAudio) {
        fadeOutAudio(prankState.currentAudio, 600);
    }
    const audio = new Audio(audioSrc);
    let volume = AUDIO_VOLUME_MAP[audioSrc] !== undefined ? AUDIO_VOLUME_MAP[audioSrc] : GLOBAL_AUDIO_VOLUME;
    prankState.currentAudio = audio;
    fadeInAudio(audio, volume, 600);
    if (speechText) showHackerOverlayText(speechText);
    audio.onerror = function() {
        if (speechText) showHackerOverlayText(speechText);
    };
    return audio;
}

function playAudio(audioSrc, speechText) {
    if (prankState.currentAudio) {
        prankState.currentAudio.pause();
    }
    const audio = new Audio(audioSrc);
    let volume = AUDIO_VOLUME_MAP[audioSrc] !== undefined ? AUDIO_VOLUME_MAP[audioSrc] : GLOBAL_AUDIO_VOLUME;
    audio.volume = volume;
    prankState.currentAudio = audio;
    audio.play();
    if (speechText) showHackerOverlayText(speechText);
    audio.onerror = function() {
        if (speechText) showHackerOverlayText(speechText);
    };
    return audio;
}

function playVoiceover(soundFile, text) {
    playAudioWithFade(soundFile, text);
}

// --- ACCESSIBILITY ---
function announce(message) {
    let live = document.getElementById('aria-live');
    if (!live) {
        live = document.createElement('div');
        live.id = 'aria-live';
        live.className = 'visually-hidden';
        live.setAttribute('aria-live', 'polite');
        document.body.appendChild(live);
    }
    live.innerHTML = `${message}`;
}

function enableKeyboardNav() {
    document.querySelectorAll('.prank-button, .game-button').forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keyup', e => {
            if (e.key === 'Enter' || e.key === ' ') btn.click();
        });
    });
}

// --- OVERLAY TEXT ---
function showHackerOverlayText(text) {
    document.querySelectorAll('.hacker-overlay').forEach(el => el.remove());
    const effects = ['typing', 'pop', 'floating'];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    const overlay = document.createElement('div');
    overlay.className = `hacker-overlay glitchy-text ${effect}`;
    overlay.style.position = 'fixed';
    overlay.style.left = '50%';
    overlay.style.top = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.zIndex = 9999;
    if (effect === 'typing') {
        overlay.textContent = '';
        document.body.appendChild(overlay);
        let i = 0;
        const typeInterval = setInterval(() => {
            overlay.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(typeInterval);
        }, 40);
    } else if (effect === 'pop') {
        overlay.textContent = text;
        overlay.classList.add('pop-animate');
        document.body.appendChild(overlay);
    } else if (effect === 'floating') {
        overlay.textContent = text;
        overlay.style.top = `${30 + Math.random() * 40}%`;
        overlay.style.left = `${20 + Math.random() * 60}%`;
        overlay.classList.add('floating-animate');
        document.body.appendChild(overlay);
    }
    setTimeout(() => overlay.remove(), 2500);
}

// --- CLEARING FUNCTIONS ---
function clearAllOverlays() {
    const overlays = document.querySelectorAll('.glitch-overlay, .error-message, .warning-message, .taunt-message, .text-overlay');
    overlays.forEach(overlay => overlay.remove());
    const textContainers = document.querySelectorAll('#text-messages');
    textContainers.forEach(container => {
        if (container) container.innerHTML = '';
    });
}

function hideAllElements(elementIds) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element && !element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
    });
}

// --- PRELOADER ---
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
    startIntroSequence();
}

function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loaderBar = document.querySelector('.loader-bar-inner');
    const loaderPercentage = document.querySelector('.loader-percentage');
    const mediaFiles = [
        // Audio
        'audio/aaaaahhhh.mp3','audio/beep-sound.mp3','audio/camera-shutter.mp3','audio/comic-boing.mp3',
        'audio/countdown-beepsound.mp3','audio/digital-error.mp3','audio/dramatic-sting.mp3','audio/evil-laugh.mp3',
        'audio/falling-sound.mp3','audio/glitch-beep.mp3','audio/glitch-brokenradio.mp3','audio/intro-sound.mp3',
        'audio/intro-voiceover.mp3','audio/john-cena.mp3','audio/listening-sound.mp3','audio/no-escape.mp3',
        'audio/nice-try.mp3','audio/no-skipping.mp3','audio/silly-giggle.mp3','audio/spooky-sound.mp3',
        'audio/static.mp3','audio/too-late.mp3','audio/typing-sound.mp3','audio/victory.mp3',
        'audio/voice-challenge.mp3','audio/wrong-button.mp3',
        // Video
        'video/aee-macarena.mp4','video/glitch.mp4','video/glitch2.mp4','video/aeee.mp4','video/glitch-laxman1.mp4',
        'video/horror-comic.mp4','video/idgaf.mp4','video/maire.mp4','video/meme-construct.mp4','video/niga-niga-niga.mp4',
        'video/rickroll.mp4','video/shut-up.mp4','video/time-limit.mp4','video/unbox.mp4',
        // Images
        'images/1math.jpg','images/2khauf.jpg','images/3not-again.jpg','images/4kya-ree.jpg',
        'images/pixelation.jpg','images/screen-tear.jpg','images/splat.jpg','images/static.jpg'
    ];
    let loadedCount = 0;
    const totalFiles = mediaFiles.length;
    function updateLoader() {
        const percentage = Math.round((loadedCount / totalFiles) * 100);
        if (loaderBar) loaderBar.style.width = `${percentage}%`;
        if (loaderPercentage) loaderPercentage.textContent = `${percentage}%`;
        if (loadedCount === totalFiles) {
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s ease';
                preloader.addEventListener('transitionend', hidePreloader, { once: true });
                setTimeout(hidePreloader, 1000);
            } else {
                hidePreloader();
            }
        }
    }
    function incrementCounter() {
        loadedCount++;
        updateLoader();
    }
    for (let i = 0; i < totalFiles; i++) {
        const file = mediaFiles[i];
        const fileType = file.split('.').pop().toLowerCase();
        if (['mp3', 'wav'].includes(fileType)) {
            const audio = new Audio();
            audio.oncanplaythrough = function() {
                incrementCounter();
                this.oncanplaythrough = null;
            };
            audio.onerror = incrementCounter;
            audio.src = file;
            setTimeout(() => {
                if (audio.readyState < 3) incrementCounter();
            }, 3000);
        } else if (['mp4', 'webm'].includes(fileType)) {
            const video = document.createElement('video');
            video.oncanplaythrough = function() {
                incrementCounter();
                this.oncanplaythrough = null;
            };
            video.onerror = incrementCounter;
            video.src = file;
            video.preload = 'metadata';
            setTimeout(() => {
                if (video.readyState < 3) incrementCounter();
            }, 3000);
        } else {
            const img = new Image();
            img.onload = incrementCounter;
            img.onerror = incrementCounter;
            img.src = file;
            setTimeout(() => {
                if (!img.complete) incrementCounter();
            }, 3000);
        }
    }
}

// --- INTRO PHASE ---
function hideAllIntroVisuals() {
    [
        'logo-container', 'narrative-text', 'system-diagnostics', 
        'ar-overlay', 'device-info', 'interactive-prompts', 
        'do-not-click-container', "info-note"
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.classList) el.classList.add('hidden');
    });
}

function showFakeDeviceInfo(onVideoEnd) {
    const models = [
        'Samsung A35 4Head-Max'
    ];
    const androidVersions = ['14', '13'];
    const buildNumbers = [
        'TP1A.220624.014', 'RKQ1.211119.001', 'SP1A.210812.016', 'RQ3A.210805.001.A1'
    ];
    const imei = Math.floor(100000000000000 + Math.random() * 900000000000000);
    const serial = Math.random().toString(36).substring(2, 12).toUpperCase();
    const battery = Math.floor(10 + Math.random() * 90);
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    const model = models[Math.floor(Math.random() * models.length)];
    const android = androidVersions[Math.floor(Math.random() * androidVersions.length)];
    const build = buildNumbers[Math.floor(Math.random() * buildNumbers.length)];
    const lines = [
        `MODEL:            ${model}`,
        `ANDROID VERSION:  ${android}`,
        `BUILD NUMBER:     ${build}`,
        `IMEI:             ${imei}`,
        `SERIAL:           ${serial}`,
        `BATTERY:          ${battery}%`,
        `SIM STATUS:       ACTIVE`,
        `NETWORK:          Jio 5G`,
        `LOCATION:         28.${Math.floor(Math.random()*1000000)}, 77.${Math.floor(Math.random()*1000000)}`,
        `STORAGE:          128GB`,
        `RAM:              8GB`,
        `SECURITY:         ROOT ACCESS DETECTED`,
        `STATUS:           Bhojpurified`,
        `DATE:             ${dateStr}`,
        `TIME:             ${timeStr}`
    ];
    const container = document.getElementById('device-info');
    if (container && container.classList.contains('hidden')) {
        container.classList.remove('hidden');
    }
    container.innerHTML = '<pre class="device-info-pre"></pre>';
    const pre = container.querySelector('.device-info-pre');
    let i = 0;
    

    function typeLine() {
        if (i < lines.length) {
            const line = document.createElement('div');
            line.className = 'glitchy-text';
            line.textContent = lines[i];
            pre.appendChild(line);

            // Play a random glitch sound at each line
            playAudio('audio/glitch-beep.mp3');

            i++;
            setTimeout(typeLine, 250 + Math.random() * 110);
        }
    }
    typeLine();

    setTimeout(() => {
        const infoNote = document.getElementById('info-note');
        if (infoNote.classList.contains('hidden')) infoNote.classList.remove('hidden');
        infoNote.innerHTML = `
            <div style="display:flex; flex-direction:column;align-items:flex-end;">
                <span class="info-mc-font">I have your information haha!</span>
                <video id="info-corner-video" width="180" height="110" style="margin-top:8px;" muted></video>
            </div>
        `;
        const video = document.getElementById('info-corner-video');
        const glitchAudio = new Audio('audio/glitch-brokenradio.mp3');
        glitchAudio.volume = 0.7;
        // Play glitch audio and video at the same time as soon as device info lines end
        video.src = 'video/idgaf.mp4';
        video.muted = false;
        video.volume = 1.0;
        glitchAudio.play();
        video.play();
        // Wait for video to finish before calling onVideoEnd
        video.onended = () => {
            if (typeof onVideoEnd === 'function') onVideoEnd();
        };
    }, lines.length * 300);
}

function startIntroSequence() {
    announce("Experience started");
    hideAllIntroVisuals();
    prankState.currentStep = 'intro';
    if (prankState.introTimeouts) {
        prankState.introTimeouts.forEach(id => clearTimeout(id));
    }
    prankState.introTimeouts = [];

    // Step 1: Show glitchy greeting
    let timeout = setTimeout(() => {
        const logoContainer = document.getElementById('logo-container');
        const glitchText = document.getElementById('laxman-rekha-glitch-text');
        if (logoContainer && glitchText) {
            logoContainer.classList.remove('hidden');
            glitchText.textContent = '';
            setTimeout(() => {
                glitchText.textContent = 'Hello Laxman';
                playAudio('audio/glitch-beep.mp3');
                setTimeout(() => {
                    glitchText.textContent = 'Hello Laxman...';
                    playAudio('audio/static.mp3');
                    setTimeout(() => {
                        glitchText.textContent = 'Hello Laxman...Rekha!';
                        playAudio('audio/glitch-brokenradio.mp3');
                        setTimeout(() => {
                            logoContainer.classList.add('hidden');
                        }, 1200);
                    }, 700);
                }, 700);
            }, 700);
        }
    }, 3000);
    prankState.introTimeouts.push(timeout);

    // Step 2: Show narrative text
    timeout = setTimeout(() => {
        hideAllIntroVisuals();
        const narrativeText = document.getElementById('narrative-text');
        if (narrativeText) narrativeText.classList.remove('hidden');
        playVoiceover('audio/intro-voiceover.mp3', "In a world where phones have minds of their own... one device is about to face its worst nightmare... and its funniest!");

        // Wait for the voiceover to finish before proceeding to the next step
        const audio = prankState.currentAudio;
        if (audio) {
            audio.onended = () => {

                // Step 3: Show fake system diagnostics
                hideAllIntroVisuals();
                const diagnostics = document.getElementById('system-diagnostics');
                if (diagnostics) {
                    diagnostics.classList.remove('hidden');
                    diagnostics.innerHTML = "";
                    const nextGlitchText = createNonRepeatingRandomizer(glitchTexts);
                    for (let i = 0; i < 5; i++) {
                        let textTimeout = setTimeout(() => {
                            const p = document.createElement('p');
                            p.className = 'glitch-text';
                            p.textContent = nextGlitchText();
                            diagnostics.appendChild(p);
                        }, i * 500);
                        prankState.introTimeouts.push(textTimeout);
                    }
                }

                // Step 4: Show AR overlay after diagnostics
                setTimeout(() => {
                    hideAllIntroVisuals();
                    const ar = document.getElementById('ar-overlay');
                    if (ar) ar.classList.remove('hidden');
                    playAudio('audio/camera-shutter.mp3');

                    // Step 5: Show Fake Device info after AR overlay
                    setTimeout(() => {
                        hideAllIntroVisuals();
                        const deviceInfo = document.getElementById('device-info');
                        if (deviceInfo) {
                            deviceInfo.classList.remove('hidden');
                            showFakeDeviceInfo(() => {
                                // This callback runs after the video finishes
                                // Proceed to next step here, e.g.:
                                showNextIntroStep();
                            });
                        }
                    }, 3000);
                }, 3000);
            };
        } else {
            // Fallback if audio not available
            setTimeout(() => {
                // Step 3: Show fake system diagnostics
                hideAllIntroVisuals();
                const diagnostics = document.getElementById('system-diagnostics');
                if (diagnostics) {
                    diagnostics.classList.remove('hidden');
                    diagnostics.innerHTML = "";
                    const nextGlitchText = createNonRepeatingRandomizer(glitchTexts);
                    for (let i = 0; i < 5; i++) {
                        let textTimeout = setTimeout(() => {
                            const p = document.createElement('p');
                            p.className = 'glitch-text';
                            p.textContent = nextGlitchText();
                            diagnostics.appendChild(p);
                        }, i * 500);
                        prankState.introTimeouts.push(textTimeout);
                    }
                }

                // Step 4: Show AR overlay after diagnostics
                setTimeout(() => {
                    hideAllIntroVisuals();
                    const ar = document.getElementById('ar-overlay');
                    if (ar) ar.classList.remove('hidden');
                    playAudio('audio/camera-shutter.mp3');

                    // Step 5: Show Fake Device info after AR overlay
                    setTimeout(() => {
                        hideAllIntroVisuals();
                        const deviceInfo = document.getElementById('device-info');
                        if (deviceInfo) {
                            deviceInfo.classList.remove('hidden');
                            showFakeDeviceInfo(() => {
                                // This callback runs after the video finishes
                                // Proceed to next step here, e.g.:
                                showNextIntroStep();
                            });
                        }
                    }, 3000);
                }, 3000);
            }, 4000); // fallback delay
        }
    }, 8000);
    prankState.introTimeouts.push(timeout);
    
    // Show the next intro step: voice challenge prompt and "do not click" container
    function showNextIntroStep() {
        // Voice challenge prompt
        let timeout = setTimeout(() => {
            hideAllIntroVisuals();
            const interactivePrompts = document.getElementById('interactive-prompts');
            if (interactivePrompts) {
                interactivePrompts.classList.remove('hidden');
                const proceedButton = document.querySelector('.prank-button');
                if (proceedButton) {
                    proceedButton.onclick = () => {
                        interactivePrompts.classList.add('hidden');
                        transitionToGlitchSimulation();
                    };
                }
            }
        }, 2000);
        prankState.introTimeouts.push(timeout);

        // Do not click container (if present)
        timeout = setTimeout(() => {
            const doNotClickContainer = document.getElementById('do-not-click-container');
            if (doNotClickContainer) {
                doNotClickContainer.classList.remove('hidden');
                const doNotClickButton = document.getElementById('do-not-click-button');
                if (doNotClickButton) {
                    doNotClickButton.onclick = () => {
                        doNotClickContainer.classList.add('hidden');
                        transitionToGlitchSimulation();
                    };
                }
            }
        }, 4000);
        prankState.introTimeouts.push(timeout);
    }

    prankState.introCompleted = true;
}

// --- GLITCH SIMULATION PHASE ---
function transitionToGlitchSimulation() {
    console.log("Transitioning to glitch simulation...");
    prankState.currentStep = 'glitch';
    
    // Clear any intro timeouts
    if (prankState.introTimeouts) {
        prankState.introTimeouts.forEach(id => clearTimeout(id));
        prankState.introTimeouts = [];
    }
    
    // Hide intro sequence
    const introSeq = document.getElementById('intro-sequence');
    if (introSeq) introSeq.classList.remove('active');
    
    // Show glitch simulation
    const glitchSim = document.getElementById('glitch-simulation');
    if (glitchSim) glitchSim.classList.add('active');
    
    // Clear all overlays first
    clearAllOverlays();
    
    // Start the glitch simulation
    startGlitchSimulation();
}

function showGlitchySequence({textMessages, overlays, onComplete}) {
    // Create non-repeating randomizers for all content types
    const nextErrorMsg = createNonRepeatingRandomizer(errorMessages);
    const nextTaunt = createNonRepeatingRandomizer(taunts);
    const nextWarning = createNonRepeatingRandomizer(warningMessages);
    const nextSound = createNonRepeatingRandomizer(glitchSounds);
    const nextTransition = createNonRepeatingRandomizer(transitions);
    
    // Decide how many rounds of glitchy stuff before video (2-4)
    const rounds = Math.floor(Math.random() * 3);
    let round = 0;
    
    // Clear any existing glitch intervals
    if (prankState.glitchIntervals) {
        prankState.glitchIntervals.forEach(id => clearTimeout(id));
    }
    prankState.glitchIntervals = [];
    
    function doRound() {
        if (round >= rounds) {
            const timeout = setTimeout(onComplete, 500);
            prankState.glitchIntervals.push(timeout);
            return;
        }
        
        // Randomly pick a message type
        const types = ['error', 'taunt', 'warning'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let msg = '';
        if (type === 'error') msg = nextErrorMsg();
        else if (type === 'taunt') msg = nextTaunt();
        else msg = nextWarning();
        
        // Create and show message
        const messageDiv = document.createElement('div');
        messageDiv.className = type + '-message glitch-text';
        messageDiv.textContent = msg;
        textMessages.appendChild(messageDiv);
        
        // Randomly show a visual overlay
        if (overlays && overlays.length > 0 && Math.random() > 0.5) {
            const overlay = overlays[Math.floor(Math.random() * overlays.length)];
            overlay.style.opacity = '1';
            overlay.classList.add(nextTransition());
            
            const timeout = setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.className = 'glitch-overlay';
            }, 1000 + Math.random() * 1000);
            prankState.glitchIntervals.push(timeout);
        }
        
        // Play a random glitch sound (can overlap with text/visual)
        if (Math.random() > 0.3) playAudio(nextSound());
        
        // Remove message after a short time
        const timeout1 = setTimeout(() => {
            if (messageDiv.parentNode) messageDiv.remove();
            round++;
            const timeout2 = setTimeout(doRound, 500 + Math.random() * 700);
            prankState.glitchIntervals.push(timeout2);
        }, 1200 + Math.random() * 800);
        prankState.glitchIntervals.push(timeout1);
    }
    
    doRound();
}

function playVideoThen(videoSrc, nextStep) {
    // Set flag to indicate video is playing
    prankState.videoPlaying = true;
    
    // Clear all overlays/texts
    clearAllOverlays();
    
    // Get the video container
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) {
        console.error("Video container not found!");
        prankState.videoPlaying = false;
        if (nextStep) nextStep();
        return;
    }
    
    // Clear the container
    videoContainer.innerHTML = '';
    
    // Create and configure the video element
    const video = document.createElement('video');
    video.src = videoSrc;
    video.className = 'fullscreen';
    video.autoplay = true;
    video.muted = false;
    video.playsInline = true;
    video.loop = false;  // Ensure no looping
    video.style.objectFit = 'cover';
    video.style.zIndex = '1';
    video.style.pointerEvents = 'none';
    video.volume = 1.0;
    
    // When video ends, clear flag and call next step
    video.onended = () => {
        video.remove(); // Ensure video is removed
        prankState.videoPlaying = false;
        if (nextStep) setTimeout(nextStep, 200);
    };
    
    // Add to container
    videoContainer.appendChild(video);
    
    // Try to play the video with full volume
    const playPromise = video.play();
    if (playPromise) {
        playPromise.then(() => {
            // Play successful
            video.volume = 1.0; // Ensure full volume
        }).catch(e => {
            console.error("Failed to play video:", e);
            prankState.videoPlaying = false;
            video.remove();
            if (nextStep) nextStep();
        });
    }
}

function startGlitchSimulation() {
    console.log("Starting glitch simulation...");
    
    const videoContainer = document.getElementById('video-container');
    const textMessages = document.getElementById('text-messages');
    const overlays = Array.from(document.querySelectorAll('.glitch-overlay'));
    
    if (!videoContainer || !textMessages) {
        console.warn('Missing video or text message container!');
        return;
    }
    
    // Create non-repeating video queue
    const shuffledVideos = shuffle(videoClips.slice());
    
    // Function to play the next glitch block
    function nextGlitchBlock(index = 0) {
        if (index >= shuffledVideos.length) {
            // All videos have been played, transition to troll phase
            setTimeout(() => {
                prankState.glitchSimulationCompleted = true;
                transitionToTrollPhase();
            }, 500);
            return;
        }
        
        // Show glitchy sequence (text/visual/audio) first
        showGlitchySequence({
            textMessages,
            overlays,
            onComplete: () => {
                // Then play video with full volume
                const currentVideo = shuffledVideos[index];
                playVideoThen(currentVideo, () => {
                    // After video ends, go to next glitch block
                    nextGlitchBlock(index + 1);
                });
            }
        });
    }
    
    // Start the first glitch block
    nextGlitchBlock();
}

// --- TROLL PHASE ---
function transitionToTrollPhase() {
    console.log("Transitioning to troll phase...");
    prankState.currentStep = 'troll';
    
    // Clear any glitch intervals
    if (prankState.glitchIntervals) {
        prankState.glitchIntervals.forEach(id => clearTimeout(id));
        prankState.glitchIntervals = [];
    }
    
    // Hide glitch simulation
    const glitchSim = document.getElementById('glitch-simulation');
    if (glitchSim) glitchSim.classList.remove('active');
    
    // Show troll phase
    const trollPhase = document.getElementById('troll-phase');
    if (trollPhase) trollPhase.classList.add('active');
    
    // Clear any overlays
    clearAllOverlays();
    
    // Start the troll phase sequence
    startTrollPhase();
}

function startTrollPhase() {
    // Initialize non-repeating randomizers
    const nextTaunt = createNonRepeatingRandomizer(taunts);
    const nextMascotType = createNonRepeatingRandomizer(mascotTypes);
    const nextGreeting = createNonRepeatingRandomizer(greetings);
    const nextFileType = createNonRepeatingRandomizer(fileTypes);
    const nextFileName = createNonRepeatingRandomizer(fileNames);
    const nextHackerMessage = createNonRepeatingRandomizer(hackerMessages);
    
    // Clear existing troll timeouts
    if (prankState.trollTimeouts) {
        prankState.trollTimeouts.forEach(id => clearTimeout(id));
    }
    prankState.trollTimeouts = [];
    
    // Start with fake data leak
    startFakeDataLeak();
    
    // Then start hacker chat after a delay
    let timeout = setTimeout(() => {
        startHackerChat();
    }, 3000);
    prankState.trollTimeouts.push(timeout);
    
    // Show panic button after a delay
    timeout = setTimeout(() => {
        const panicBtnContainer = document.getElementById('panic-button-container');
        if (panicBtnContainer) panicBtnContainer.classList.remove('hidden');
        
        const panicBtn = document.getElementById('panic-button');
        if (panicBtn) {
            panicBtn.onclick = () => {
                panicBtnContainer.classList.add('hidden');
                
                const btnGameContainer = document.getElementById('button-game-container');
                if (btnGameContainer) btnGameContainer.classList.remove('hidden');
                
                playAudio('audio/too-late.mp3', 'Too late! You pressed the big red button!');
                
                // Add event listeners to game buttons
                const gameButtons = document.querySelectorAll('.game-button');
                gameButtons.forEach(button => {
                    button.onclick = () => {
                        btnGameContainer.classList.add('hidden');
                        playAudio('audio/wrong-button.mp3', 'Wrong button! Data lost forever!');
                        showLoadingBar();
                    };
                });
            };
        }
    }, 6000);
    prankState.trollTimeouts.push(timeout);
    
    // Start countdown to rickroll after a delay
    timeout = setTimeout(() => {
        startCountdown();
    }, 15000);
    prankState.trollTimeouts.push(timeout);
    
    // Function to create fake data leak animation
    function startFakeDataLeak() {
        const dataLeakContainer = document.getElementById('fake-data-leak');
        if (!dataLeakContainer) return;
        
        for (let i = 0; i < 20; i++) {
            let fileTimeout = setTimeout(() => {
                const fakeFile = document.createElement('div');
                fakeFile.className = 'fake-file';
                
                // Random position and movement
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = Math.random() * 100;
                const endY = Math.random() * 100;
                
                fakeFile.style.position = 'absolute';
                fakeFile.style.left = `${startX}%`;
                fakeFile.style.top = `${startY}%`;
                
                // Random content (file name or icon)
                const randomFileName = `${nextFileName()}.${nextFileType()}`;
                fakeFile.textContent = randomFileName;
                
                dataLeakContainer.appendChild(fakeFile);
                
                // Animate movement
                fakeFile.animate([
                    { left: `${startX}%`, top: `${startY}%` },
                    { left: `${endX}%`, top: `${endY}%` }
                ], {
                    duration: 2000,
                    fill: 'forwards'
                });
                
                const removeTimeout = setTimeout(() => {
                    if (fakeFile.parentNode) fakeFile.remove();
                }, 2000);
                prankState.trollTimeouts.push(removeTimeout);
            }, i * 200);
            prankState.trollTimeouts.push(fileTimeout);
        }
        
        const tauntTimeout = setTimeout(() => {
            const taunt = document.createElement('div');
            taunt.className = 'taunt-message';
            taunt.style.position = 'absolute';
            taunt.style.top = '50%';
            taunt.style.left = '50%';
            taunt.style.transform = 'translate(-50%, -50%)';
            taunt.style.fontSize = '24px';
            taunt.textContent = nextTaunt();
            dataLeakContainer.appendChild(taunt);
            
            const removeTauntTimeout = setTimeout(() => {
                if (taunt.parentNode) taunt.remove();
            }, 3000);
            prankState.trollTimeouts.push(removeTauntTimeout);
        }, 1500);
        prankState.trollTimeouts.push(tauntTimeout);
    }
    
    // Function to start hacker chat simulation
    function startHackerChat() {
        const hackerChat = document.getElementById('hacker-chat');
        if (!hackerChat) return;
        
        hackerChat.classList.remove('hidden');
        
        // Use non-repeating hacker messages
        const messages = [];
        for (let i = 0; i < 5; i++) {
            messages.push(nextHackerMessage());
        }
        
        for (let i = 0; i < messages.length; i++) {
            let chatTimeout = setTimeout(() => {
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'typing-indicator';
                typingIndicator.textContent = 'Hacker is typing...';
                hackerChat.appendChild(typingIndicator);
                
                const messageTimeout = setTimeout(() => {
                    if (typingIndicator.parentNode) typingIndicator.remove();
                    
                    const messageElement = document.createElement('div');
                    messageElement.className = 'chat-message hacker-message';
                    messageElement.textContent = messages[i];
                    hackerChat.appendChild(messageElement);
                    
                    hackerChat.scrollTop = hackerChat.scrollHeight;
                    playAudio('audio/typing-sound.mp3');
                }, 1500);
                prankState.trollTimeouts.push(messageTimeout);
            }, i * 3000);
            prankState.trollTimeouts.push(chatTimeout);
        }
    }
    
    // Function to show loading bar
    function showLoadingBar() {
        const loadingBarContainer = document.getElementById('loading-bar-container');
        if (!loadingBarContainer) return;
        
        loadingBarContainer.classList.remove('hidden');
        
        const loadingBarInner = document.querySelector('.loading-bar-inner');
        const loadingText = document.querySelector('.loading-text');
        
        if (!loadingBarInner || !loadingText) return;
        
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += 10;
            loadingBarInner.style.width = `${progress}%`;
            
            if (progress === 50) {
                loadingText.textContent = 'Almost done stealing your Massive phone\'s data...';
            } else if (progress === 90) {
                loadingText.textContent = 'Finalizing data steal by the genetics of a Bihari ...';
            }
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                loadingBarContainer.style.animation = 'glitch-anim 0.3s';
                
                const finalTimeout = setTimeout(() => {
                    progress = 0;
                    loadingBarInner.style.width = '0%';
                    loadingText.textContent = 'Uploading your data...';
                    loadingBarContainer.classList.add('hidden');
                    
                    const voiceChallenge = document.getElementById('voice-challenge');
                    if (voiceChallenge) voiceChallenge.classList.remove('hidden');
                    
                    setupVoiceChallenge();
                }, 1000);
                prankState.trollTimeouts.push(finalTimeout);
            }
        }, 300);
        prankState.loadingInterval = loadingInterval;
    }
    
    // Function to set up voice challenge
    function setupVoiceChallenge() {
        const voiceChallenge = document.getElementById('voice-challenge');
        if (!voiceChallenge) return;
        
        const voiceTimeout1 = setTimeout(() => {
            playAudio('audio/listening-sound.mp3');
            
            const voiceTimeout2 = setTimeout(() => {
                voiceChallenge.classList.add('hidden');
                showVirusMascots();
                playAudio('audio/voice-challenge.mp3', 'Sorry, voice recognition failed... or did it?');
            }, 3000);
            prankState.trollTimeouts.push(voiceTimeout2);
        }, 1000);
        prankState.trollTimeouts.push(voiceTimeout1);
    }
    
    // Function to show virus mascots
    function showVirusMascots() {
        const virusMascotsContainer = document.getElementById('virus-mascots');
        if (!virusMascotsContainer) return;
        
        virusMascotsContainer.classList.remove('hidden');
        virusMascotsContainer.innerHTML = '';
        
        for (let i = 0; i < 5; i++) {
            const mascot = document.createElement('div');
            mascot.className = 'virus-mascot';
            mascot.style.left = `${Math.random() * 80}%`;
            mascot.style.top = `${Math.random() * 80}%`;
            mascot.dataset.type = nextMascotType();
            mascot.style.backgroundColor = '#f00';
            mascot.style.borderRadius = '50%';
            
            const taunt = document.createElement('div');
            taunt.className = 'mascot-taunt';
            taunt.textContent = nextTaunt();
            mascot.appendChild(taunt);
            
            virusMascotsContainer.appendChild(mascot);
        }
    }
}

// Function to start countdown
function startCountdown() {
    // Clear any existing countdown
    if (prankState.countdownInterval) {
        clearInterval(prankState.countdownInterval);
    }
    
    // Hide all other elements
    const elements = [
        'hacker-chat', 'panic-button-container', 'button-game-container',
        'loading-bar-container', 'voice-challenge', 'virus-mascots'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element && !element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
    });
    
    const countdownContainer = document.getElementById('countdown-container');
    if (!countdownContainer) return;
    
    countdownContainer.classList.remove('hidden');
    
    const countdownNumber = document.getElementById('countdown-number');
    if (!countdownNumber) return;
    
    let count = 5; // Shortened countdown
    countdownNumber.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        countdownNumber.textContent = count;
        playAudio('audio/countdown-beepsound.mp3');
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            showRickroll();
        }
    }, 1000);
    
    prankState.countdownInterval = countdownInterval;
}

// Function to show rickroll
function showRickroll() {
    // Clear any troll timeouts and intervals
    if (prankState.trollTimeouts) {
        prankState.trollTimeouts.forEach(id => clearTimeout(id));
    }
    if (prankState.loadingInterval) {
        clearInterval(prankState.loadingInterval);
    }
    
    const countdownContainer = document.getElementById('countdown-container');
    if (countdownContainer) countdownContainer.classList.add('hidden');
    
    const rickrollContainer = document.getElementById('rickroll-container');
    if (!rickrollContainer) return;
    
    rickrollContainer.classList.remove('hidden');
    rickrollContainer.innerHTML = '';
    
    // Play the rickroll video
    const video = document.createElement('video');
    video.className = 'video-style';
    video.width = 320;
    video.height = 240;
    video.autoplay = true;
    video.muted = false;
    video.playsInline = true;
    video.loop = false;
    video.controls = false; // Hide video controls
    video.src = 'video/rickroll.mp4';
    
    rickrollContainer.appendChild(video);
    
    // Set up events for video - store timeouts in the trollTimeouts array
    const timeout = setTimeout(() => {
        if (video.parentNode) video.remove();
        
        const gotchaText = document.createElement('div');
        gotchaText.className = 'gotcha-text';
        gotchaText.textContent = 'GOTCHA!!!!!!!!!';
        rickrollContainer.appendChild(gotchaText);
        
        playAudio('audio/falling-sound.mp3');
        
        // Show greeting text after a delay
        const timeout2 = setTimeout(() => {
            // Using the randomizer function directly without storing it
            const greetingText = document.createElement('div');
            greetingText.className = 'greeting-text';
            greetingText.textContent = createNonRepeatingRandomizer(greetings)();
            rickrollContainer.appendChild(greetingText);
            
            playAudio('audio/victory.mp3');
            
            // Show Spotify text after another delay
            const timeout3 = setTimeout(() => {
                const spotifyText = document.createElement('div');
                spotifyText.className = 'spotify-text';
                spotifyText.textContent = 'Here, listen to some songs to lighten up your mood!';
                rickrollContainer.appendChild(spotifyText);
                
                // Redirect to Spotify after final delay
                const timeout4 = setTimeout(() => {
                    window.location.href = 'https://open.spotify.com/playlist/37i9dQZF1EJsW2JIt2vVd7?si=57fd43c76bdd4f54';
                }, 3000);
                prankState.trollTimeouts.push(timeout4);
            }, 2000);
            prankState.trollTimeouts.push(timeout3);
        }, 2000);
        prankState.trollTimeouts.push(timeout2);
    }, 5000);
    prankState.trollTimeouts.push(timeout);
    
    prankState.trollCompleted = true;
}

// --- INITIALIZATION ---
function initPrank() {
    // Initialize preloader
    initPreloader();
    
    // Set up keyboard navigation for accessibility
    enableKeyboardNav();
    
    // Expose functions to window for debugging and direct access
    window.startIntroSequence = startIntroSequence;
    window.transitionToGlitchSimulation = transitionToGlitchSimulation;
    window.startGlitchSimulation = startGlitchSimulation;
    window.transitionToTrollPhase = transitionToTrollPhase;
    window.showRickroll = showRickroll;
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', initPrank);
