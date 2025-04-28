// Main controller script for the prank website

// Global state object to track prank progress
const prankState = {
    currentStep: 'intro',
    introCompleted: false,
    glitchSimulationCompleted: false,
    skipPrank: false,
    randomSeed: (() => {
        const seed = 12345; // Fixed seed for reproducibility
        let value = seed;
        return () => {
            value = (value * 16807) % 2147483647;
            return value;
        };
    })()
};

// Preloader function to hide preloader and start intro sequence
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    startIntroSequence();
    onPreloaderComplete();
}

// Preloader initialization: loads all media files and updates the loader UI
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loaderBar = document.querySelector('.loader-bar-inner');
    const loaderPercentage = document.querySelector('.loader-percentage');

    // List of all media files to preload
    const mediaFiles = [
        // Audio files
        'audio/aaaaahhhh.mp3',
        'audio/beep-sound.mp3',
        'audio/camera-shutter.mp3',
        'audio/comic-boing.mp3',
        'audio/countdown-beepsound.mp3',
        'audio/digital-error.mp3',
        'audio/dramatic-sting.mp3',
        'audio/evil-laugh.mp3',
        'audio/falling-sound.mp3',
        'audio/glitch-beep.mp3',
        'audio/glitch-brokenradio.mp3',
        'audio/intro-sound.mp3',
        'audio/intro-voiceover.mp3',
        'audio/john-cena.mp3',
        'audio/listening-sound.mp3',
        'audio/no-escape.mp3',
        'audio/nice-try.mp3',
        'audio/no-skipping.mp3',
        'audio/silly-giggle.mp3',
        'audio/spooky-sound.mp3',
        'audio/static.mp3',
        'audio/too_late.mp3',
        'audio/typing-sound.mp3',
        'audio/victory.mp3',
        'audio/voice-challenge.mp3',
        'audio/wrong-button.mp3',
        // Video files
        'video/aee-macarena.mp4',
        'video/glitch.mp4',
        'video/glitch2.mp4',
        'video/aeee.mp4',
        'video/glitch-laxman1.mp4',
        'video/horror-comic.mp4',
        'video/idgaf.mp4',
        'video/maire.mp4',
        'video/meme-construct.mp4',
        'video/niga-niga-niga.mp4',
        'video/rickroll.mp4',
        'video/shut-up.mp4',
        'video/time-limit.mp4',
        'video/unbox.mp4',
        // Image files
        'images/1math.jpg',
        'images/2khauf.jpg',
        'images/3not-again.jpg',
        'images/4kya-ree.jpg',
        'images/pixelation.jpg',
        'images/screen-tear.jpg',
        'images/splat.jpg',
        'images/static.jpg',
    ];

    let loadedCount = 0;
    const totalFiles = mediaFiles.length;

    // Function to update loader UI
    function updateLoader() {
        const percentage = Math.round((loadedCount / totalFiles) * 100);
        if (loaderBar) loaderBar.style.width = `${percentage}%`;

        if (loaderPercentage) {
            loaderPercentage.textContent = `${percentage}%`;
        }

        if (loadedCount === totalFiles) {
            // All files loaded, hide preloader and start experience
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s ease';
                preloader.addEventListener('transitionend', hidePreloader, { once: true });
                // Fallback in case transition event doesn't fire
                setTimeout(hidePreloader, 500);
            } else {
                hidePreloader();
            }
        }
    }

    // Preload each file
    mediaFiles.forEach(file => {
        const fileType = file.split('.').pop().toLowerCase();

        if (['mp3', 'wav'].includes(fileType)) {
            const audio = new Audio();
            audio.oncanplaythrough = function() {
                loadedCount++;
                updateLoader();
                this.oncanplaythrough = null;
            };
            audio.onerror = function() {
                console.error(`Failed to load audio: ${file}`);
                loadedCount++;
                updateLoader();
            };
            audio.src = file;
        } else if (['mp4', 'webm'].includes(fileType)) {
            const video = document.createElement('video');
            video.oncanplaythrough = function() {
                loadedCount++;
                updateLoader();
                this.oncanplaythrough = null;
            };
            video.onerror = function() {
                console.error(`Failed to load video: ${file}`);
                loadedCount++;
                updateLoader();
            };
            video.src = file;
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            const img = new Image();
            img.onload = function() {
                loadedCount++;
                updateLoader();
            };
            img.onerror = function() {
                console.error(`Failed to load image: ${file}`);
                loadedCount++;
                updateLoader();
            };
            img.src = file;
        } else {
            // Unknown file type, count as loaded to avoid blocking
            loadedCount++;
            updateLoader();
        }
    });
}

// Play audio with optional speech text fallback
function playAudio(audioSrc, speechText) {
    console.log(`Playing sound: ${audioSrc}`);
    const audio = new Audio(audioSrc);

    audio.onerror = function() {
        console.error(`Failed to load audio: ${audioSrc}`);
        if (speechText) {
            showTextOverlay(speechText);
        }
    };

    audio.play().catch(e => {
        console.log('Audio playback error:', e);
        if (speechText) {
            showTextOverlay(speechText);
        }
    });

    // If speech text is provided and speech synthesis is available
    if (speechText && window.speechSynthesis) {
        const speech = new SpeechSynthesisUtterance(speechText);
        window.speechSynthesis.speak(speech);
    }
}

