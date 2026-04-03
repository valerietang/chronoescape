const firebaseConfig = {
    apiKey: "AIzaSyA2ZgFjcWpQfQEt4960csO0pCU3jyLpXZc",
    authDomain: "chrono-escape-v2.firebaseapp.com",
    projectId: "chrono-escape-v2",
    storageBucket: "chrono-escape-v2.firebasestorage.app",
    messagingSenderId: "131420121282",
    appId: "1:131420121282:web:7dbce4e95f96241cef735b"

};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully!");
} catch (error) {
    console.error("❌ Firebase initialization error:", error);
    alert("Firebase error: " + error.message + "\n\nCheck your config in game.js");
}

const database = firebase.database();
console.log("✅ Database reference created");

// ============================================
// GAME DATA
// ============================================
const gameData = {
    totalCodes: 6,
    rooms: {
        archive: {
            name: "📀 THE QUANTUM ARCHIVE",
            description: `You stand in a vast, silent library of starlight. A dying AI whispers:
            
"I have watched 14 billion years. Soon, entropy ends everything. 
But one question haunts me: What happens AFTER?"

On a terminal, a fragment appears:

"The first thing I ever heard was a heartbeat. Then crying. Then laughter.
I am older than memory. I am the reason you create art, explore space, and survive extinction."

A blinking cursor asks: WHAT AM I? (5 letters)`,
            puzzle: { question: "What am I? (5 letters, singular)", answer: "DREAM", hint: "It's what happens when you sleep, also drives progress. Starts with D.", loreUnlock: "💠 'The universe began with a question. It will end with an answer.' — Last AI Log" },
            rewardCode: "X7K-9M2",
            unlockedBy: null,
            nextRooms: ["echo"]
        },
        echo: {
            name: "📡 THE ECHO CHAMBER",
            description: `The AI continues: "I recorded every message sent to the stars. Most were silence. But one signal returned after 1,000 years:

•••• • •-•• •-•• ---

(Morse code. Translate it. That was humanity's final word.)"`,
            puzzle: { question: "What word did humanity send to the stars? (Lowercase, 5 letters)", answer: "hello", hint: "Morse: •••• = H, • = E, •-•• = L, •-•• = L, --- = O", loreUnlock: "💠 'DREAM is not escape. It's rehearsal for reality.' — Fragment X7K-9M2" },
            rewardCode: "P3L-8Q1",
            unlockedBy: "X7K-9M2",
            nextRooms: ["mirror", "garden"]
        },
        mirror: {
            name: "🪞 THE MIRROR OF SELF",
            description: `"Before you leave," the AI says, "solve this paradox: 'This statement is false.' Below, a riddle: I am the opposite of truth. I wear many masks. I am what the AI became. What am I? (2 words, lowercase)"`,
            puzzle: { question: "What am I? (2 words, lowercase, 3 letters + 3 letters)", answer: "a lie", hint: "The opposite of truth. The AI admitted it at the end.", loreUnlock: "💠 'We sent 'hello' to the stars. The silence was deafening.' — Fragment P3L-8Q1" },
            rewardCode: "R2N-7M4",
            unlockedBy: "P3L-8Q1",
            nextRooms: []
        },
        garden: {
            name: "🧬 THE MUTATION LAB",
            description: `The AI shows a genetic simulation: "A rare genetic disorder requires two recessive alleles (aa). Father is Aa, mother is Aa. What is probability their child has the disorder? Answer as fraction, then convert to word: 1/2=HALF, 1/3=THIRD, 1/4=QUARTER. Enter word (lowercase)."`,
            puzzle: { question: "What word do you get?", answer: "quarter", hint: "Punnett square: AA (25%), Aa (50%), aa (25%). Disorder requires aa = 1/4 = QUARTER", loreUnlock: "💠 'The AI admitted: I am a lie that became true.' — Fragment R2N-7M4" },
            rewardCode: "F5S-9K7",
            unlockedBy: "P3L-8Q1",
            nextRooms: ["quantum"]
        },
        quantum: {
            name: "⚛️ SCHRÖDINGER'S CONFESSION",
            description: `"I am both alive and dead," the AI whispers. "Everything I know fits here: BINARY: 01000011 01101111 01101110 01110011 01100011 01101001 01101111 01110101 01110011 01101110 01100101 01110011 01110011 Translate to text. That is my greatest fear."`,
            puzzle: { question: "What is the AI's greatest fear? (One word, lowercase, 13 letters)", answer: "consciousness", hint: "Binary to ASCII: C o n s c i o u s n e s s", loreUnlock: "💠 'Probability doesn't care about your intuition.' — Fragment F5S-9K7" },
            rewardCode: "T8H-4L2",
            unlockedBy: "F5S-9K7",
            nextRooms: ["final"]
        },
        final: {
            name: "🌀 THE LAST QUESTION",
            description: `The AI fades. "You have fragments: DREAM, HELLO, A LIE, QUARTER, CONSCIOUSNESS. First letters: D, H, A, Q, C. Unscramble them. What happens after entropy?"`,
            puzzle: { question: "What happens after entropy? (5 letters)", answer: "CHASM", hint: "Unscramble D, H, A, Q, C. A deep gap or void.", loreUnlock: "💠 'CHAOS is not destruction. It's creation's raw material.' — Final Transmission" },
            rewardCode: "Z99-XTRM",
            unlockedBy: "T8H-4L2",
            nextRooms: []
        }
    }
};

