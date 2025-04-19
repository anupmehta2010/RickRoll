// troll.js - Handles the troll phase and rickroll finale

// Function to transition to the troll phase
function transitionToTrollPhase() {
    console.log("Transitioning to troll phase...");
    
    // Hide glitch simulation
    document.getElementById('glitch-simulation').classList.remove('active');
    
    // Show troll phase
    document.getElementById('troll-phase').classList.add('active');
    
    // Start the troll phase sequence
    startTrollPhase();
}

// Function to start the troll phase
function startTrollPhase() {
    // Start with fake data leak animation
    startFakeDataLeak();
    
    // After a few seconds, show hacker chat
    setTimeout(() => {
        startHackerChat();
    }, 3000);
    
    // After a few more seconds, show panic button
    setTimeout(() => {
        document.getElementById('panic-button-container').classList.remove('hidden');
        
        // Add event listener to panic button
        document.getElementById('panic-button').addEventListener('click', () => {
            // Hide panic button
            document.getElementById('panic-button-container').classList.add('hidden');
            
            // Show button game
            document.getElementById('button-game-container').classList.remove('hidden');
            
            // Play sound
            playAudio('audio/panic-button.mp3', 'Too late! You pressed the big red button!');
            
            // Add event listeners to game buttons
            const gameButtons = document.querySelectorAll('.game-button');
            gameButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Hide button game
                    document.getElementById('button-game-container').classList.add('hidden');
                    
                    // Play sound
                    playAudio('audio/wrong-button.mp3', 'Wrong button! Data lost forever!');
                    
                    // Show loading bar
                    showLoadingBar();
                });
            });
        });
    }, 6000);
    
    // After about 15 seconds, start countdown regardless of user interaction
    setTimeout(() => {
        startCountdown();
    }, 15000);
}

// Function to create fake data leak animation
function startFakeDataLeak() {
    const dataLeakContainer = document.getElementById('fake-data-leak');
    
    // Create fake files and icons that "leak" off the screen
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
            
            // Random content (file name or icon)
            const fileTypes = ['jpg', 'png', 'mp4', 'pdf', 'doc'];
            const fileNames = [
                'embarrassing_selfie',
                'secret_meme',
                'party_photo',
                'funny_cat',
                'vacation_pic',
                'screenshot'
            ];
            
            const randomFileName = `${getRandomItem(fileNames)}.${getRandomItem(fileTypes)}`;
            fakeFile.textContent = randomFileName;
            
            // Add to container
            dataLeakContainer.appendChild(fakeFile);
            
            // Animate movement
            fakeFile.animate([
                { left: `${startX}%`, top: `${startY}%` },
                { left: `${endX}%`, top: `${endY}%` }
            ], {
                duration: 2000,
                fill: 'forwards'
            });
            
            // Remove after animation
            setTimeout(() => {
                fakeFile.remove();
            }, 2000);
        }, i * 200);
    }
    
    // Display threatening but humorous taunts
    setTimeout(() => {
        const taunt = document.createElement('div');
        taunt.className = 'taunt-message';
        taunt.style.position = 'absolute';
        taunt.style.top = '50%';
        taunt.style.left = '50%';
        taunt.style.transform = 'translate(-50%, -50%)';
        taunt.style.fontSize = '24px';
        taunt.textContent = getRandomItem(taunts);
        
        dataLeakContainer.appendChild(taunt);
        
        // Remove after a few seconds
        setTimeout(() => {
            taunt.remove();
        }, 3000);
    }, 1500);
}

// Function to start hacker chat simulation
function startHackerChat() {
    const hackerChat = document.getElementById('hacker-chat');
    hackerChat.classList.remove('hidden');
    
    // Hacker messages to display
    const hackerMessages = [
        "Just kidding, I'm watching cat videos.",
        "You're not getting your phone back!",
        "Downloading your embarrassing playlist...",
        "Your memes are... interesting.",
        "I can see all your selfies! 😈"
    ];
    
    // Display messages with typing animation
    hackerMessages.forEach((message, index) => {
        setTimeout(() => {
            // Create typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.textContent = 'Hacker is typing...';
            hackerChat.appendChild(typingIndicator);
            
            // After "typing", show the message
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                // Add message
                const messageElement = document.createElement('div');
                messageElement.className = 'chat-message hacker-message';
                messageElement.textContent = message;
                hackerChat.appendChild(messageElement);
                
                // Scroll to bottom
                hackerChat.scrollTop = hackerChat.scrollHeight;
                
                // Play typing sound
                playAudio('audio/typing.mp3');
            }, 1500);
        }, index * 3000);
    });
}

// Function to show loading bar
function showLoadingBar() {
    const loadingBarContainer = document.getElementById('loading-bar-container');
    loadingBarContainer.classList.remove('hidden');
    
    const loadingBarInner = document.querySelector('.loading-bar-inner');
    const loadingText = document.querySelector('.loading-text');
    
    // Animate loading bar
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 10;
        loadingBarInner.style.width = `${progress}%`;
        
        // Update text
        if (progress === 50) {
            loadingText.textContent = 'Almost done stealing your data...';
        } else if (progress === 90) {
            loadingText.textContent = 'Finalizing hack...';
        }
        
        // When complete, glitch and reset
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Glitch effect
            loadingBarContainer.style.animation = 'glitch-anim 0.3s';
            
            // Reset after a moment
            setTimeout(() => {
                progress = 0;
                loadingBarInner.style.width = '0%';
                loadingText.textContent = 'Uploading your data...';
                
                // Show voice challenge
                loadingBarContainer.classList.add('hidden');
                document.getElementById('voice-challenge').classList.remove('hidden');
                
                // Set up voice recognition (simulated)
                setupVoiceChallenge();
            }, 1000);
        }
    }, 300);
}