// Overlay text on screen for a short duration
function showTextOverlay(text) {
    const textOverlay = document.createElement('div');
    textOverlay.className = 'text-overlay';
    textOverlay.textContent = text;
    document.body.appendChild(textOverlay);
    setTimeout(() => {
        textOverlay.remove();
    }, 2000);
}

// Function to verify all media files exist and can be loaded
function verifyMediaFiles() {
    console.log("Verifying media files...");
    const mediaFilesList = document.querySelectorAll('audio, video, img');
    let allFilesValid = true;

    mediaFilesList.forEach(element => {
        const src = element.src || element.currentSrc;
        if (!src) {
            console.warn(`Media element has no source: ${element.outerHTML}`);
            allFilesValid = false;
        } else {
            console.log(`Verified: ${src}`);
        }
    });

    if (allFilesValid) {
        console.log("All media files verified successfully");
    } else {
        console.warn("Some media files could not be verified");
    }

    return allFilesValid;
}

// Accessibility: Announce phase changes
function announce(message) {
    let live = document.getElementById('aria-live');
    if (!live) {
        live = document.createElement('div');
        live.id = 'aria-live';
        live.className = 'visually-hidden';
        live.setAttribute('aria-live', 'polite');
        document.body.appendChild(live);
    }
    live.innerHTML = `${message} <span style="display:none;">${Date.now()}</span>`;
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

// Improved: Keyboard accessibility for buttons
function enableKeyboardNav() {
    document.querySelectorAll('.prank-button, .game-button').forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keyup', e => {
            if (e.key === 'Enter' || e.key === ' ') btn.click();
        });
    });
}

// Function to skip to Spotify (prank end)
function skipToSpotify() {
    // Clear any intervals
    if (prankState.glitchInterval) {
        clearInterval(prankState.glitchInterval);
    }
    
    if (prankState.glitchIntervals) {
        prankState.glitchIntervals.forEach(interval => clearInterval(interval));
    }
    
    // Show skip message
    const skipMessage = document.createElement('div');
    skipMessage.className = 'skip-message fullscreen';
    skipMessage.innerHTML = `
        <div class="skip-content">
            <h2>Alright! Listen to some songs, you piece of ***</h2>
            <p>Redirecting to Spotify...</p>
        </div>
    `;
    document.body.appendChild(skipMessage);
    
    // Play beep sound
    playAudio('audio/beep-sound.mp3');
    
    // Redirect after a delay
    setTimeout(() => {
        // In reality, replace with your Spotify playlist URL
        window.location.href = 'https://open.spotify.com/playlist/37i9dQZF1EJsW2JIt2vVd7?si=57fd43c76bdd4f54';
    }, 3000);
}

// Function to start the intro sequence
function startIntroSequence() {
    console.log("Starting intro sequence...");
    announce("Experience started");
    // Add your intro logic here
    // For example, show the first prank screen or play an intro sound
    playVoiceover('audio/intro-voiceover.mp3', "Welcome to the ultimate prank experience!");
    prankState.introCompleted = true;
}

// Function to trigger more glitches with vibration
function triggerMoreGlitchesWithVibration() {
    triggerMoreGlitches();
    vibrateDevice([200, 100, 200, 100, 200]);
}

// Function to trigger more glitches (visual effect)
function triggerMoreGlitches() {
    console.log("Triggering more glitches");
    
    // Create main glitch overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    glitchOverlay.style.position = 'fixed';
    glitchOverlay.style.top = 0;
    glitchOverlay.style.left = 0;
    glitchOverlay.style.width = '100vw';
    glitchOverlay.style.height = '100vh';
    glitchOverlay.style.pointerEvents = 'none';
    glitchOverlay.style.zIndex = 9999;
    glitchOverlay.style.overflow = 'hidden';
    document.body.appendChild(glitchOverlay);
    
    // Create multiple glitch elements with different effects
    const glitchEffects = [];
    
    // Color shift effect
    const colorShift = document.createElement('div');
    colorShift.style.position = 'absolute';
    colorShift.style.top = 0;
    colorShift.style.left = 0;
    colorShift.style.width = '100%';
    colorShift.style.height = '100%';
    colorShift.style.mixBlendMode = 'difference';
    colorShift.style.background = 'rgba(255,0,100,0.2)';
    glitchOverlay.appendChild(colorShift);
    glitchEffects.push(colorShift);
    
    // Horizontal lines
    const hLines = document.createElement('div');
    hLines.style.position = 'absolute';
    hLines.style.top = 0;
    hLines.style.left = 0;
    hLines.style.width = '100%';
    hLines.style.height = '100%';
    hLines.style.backgroundImage = 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)';
    hLines.style.backgroundSize = '100% 4px';
    hLines.style.opacity = '0.5';
    glitchOverlay.appendChild(hLines);
    glitchEffects.push(hLines);
    
    // Create randomized glitch animations
    const glitchIntervals = [];
    
    // Random shifts
    glitchIntervals.push(setInterval(() => {
        const rand = Math.random();
        colorShift.style.transform = `translate(${(rand * 10) - 5}px, ${(rand * 10) - 5}px)`;
        colorShift.style.opacity = (0.1 + Math.random() * 0.4).toString();
    }, 100));
    
    // Play glitch sound
    playAudio('audio/glitch-beep.mp3');
    
    // Store intervals for cleanup
    prankState.glitchIntervals = prankState.glitchIntervals || [];
    prankState.glitchIntervals.push(...glitchIntervals);
    
    // Remove overlay and clear intervals after delay
    setTimeout(() => {
        glitchIntervals.forEach(interval => clearInterval(interval));
        glitchOverlay.remove();
    }, 2000);
}