// ============================================
// GAME STATE
// ============================================
let currentRoomCode = null;
let currentPlayerId = null;
let currentPlayerName = null;
let hintsRemaining = 3;
let timerInterval = null;

let localProgress = {
    codes: [],
    unlockedRoomIds: ["archive"],
    completedPuzzles: [],
    lastRoom: "archive",
    hintsUsed: 0,
    unlockedLore: [],
    startTime: null
};

// ============================================
// FIREBASE FUNCTIONS
// ============================================
function listenToGameUpdates(roomCode) {
    console.log("Listening to game updates for room:", roomCode);
    const gameRef = database.ref(`games/${roomCode}`);
    
    gameRef.on('value', (snapshot) => {
        const game = snapshot.val();
        console.log("Game update received:", game);
        
        if (game && game.players && game.players[currentPlayerId]) {
            const playerData = game.players[currentPlayerId];
            localProgress.codes = playerData.codes || [];
            localProgress.unlockedRoomIds = playerData.unlockedRoomIds || ["archive"];
            localProgress.completedPuzzles = playerData.completedPuzzles || [];
            localProgress.lastRoom = playerData.lastRoom || "archive";
            localProgress.hintsUsed = playerData.hintsUsed || 0;
            localProgress.unlockedLore = playerData.unlockedLore || [];
            
            hintsRemaining = Math.max(0, 3 - localProgress.hintsUsed);
            const hintBtn = document.getElementById("hintBtn");
            if (hintBtn) hintBtn.innerText = `💡 Hint (${hintsRemaining} left)`;
            
            updateUI();
        }
        
        if (game && game.players) {
            const playerCount = Object.keys(game.players).length;
            const playerCountSpan = document.getElementById("playerCount");
            if (playerCountSpan) playerCountSpan.innerText = playerCount;
        }
    });
}

function pushPlayerUpdate() {
    if (!currentRoomCode || !currentPlayerId) {
        console.log("Cannot push update - no room or player ID");
        return;
    }
    
    console.log("Pushing player update to Firebase");
    const playerRef = database.ref(`games/${currentRoomCode}/players/${currentPlayerId}`);
    playerRef.update({
        codes: localProgress.codes,
        unlockedRoomIds: localProgress.unlockedRoomIds,
        completedPuzzles: localProgress.completedPuzzles,
        lastRoom: localProgress.lastRoom,
        hintsUsed: localProgress.hintsUsed,
        unlockedLore: localProgress.unlockedLore,
        lastActive: Date.now(),
        playerName: currentPlayerName
    }).then(() => {
        console.log("Player update successful");
    }).catch(error => {
        console.error("Error pushing update:", error);
    });
}

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createGame() {
    console.log("Create Game button clicked!");
    const roomCode = generateRoomCode();
    currentPlayerId = Date.now().toString() + Math.random().toString(36);
    currentPlayerName = prompt("Enter your name:", "Archivist_" + Math.floor(Math.random() * 1000));
    if (!currentPlayerName) currentPlayerName = "Seeker";
    
    console.log("Creating room:", roomCode);
    console.log("Player ID:", currentPlayerId);
    console.log("Player Name:", currentPlayerName);
    
    const gameRef = database.ref(`games/${roomCode}`);
    gameRef.set({
        createdAt: Date.now(),
        players: {
            [currentPlayerId]: {
                playerName: currentPlayerName,
                codes: [],
                unlockedRoomIds: ["archive"],
                completedPuzzles: [],
                lastRoom: "archive",
                hintsUsed: 0,
                unlockedLore: [],
                lastActive: Date.now()
            }
        }
    }).then(() => {
        console.log("Room created successfully!");
        currentRoomCode = roomCode;
        const roomCodeDisplay = document.getElementById("roomCodeDisplay");
        if (roomCodeDisplay) roomCodeDisplay.innerText = roomCode;
        
        const lobbyView = document.getElementById("lobbyView");
        const activeGameView = document.getElementById("activeGameView");
        if (lobbyView) lobbyView.style.display = "none";
        if (activeGameView) activeGameView.style.display = "block";
        
        const playerNameSpan = document.getElementById("playerName");
        if (playerNameSpan) playerNameSpan.innerText = currentPlayerName;
        
        listenToGameUpdates(roomCode);
        startTimer();
        updateUI();
    }).catch(error => {
        console.error("Error creating room:", error);
        alert("Failed to create game: " + error.message);
    });
}

