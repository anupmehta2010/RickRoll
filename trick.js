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


// Add to main.js
// Preloader function
function hidePreloader() {
    preloader.style.display = 'none';
    startIntroSequence();
}

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
    
    // Function to update loader
    function updateLoader() {
        const percentage = Math.round((loadedCount / totalFiles) * 100);
        loaderBar.style.width = `${percentage}%`;
        
        // Update percentage text
        if (loaderPercentage) {
            loaderPercentage.textContent = `${percentage}%`;
        }
        
        if (loadedCount === totalFiles) {
            // All files loaded, hide preloader and start experience
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.addEventListener('transitionend', hidePreloader, { once: true });
            
            // Fallback in case transition event doesn't fire
            setTimeout(hidePreloader, 500);
        }
    }
    
    
    // Preload each file
    mediaFiles.forEach(file => {
        const fileType = file.split('.').pop();
        
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
        }
    });
}


function playAudio(audioSrc, speechText) {
    console.log(`Playing sound: ${audioSrc}`);
    const audio = new Audio(audioSrc);
    
    // Add error handling
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

// Modify the DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, initializing hack...");
    
    // Set up event listeners
    const safeAddListener = (id, event, handler) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener(event, handler);
        } else {
            console.warn(`Element with id "${id}" not found. Event listener for "${event}" was not added.`);
        }
    };
    
    safeAddListener('do-not-click', 'click', function() {
        prankState.skipPrank = true;
        skipToSpotify();
    });
    
    safeAddListener('stabilize-btn', 'click', function() {
        triggerMoreGlitchesWithVibration();
        playAudio('audio/nice-try.mp3', 'Nice try! You just made it worse!');
    });
    
    safeAddListener('escape-btn', 'click', function() {
        triggerMoreGlitchesWithVibration();
        playAudio('audio/no-escape.mp3', 'There is no escape from the fun!');
    });
    
    safeAddListener('fake-skip', 'click', function() {
        playAudio('audio/no-skipping.mp3', 'No skipping allowed! Face your fears... and your laughs!');
    });
    
    // Start preloader instead of directly starting intro sequence
initPreloader();
});

// Function to add touch events for mobile
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
            playAudio('RickRoll/audio/swipe-detected.mp3', 'Swipe detected! More glitches activated!');
        }
    }, false);
    
    // Add vibration for certain events if supported
        const canVibrate = 'vibrate' in navigator;
        const vibrateDevice = (pattern) => {
            if (canVibrate) {
                navigator.vibrate(pattern);
            }
        };
    
        // Define missing functions
        function triggerMoreGlitches() {
            console.log("Triggering more glitches");
            // Add actual glitch effect implementation here
            const glitchOverlay = document.createElement('div');
            glitchOverlay.className = 'glitch-overlay';
            document.body.appendChild(glitchOverlay);
            setTimeout(() => {
                glitchOverlay.remove();
            }, 2000);
        }
        
        function startCountdown() {
            console.log("Starting countdown");
            // Add actual countdown implementation here
            announce("Countdown started");
        }
        
        // Wrap triggerMoreGlitches to add vibration
        const triggerMoreGlitchesWithVibration = () => {
            triggerMoreGlitches();
            if (typeof startCountdown === 'function') {
                // Save the original startCountdown function
                const originalStartCountdown = startCountdown;

                // Wrap startCountdown to include vibration functionality
                const wrappedStartCountdown = function() {
                    originalStartCountdown();
                    vibrateDevice([200, 100, 200, 100, 200]);
                };

                // Replace all calls to startCountdown with wrappedStartCountdown
                // Ensure that wrappedStartCountdown is used wherever startCountdown is invoked
                // Example: Dispatch the 'startCountdownEvent' to trigger wrappedStartCountdown
                document.addEventListener('startCountdownEvent', wrappedStartCountdown);

        // Example usage: Dispatch the event after preloader completes
        setTimeout(() => {
            document.dispatchEvent(new Event('startCountdownEvent'));
        }, 1000);
        
// Add missing functions
function verifyMediaFiles() {
    console.log("Verifying media files...");
    // Implementation for media verification
}

function skipToSpotify() {
    console.log("Skipping to Spotify...");
    // Implementation for skipping to Spotify
}

function startIntroSequence() {
    console.log("Starting intro sequence...");
    // Implementation for intro sequence
    announce("Experience started");
}

// Call this function after preloader completes
function onPreloaderComplete() {
    setupTouchEvents();
    console.log("Preloader complete, touch events set up");
}

// Update initPreloader function to call onPreloaderComplete when done
// This should be called in the preloader completion callback1000);
            } else {
                console.warn('startCountdown is not defined. Skipping wrapping.');
            }
        };
    
        // Use wrappedStartCountdown wherever startCountdown is called
        const wrappedStartCountdown = function() {
            if (typeof startCountdown === 'function') {
                startCountdown();
                vibrateDevice([200, 100, 200, 100, 200]);
            }
        };
        document.addEventListener('startCountdownEvent', wrappedStartCountdown);
    }

// Call this function after preloader completes
// Add to the end of initPreloader function:
setupTouchEvents();