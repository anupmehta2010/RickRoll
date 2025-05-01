// troll.js - Handles the troll phase and rickroll finale



// Taunts for fake data leak and mascots (non-repeating)
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
const nextTaunt = createNonRepeatingRandomizer(taunts);

// Mascot types (non-repeating)
const mascotTypes = ['ghost', 'skull', 'alien', 'robot', 'clown'];
const nextMascotType = createNonRepeatingRandomizer(mascotTypes);

// Greetings (non-repeating)
const greetings = [
    'Happy New Year!',
    'Happy Birthday!',
    'Happy Holi!',
    'Happy Diwali!',
    'Jai Ma Durgawali!',
    'Jai Mahakali!',
    'Jai Ho!!!'
];
const nextGreeting = createNonRepeatingRandomizer(greetings);

// File types and names for fake data leak (non-repeating)
const fileTypes = ['jpg', 'png', 'mp4', 'pdf', 'doc'];
const nextFileType = createNonRepeatingRandomizer(fileTypes);
const fileNames = [
    'images/1math.jpg',
    'images/2khauf.jpg',
    'images/3not-again.jpg',
    'images/4kya-ree.jpg',
];
const nextFileName = createNonRepeatingRandomizer(fileNames);

// Hacker messages (non-repeating)
const hackerMessages = [
    "Just kidding, I'm watching cat videos.",
    "You're not getting your phone back!",
    "Downloading your embarrassing playlist...",
    "Your memes are... interesting.",
    "I can see all your selfies! 😈"
];
const nextHackerMessage = createNonRepeatingRandomizer(hackerMessages);

// Function to transition to the troll phase
function transitionToTrollPhase() {
    console.log("Transitioning to troll phase...");

    // Hide glitch simulation
    const glitchSim = document.getElementById('glitch-simulation');
    if (glitchSim) glitchSim.classList.remove('active');

    // Show troll phase
    const trollPhase = document.getElementById('troll-phase');
    if (trollPhase) trollPhase.classList.add('active');

    // Start the troll phase sequence
    startTrollPhase();
}

// Function to start the troll phase
function startTrollPhase() {
    startFakeDataLeak();

    setTimeout(() => {
        startHackerChat();
    }, 3000);

    setTimeout(() => {
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

    setTimeout(() => {
        startCountdown();
    }, 10000);
}

// Function to create fake data leak animation
function startFakeDataLeak() {
    const dataLeakContainer = document.getElementById('fake-data-leak');
    if (!dataLeakContainer) return;

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
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

            // Random content (file name or icon, non-repeating)
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

            setTimeout(() => {
                fakeFile.remove();
            }, 2000);
        }, i * 200);
    }

    setTimeout(() => {
        const taunt = document.createElement('div');
        taunt.className = 'taunt-message';
        taunt.style.position = 'absolute';
        taunt.style.top = '50%';
        taunt.style.left = '50%';
        taunt.style.transform = 'translate(-50%, -50%)';
        taunt.style.fontSize = '24px';
        taunt.textContent = nextTaunt();

        dataLeakContainer.appendChild(taunt);

        setTimeout(() => {
            taunt.remove();
        }, 3000);
    }, 1500);
}

// Function to start hacker chat simulation
function startHackerChat() {
    const hackerChat = document.getElementById('hacker-chat');
    if (!hackerChat) return;
    hackerChat.classList.remove('hidden');

    for (let i = 0; i < hackerMessages.length; i++) {
        setTimeout(() => {
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.textContent = 'Hacker is typing...';
            hackerChat.appendChild(typingIndicator);

            setTimeout(() => {
                typingIndicator.remove();
                const messageElement = document.createElement('div');
                messageElement.className = 'chat-message hacker-message';
                messageElement.textContent = nextHackerMessage();
                hackerChat.appendChild(messageElement);
                hackerChat.scrollTop = hackerChat.scrollHeight;
                playAudio('audio/typing-sound.mp3');
            }, 1500);
        }, i * 3000);
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

            setTimeout(() => {
                progress = 0;
                loadingBarInner.style.width = '0%';
                loadingText.textContent = 'Uploading your data...';
                loadingBarContainer.classList.add('hidden');
                const voiceChallenge = document.getElementById('voice-challenge');
                if (voiceChallenge) voiceChallenge.classList.remove('hidden');
                setupVoiceChallenge();
            }, 1000);
        }
    }, 300);
}