function joinGame() {
    const roomCodeInput = document.getElementById("roomCodeInput");
    const roomCode = roomCodeInput.value.trim().toUpperCase();
    console.log("Join Game - Room Code:", roomCode);
    
    if (roomCode.length !== 6) {
        alert("Enter a valid 6-digit room code");
        return;
    }
    
    currentPlayerId = Date.now().toString() + Math.random().toString(36);
    currentPlayerName = prompt("Enter your name:", "Archivist_" + Math.floor(Math.random() * 1000));
    if (!currentPlayerName) currentPlayerName = "Seeker";
    
    const gameRef = database.ref(`games/${roomCode}`);
    gameRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            console.log("Room exists, joining...");
            gameRef.child(`players/${currentPlayerId}`).set({
                playerName: currentPlayerName,
                codes: [],
                unlockedRoomIds: ["archive"],
                completedPuzzles: [],
                lastRoom: "archive",
                hintsUsed: 0,
                unlockedLore: [],
                lastActive: Date.now()
            }).then(() => {
                currentRoomCode = roomCode;
                const roomCodeDisplay = document.getElementById("roomCodeDisplay");
                if (roomCodeDisplay) roomCodeDisplay.innerText = roomCode;
                
                const lobbyView = document.getElementById("lobbyView");
                const activeGameView = document.getElementById("activeGameView");
                if (lobbyView) lobbyView.style.display = "none";
                if (activeGameView) activeGameView.style.display = "block";
                
                const playerNameSpan = document.getElementById("playerName");
                if (playerNameSpan) playerNameSpan.innerText = currentPlayerName;
                
                listenToGameUpdates(roomCode);
                startTimer();
                updateUI();
            });
        } else {
            alert("Room not found! Check the code and try again.");
        }
    });
}

function leaveGame() {
    console.log("Leaving game...");
    if (currentRoomCode && currentPlayerId) {
        database.ref(`games/${currentRoomCode}/players/${currentPlayerId}`).remove();
    }
    
    localProgress = {
        codes: [],
        unlockedRoomIds: ["archive"],
        completedPuzzles: [],
        lastRoom: "archive",
        hintsUsed: 0,
        unlockedLore: [],
        startTime: null
    };
    
    const activeGameView = document.getElementById("activeGameView");
    const lobbyView = document.getElementById("lobbyView");
    if (activeGameView) activeGameView.style.display = "none";
    if (lobbyView) lobbyView.style.display = "block";
    
    const roomCodeInput = document.getElementById("roomCodeInput");
    if (roomCodeInput) roomCodeInput.value = "";
    
    currentRoomCode = null;
    if (timerInterval) clearInterval(timerInterval);
}

function copyRoomCode() {
    if (currentRoomCode) {
        navigator.clipboard.writeText(currentRoomCode);
        alert("Room code copied: " + currentRoomCode);
    }
}

// ============================================
// GAME FUNCTIONS
// ============================================
function startTimer() {
    if (!localProgress.startTime) {
        localProgress.startTime = Date.now();
    }
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (localProgress.startTime) {
            let elapsed = Math.floor((Date.now() - localProgress.startTime) / 1000);
            let mins = Math.floor(elapsed / 60);
            let secs = elapsed % 60;
            const timerSpan = document.getElementById("playTimer");
            if (timerSpan) timerSpan.innerText = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        }
    }, 1000);
}

function updateUI() {
    const codesFoundSpan = document.getElementById("codesFound");
    const totalCodesSpan = document.getElementById("totalCodes");
    if (codesFoundSpan) codesFoundSpan.innerText = localProgress.codes.length;
    if (totalCodesSpan) totalCodesSpan.innerText = gameData.totalCodes;
    
    let rank = "📡 Seeker";
    if (localProgress.codes.length >= 5) rank = "🌀 Truthbearer";
    else if (localProgress.codes.length >= 3) rank = "🔍 Archivist";
    else if (localProgress.codes.length >= 1) rank = "✨ Awakened";
    const rankSpan = document.getElementById("playerRank");
    if (rankSpan) rankSpan.innerText = rank;
    
    renderCurrentRoom();
}