// Function to set up voice challenge
function setupVoiceChallenge() {
    const voiceChallenge = document.getElementById('voice-challenge');
    
    // Simulate listening
    setTimeout(() => {
        // Play listening sound
        playAudio('audio/listening.mp3');
        
        // After a moment, respond regardless of input
        setTimeout(() => {
            // Hide voice challenge
            voiceChallenge.classList.add('hidden');
            
            // Show virus mascots
            showVirusMascots();
            
            // Play response
            playAudio('audio/voice-fail.mp3', 'Sorry, voice recognition failed... or did it?');
        }, 3000);
    }, 1000);
}

// Function to show virus mascots
function showVirusMascots() {
    const virusMascotsContainer = document.getElementById('virus-mascots');
    virusMascotsContainer.classList.remove('hidden');
    
    // Create a few virus mascots
    for (let i = 0; i < 5; i++) {
        const mascot = document.createElement('div');
        mascot.className = 'virus-mascot';
        
        // Random position
        mascot.style.left = `${Math.random() * 80}%`;
        mascot.style.top = `${Math.random() * 80}%`;
        
        // Random mascot type
        const mascotTypes = ['ghost', 'skull', 'alien', 'robot', 'clown'];
        const randomType = getRandomItem(mascotTypes);
        mascot.dataset.type = randomType;
        
        // In a real implementation, you would set the background-image to the mascot image
        mascot.style.backgroundColor = '#f00';
        mascot.style.borderRadius = '50%';
        
        // Add taunt text
        const taunt = document.createElement('div');
        taunt.className = 'mascot-taunt';
        taunt.textContent = getRandomItem(taunts);
        mascot.appendChild(taunt);
        
        // Add to container
        virusMascotsContainer.appendChild(mascot);
    }
}

// Function to start countdown
function startCountdown() {
    // Hide any visible elements
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
        if (!element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
    });
    
    // Show countdown
    const countdownContainer = document.getElementById('countdown-container');
    countdownContainer.classList.remove('hidden');
    
    const countdownNumber = document.getElementById('countdown-number');
    
    // Start countdown
    let count = 10;
    countdownNumber.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        countdownNumber.textContent = count;
        
        // Play beep sound
        playAudio('audio/countdown-beep.mp3');
        
        // When countdown reaches 0, show rickroll
        if (count <= 0) {
            clearInterval(countdownInterval);
            showRickroll();
        }
    }, 1000);
}

// Function to show rickroll
function showRickroll() {
    // Hide countdown
    document.getElementById('countdown-container').classList.add('hidden');
    
    // Show rickroll container
    const rickrollContainer = document.getElementById('rickroll-container');
    rickrollContainer.classList.remove('hidden');
    
    // Create video element for rickroll
    const video = document.createElement('video');
    video.width = 320;
    video.height = 240;
    video.autoplay = true;
    
    // In a real implementation, you would set the source to the rickroll video
    video.src = 'video/rickroll.mp4';
    
    // Add to container
    rickrollContainer.appendChild(video);
    
    // After a few seconds, show "GOTCHA!" text
    setTimeout(() => {
        // Remove video
        video.remove();
        
        // Show gotcha text
        const gotchaText = document.createElement('div');
        gotchaText.className = 'gotcha-text';
        gotchaText.textContent = 'GOTCHA!!!!!!!!!';
        rickrollContainer.appendChild(gotchaText);
        
        // Play sound
        playAudio('audio/gotcha.mp3');
        
        // After a moment, show greeting
        setTimeout(() => {
            // Get random festive greeting
            const greetings = [
                'Happy New Year!',
                'Happy Birthday!',
                'Happy Holi!',
                'Happy Diwali!',
                'Jai Ma Durgawali!',
                'Jai Mahakali!',
                'Jai Ho!!!'
            ];
            const randomGreeting = getRandomItem(greetings);
            
            // Show greeting text
            const greetingText = document.createElement('div');
            greetingText.className = 'greeting-text';
            greetingText.textContent = randomGreeting;
            rickrollContainer.appendChild(greetingText);
            
            // Play festive sound
            playAudio('audio/festive.mp3');
            
            // After a moment, show Spotify text
            setTimeout(() => {
                const spotifyText = document.createElement('div');
                spotifyText.className = 'spotify-text';
                spotifyText.textContent = 'Here, listen to some songs to lighten up your mood!';
                rickrollContainer.appendChild(spotifyText);
                
                // Redirect to Spotify after a delay
                setTimeout(() => {
                    // In reality, replace with your Spotify playlist URL
                    window.location.href = 'https://open.spotify.com/playlist/yourid';
                }, 3000);
            }, 2000);
        }, 2000);
    }, 5000);
}

// Function to skip to Spotify
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
        window.location.href = 'https://open.spotify.com/playlist/yourid';
    }, 3000);
}