// Function to vibrate device if supported
function vibrateDevice(pattern) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

// Function to start a countdown (example)
function startCountdown(seconds = 10, onComplete = null) {
    console.log("Starting countdown");
    announce("Countdown started");
    
    // Create countdown display
    const countdownOverlay = document.createElement('div');
    countdownOverlay.className = 'countdown-overlay';
    countdownOverlay.style.position = 'fixed';
    countdownOverlay.style.top = '0';
    countdownOverlay.style.left = '0';
    countdownOverlay.style.width = '100vw';
    countdownOverlay.style.height = '100vh';
    countdownOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    countdownOverlay.style.display = 'flex';
    countdownOverlay.style.justifyContent = 'center';
    countdownOverlay.style.alignItems = 'center';
    countdownOverlay.style.zIndex = '9999';
    
    const countdownDisplay = document.createElement('div');
    countdownDisplay.className = 'countdown-display';
    countdownDisplay.style.fontSize = '10rem';
    countdownDisplay.style.color = '#fff';
    countdownDisplay.textContent = seconds.toString();
    
    countdownOverlay.appendChild(countdownDisplay);
    document.body.appendChild(countdownOverlay);
    
    // Play countdown start sound
    playAudio('audio/countdown-beepsound.mp3');
    
    // Start countdown timer
    let secondsLeft = seconds;
    const countdownInterval = setInterval(() => {
        secondsLeft--;
        countdownDisplay.textContent = secondsLeft.toString();
        
        // Play beep sound on each second
        if (secondsLeft > 0) {
            playAudio('audio/beep-sound.mp3');
        }
        
        // Handle countdown completion
        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            countdownOverlay.remove();
            
            // Trigger glitch effect
            triggerMoreGlitchesWithVibration();
            
            // Call the completion callback if provided
            if (typeof onComplete === 'function') {
                onComplete();
            }
        }
    }, 1000);
    
    // Store interval for potential cleanup
    prankState.countdownInterval = countdownInterval;
    
    return {
        stop: function() {
            clearInterval(countdownInterval);
            countdownOverlay.remove();
            console.log("Countdown stopped");
        }
    };
}

// Function to set up touch events for mobile
function setupTouchEvents() {
    // Convert swipe gestures to appropriate actions
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, false);

    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const angle = Math.atan2(diffY, diffX) * (180 / Math.PI);

        function isHorizontalSwipe(angle) {
            return Math.abs(angle) < 30 || Math.abs(angle) > 150;
        }

        function isVerticalSwipe(angle) {
            return Math.abs(angle) > 60 && Math.abs(angle) < 120;
        }

        const horizontalSwipe = isHorizontalSwipe(angle);
        const verticalSwipe = isVerticalSwipe(angle);

        if ((horizontalSwipe && Math.abs(diffX) > 50) || (verticalSwipe && Math.abs(diffY) > 50)) {
            triggerMoreGlitchesWithVibration();
            playAudio('audio/swipe-detected.mp3', 'Swipe detected! More glitches activated!');
        }
    }, false);
}

// Call this function after preloader completes
function onPreloaderComplete() {
    setupTouchEvents();
    enableKeyboardNav();
    console.log("Preloader complete, touch events and keyboard nav set up");
}

// DOMContentLoaded event handler to initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, initializing prank...");

    // Set up event listeners for prank buttons
    function safeAddListener(id, event, handler) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener(event, handler);
        } else {
            console.warn(`Element with id "${id}" not found. Event listener for "${event}" was not added.`);
        }
    }

    safeAddListener('do-not-click', 'click', function() {
        prankState.skipPrank = true;
        skipToSpotify();
    });

    safeAddListener('stabilize-btn', 'click', function() {
        playAudio('audio/nice-try.mp3', 'Nice try! You just made it worse!');
        triggerMoreGlitchesWithVibration();
    });

    safeAddListener('escape-btn', 'click', function() {
        playAudio('audio/no-escape.mp3', 'There is no escape from the fun!');
        triggerMoreGlitchesWithVibration();
    });

    safeAddListener('fake-skip', 'click', function() {
        playAudio('audio/no-skipping.mp3', 'No skipping allowed! Face your fears... and your laughs!');
        triggerMoreGlitchesWithVibration();
    });

    // Start preloader instead of directly starting intro sequence
    initPreloader();
});

// Expose for debugging
window.prankState = prankState;
window.verifyMediaFiles = verifyMediaFiles;