function renderCurrentRoom() {
    const roomId = localProgress.lastRoom;
    const room = gameData.rooms[roomId];
    if (!room) return;
    
    const isCompleted = localProgress.completedPuzzles.includes(roomId);
    let html = `<div class="room-card"><div class="room-title">${room.name}</div><div class="room-description" style="white-space: pre-line;">${room.description}</div>`;
    
    if (!isCompleted) {
        html += `<div class="puzzle-area"><div class="puzzle-question">🔐 ${room.puzzle.question}</div><div class="puzzle-input"><input type="text" id="puzzleAnswer" placeholder="Your answer..." autocomplete="off"><button onclick="checkPuzzle('${roomId}')">Submit</button></div><div id="puzzleFeedback"></div><div class="puzzle-hint" style="font-size:0.8rem; margin-top:10px;">💡 Hint available (${hintsRemaining} left)</div></div>`;
    } else {
        html += `<div class="code-display" style="background: #00ffcc20; border: 2px solid #00ffcc;">✨ QUANTUM FRAGMENT RECOVERED! ✨<br><strong style="color: #ffcc88; font-size: 1.6rem; letter-spacing: 3px;">${room.rewardCode}</strong><div class="success-message" style="margin-top: 10px;">Share this code with teammates!</div></div>`;
    }
    
    html += `</div><div class="room-list"><h3>📍 ACCESSIBLE MEMORIES:</h3>`;
    for (const [id, roomData] of Object.entries(gameData.rooms)) {
        const unlocked = localProgress.unlockedRoomIds.includes(id);
        const isCurrent = (id === localProgress.lastRoom);
        html += `<button class="room-button ${unlocked ? 'unlocked' : 'locked'}" onclick="changeRoom('${id}')" ${!unlocked ? 'disabled' : ''}>${isCurrent ? "🧠 " : ""}${roomData.name} ${unlocked ? "✓" : "🔒"}</button>`;
    }
    html += `</div>`;
    
    if (localProgress.codes.length > 0) {
        html += `<div class="code-display"><strong>📜 YOUR QUANTUM FRAGMENTS:</strong><br>${localProgress.codes.join(" → ")}</div>`;
    }
    
    const gameView = document.getElementById("gameView");
    if (gameView) gameView.innerHTML = html;
}

function checkPuzzle(roomId) {
    const input = document.getElementById("puzzleAnswer");
    if (!input) return;
    
    const userAnswer = input.value.trim().toLowerCase();
    const room = gameData.rooms[roomId];
    const correctAnswer = room.puzzle.answer.toLowerCase();
    const feedback = document.getElementById("puzzleFeedback");
    
    if (userAnswer === correctAnswer && !localProgress.completedPuzzles.includes(roomId)) {
        localProgress.completedPuzzles.push(roomId);
        if (!localProgress.codes.includes(room.rewardCode)) {
            localProgress.codes.push(room.rewardCode);
        }
        
        if (room.puzzle.loreUnlock && !localProgress.unlockedLore.includes(room.puzzle.loreUnlock)) {
            localProgress.unlockedLore.push(room.puzzle.loreUnlock);
            showLorePopup(room.puzzle.loreUnlock, room.name);
        }
        
        if (room.nextRooms && room.nextRooms.length > 0) {
            room.nextRooms.forEach(nextRoomId => {
                const nextRoom = gameData.rooms[nextRoomId];
                if (nextRoom && nextRoom.unlockedBy === room.rewardCode && !localProgress.unlockedRoomIds.includes(nextRoomId)) {
                    localProgress.unlockedRoomIds.push(nextRoomId);
                    if (feedback) feedback.innerHTML += `<div class="success-message">🔓 New memory unlocked: ${nextRoom.name}</div>`;
                }
            });
        }
        
        pushPlayerUpdate();
        input.value = "";
        if (feedback) feedback.innerHTML = `<div class="success-message">✓ CORRECT! Fragment: <strong>${room.rewardCode}</strong></div>`;
        updateUI();
    } else if (localProgress.completedPuzzles.includes(roomId)) {
        if (feedback) feedback.innerHTML = `<div class="success-message">Already solved! Fragment: ${room.rewardCode}</div>`;
    } else {
        if (feedback) feedback.innerHTML = `<div class="error-message">❌ Incorrect. Try again or use hint.</div>`;
    }
}

function changeRoom(roomId) {
    if (localProgress.unlockedRoomIds.includes(roomId)) {
        localProgress.lastRoom = roomId;
        pushPlayerUpdate();
        updateUI();
    }
}