// Function to set up voice challenge
function setupVoiceChallenge() {
    const voiceChallenge = document.getElementById('voice-challenge');
    if (!voiceChallenge) return;

    setTimeout(() => {
        playAudio('audio/listening-sound.mp3');
        setTimeout(() => {
            voiceChallenge.classList.add('hidden');
            showVirusMascots();
            playAudio('audio/voice-challenge.mp3', 'Sorry, voice recognition failed... or did it?');
        }, 3000);
    }, 1000);
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

// Function to start countdown
function startCountdown() {
    const elements = [
        'hacker-chat',
        'panic-button-container',
        'button-game-container',
        'loading-bar-container',
        'voice-challenge',
        'virus-mascots'
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

    let count = 10;
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
}

// Function to show rickroll
function showRickroll() {
    const countdownContainer = document.getElementById('countdown-container');
    if (countdownContainer) countdownContainer.classList.add('hidden');

    const rickrollContainer = document.getElementById('rickroll-container');
    if (!rickrollContainer) return;
    rickrollContainer.classList.remove('hidden');
    rickrollContainer.innerHTML = '';

    const video = document.createElement('video');
    video.width = 320;
    video.height = 240;
    video.autoplay = true;
    video.src = 'video/rickroll.mp4';
    rickrollContainer.appendChild(video);

    setTimeout(() => {
        video.remove();
        const gotchaText = document.createElement('div');
        gotchaText.className = 'gotcha-text';
        gotchaText.textContent = 'GOTCHA!!!!!!!!!';
        rickrollContainer.appendChild(gotchaText);
        playAudio('audio/falling-sound.mp3');

        setTimeout(() => {
            const greetingText = document.createElement('div');
            greetingText.className = 'greeting-text';
            greetingText.textContent = nextGreeting();
            rickrollContainer.appendChild(greetingText);
            playAudio('audio/victory.mp3');

            setTimeout(() => {
                const spotifyText = document.createElement('div');
                spotifyText.className = 'spotify-text';
                spotifyText.textContent = 'Here, listen to some songs to lighten up your mood!';
                rickrollContainer.appendChild(spotifyText);

                setTimeout(() => {
                    window.location.href = 'https://open.spotify.com/playlist/37i9dQZF1EJsW2JIt2vVd7?si=57fd43c76bdd4f54';
                }, 3000);
            }, 2000);
        }, 2000);
    }, 5000);
}

// Function to skip to Spotify
function skipToSpotify() {
    if (window.prankState && prankState.glitchInterval) {
        clearInterval(prankState.glitchInterval);
    }
    if (window.prankState && prankState.glitchIntervals) {
        prankState.glitchIntervals.forEach(interval => clearInterval(interval));
    }

    const skipMessage = document.createElement('div');
    skipMessage.className = 'skip-message fullscreen';
    skipMessage.innerHTML = `
        <div class="skip-content">
            <h2>Alright! Listen to some songs, you piece of ***</h2>
            <p>Redirecting to Spotify...</p>
        </div>
    `;
    document.body.appendChild(skipMessage);

    playAudio('audio/beep-sound.mp3');

    setTimeout(() => {
        window.location.href = 'https://open.spotify.com/playlist/37i9dQZF1EJsW2JIt2vVd7?si=57fd43c76bdd4f54';
    }, 3000);
}

// Dummy playAudio if not defined
if (typeof playAudio !== 'function') {
    function playAudio(src, txt) { console.log(`(Simulated) Playing audio: ${src} ${txt ? '| ' + txt : ''}`); }
}

// Expose for debugging
window.transitionToTrollPhase = transitionToTrollPhase;
window.skipToSpotify = skipToSpotify;