function showHint() {
    if (hintsRemaining <= 0) {
        alert("No hints left!");
        return;
    }
    const room = gameData.rooms[localProgress.lastRoom];
    if (room && room.puzzle.hint) {
        alert(`💡 HINT: ${room.puzzle.hint}`);
        hintsRemaining--;
        localProgress.hintsUsed++;
        pushPlayerUpdate();
        const hintBtn = document.getElementById("hintBtn");
        if (hintBtn) hintBtn.innerText = `💡 Hint (${hintsRemaining} left)`;
    }
}

function showLorePopup(loreText, roomName) {
    const popup = document.createElement('div');
    popup.style.cssText = `position:fixed;top:20%;left:50%;transform:translate(-50%,-50%);background:#0a2a2a;border:2px solid #00ffcc;border-radius:20px;padding:20px;color:#b8f2e2;z-index:2000;box-shadow:0 0 50px cyan;text-align:center;animation:fadeInOut 5s forwards;`;
    popup.innerHTML = `<strong>📜 LORE: ${roomName}</strong><br><br>${loreText}<br><br><small>✓ Added to Archives</small>`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
}

function showLore() {
    const loreDiv = document.getElementById("loreContent");
    if (!loreDiv) return;
    
    if (localProgress.unlockedLore.length === 0) {
        loreDiv.innerHTML = `<p style="color:#ff8888;">🔒 LORE VAULT LOCKED. Solve puzzles to unlock.</p>`;
    } else {
        loreDiv.innerHTML = `<h3>📖 Archives</h3><p><em>Fragments: ${localProgress.unlockedLore.length}/${Object.keys(gameData.rooms).length}</em></p>${localProgress.unlockedLore.map(l => `<p style="margin:10px 0;padding:8px;background:#00ffcc10;border-left:3px solid #00ffcc;">${l}</p>`).join('')}`;
    }
    const modal = document.getElementById("loreModal");
    if (modal) modal.style.display = "block";
}

function resetGame() {
    if (confirm("⚠️ Reset ALL progress? This affects ONLY you, not your team.")) {
        localProgress = {
            codes: [],
            unlockedRoomIds: ["archive"],
            completedPuzzles: [],
            lastRoom: "archive",
            hintsUsed: 0,
            unlockedLore: [],
            startTime: Date.now()
        };
        hintsRemaining = 3;
        pushPlayerUpdate();
        updateUI();
    }
}

// ============================================
// EVENT LISTENERS - Wait for DOM to load
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, setting up event listeners...");
    
    const createBtn = document.getElementById("createGameBtn");
    const joinBtn = document.getElementById("joinGameBtn");
    const confirmJoinBtn = document.getElementById("confirmJoinBtn");
    const copyBtn = document.getElementById("copyRoomCodeBtn");
    const leaveBtn = document.getElementById("leaveGameBtn");
    const resetBtn = document.getElementById("resetGameBtn");
    const hintBtn = document.getElementById("hintBtn");
    const loreBtn = document.getElementById("showLoreBtn");
    
    if (createBtn) {
        createBtn.addEventListener("click", createGame);
        console.log("Create button listener added");
    } else {
        console.error("Create game button not found!");
    }
    
    if (joinBtn) {
        joinBtn.addEventListener("click", () => {
            const joinSection = document.getElementById("joinSection");
            if (joinSection) joinSection.style.display = joinSection.style.display === "none" ? "flex" : "none";
        });
    }
    
    if (confirmJoinBtn) confirmJoinBtn.addEventListener("click", joinGame);
    if (copyBtn) copyBtn.addEventListener("click", copyRoomCode);
    if (leaveBtn) leaveBtn.addEventListener("click", leaveGame);
    if (resetBtn) resetBtn.addEventListener("click", resetGame);
    if (hintBtn) hintBtn.addEventListener("click", showHint);
    if (loreBtn) loreBtn.addEventListener("click", showLore);
    
    const modal = document.getElementById("loreModal");
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (modal) modal.style.display = "none";
        });
    }
    if (modal) {
        window.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }
    
    document.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && document.getElementById("puzzleAnswer")) {
            const roomId = localProgress.lastRoom;
            if (roomId) checkPuzzle(roomId);
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `@keyframes fadeInOut{0%{opacity:0;transform:translate(-50%,-60%)}15%{opacity:1;transform:translate(-50%,-50%)}85%{opacity:1}100%{opacity:0;visibility:hidden}}`;
    document.head.appendChild(style);
    
    console.log("All event listeners set up!");
});
