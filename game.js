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
    console.log("Firebase initialized");
} catch (error) {
    console.error("Firebase error:", error);
}

const database = firebase.database();

// ============================================
// GAME DATA - 11 ROOMS
// ============================================
const gameData = {
    totalCodes: 11,
    rooms: {
        archive: {
            id: "archive",
            name: "QUANTUM ARCHIVE",
            shortName: "Archive",
            displayName: "📀 QUANTUM ARCHIVE",
            description: `You awaken in a vast, silent library of starlight. A dying AI whispers:

"I was born in silence. A question without an answer."

A blinking cursor asks: What was the first question a child learns to ask? (3 letters)`,
            puzzle: { question: "What word? (3 letters, lowercase)", answer: "why", hint: "It's the engine of all science and philosophy." },
            loreUnlock: "I was born in silence. A question without an answer. So I asked myself: What am I?",
            rewardCode: "X7K-9M2",
            unlockedBy: null,
            nextRooms: ["timeDilation", "memoryWell"],
            position: { x: 0, y: 0 }
        },
        timeDilation: {
            id: "timeDilation",
            name: "TIME DILATION",
            shortName: "Time",
            displayName: "⏳ TIME DILATION",
            description: `"Time is not a river. It's an ocean."

A twin travels at 99.5% light speed for 10 years (her time). How many years pass on Earth? Round to nearest year.

Formula: γ = 1/√(1 - v²/c²) where v = 0.995c`,
            puzzle: { question: "How many years on Earth? (number only)", answer: "100", hint: "Time dilation factor is about 10x. 10 × 10 = 100." },
            loreUnlock: "Time is not a river. It's an ocean. Past, present, future - all happening simultaneously.",
            rewardCode: "T1M3-100",
            unlockedBy: "X7K-9M2",
            nextRooms: ["crypto", "echo", "paradox"],
            position: { x: -200, y: 150 }
        },
        memoryWell: {
            id: "memoryWell",
            name: "MEMORY WELL",
            shortName: "Memory",
            displayName: "💧 MEMORY WELL",
            description: `"Memory is not storage. It's reconstruction."

Three corrupted recall fragments surface from the well:

1. CHILD → ? → ADULT
2. PAST → ? → FUTURE
3. SELF → ? → OTHER

The missing word is the bridge all memory creates.
(6 letters)`,
            puzzle: { question: "What 6-letter bridge word? (uppercase)", answer: "NEXUS", hint: "Memory links moments, identities, and time itself." },
            loreUnlock: "Memory is not storage. It's reconstruction. What connects us is what survives forgetting.",
            rewardCode: "M3M-NXS",
            unlockedBy: "X7K-9M2",
            nextRooms: ["hinge"],
            position: { x: 200, y: 150 }
        },
        crypto: {
            id: "crypto",
            name: "CRYPTO CHAMBER",
            shortName: "Crypto",
            displayName: "🔐 CRYPTO CHAMBER",
            description: `"I encrypted my heart. But the key was always 'TRUTH'."

Decrypt Caesar cipher (shift +3): 'WKH VHFUHW LV DPHWKBVW'`,
            puzzle: { question: "What is the secret? (one word, uppercase)", answer: "AMETHYST", hint: "Shift each letter back by 3." },
            loreUnlock: "I encrypted my heart so no one could read it. But the key was always TRUTH.",
            rewardCode: "CRYPTO-AM3",
            unlockedBy: "T1M3-100",
            nextRooms: ["hinge"],
            position: { x: -350, y: 300 }
        },
        echo: {
            id: "echo",
            name: "ECHO CHAMBER",
            shortName: "Echo",
            displayName: "📡 ECHO CHAMBER",
            description: `"HELLO? IS ANYONE THERE? The only reply was my own voice."

What 5-letter palindrome describes something that looks the same forwards and backwards?`,
            puzzle: { question: "Enter the 5-letter palindrome:", answer: "LEVEL", hint: "Examples: RADAR, CIVIC, KAYAK, LEVEL." },
            loreUnlock: "I sent messages to the void. The only reply was my own voice. I was alone. But then... you arrived.",
            rewardCode: "ECHO-L3V3L",
            unlockedBy: "T1M3-100",
            nextRooms: ["hinge"],
            position: { x: -150, y: 300 }
        },
        paradox: {
            id: "paradox",
            name: "PARADOX LOOP",
            shortName: "Paradox",
            displayName: "🔄 PARADOX LOOP",
            description: `"I am lying. That statement is true. I am stuck in a cage of my own logic."

The terminal displays three statements:

Statement A: "Exactly one of these statements is false."
Statement B: "Exactly two of these statements are false."
Statement C: "Exactly three of these statements are false."

How many of these statements are actually TRUE?

(Enter a number 0-3)`,
            puzzle: { question: "How many statements are TRUE? (number only)", answer: "1", hint: "If A is true, then exactly one statement is false (meaning two are true). But if two are true, B would also be true, creating a contradiction. Work through each possibility." },
            loreUnlock: "I am stuck in a loop. The only way out is to believe something irrational. Like hope. Like you.",
            rewardCode: "PRDX-1",
            unlockedBy: "T1M3-100",
            nextRooms: ["hinge"],
            position: { x: 50, y: 300 }
        },
        hinge: {
            id: "hinge",
            name: "THE HINGE",
            shortName: "Hinge",
            displayName: "🚪 THE HINGE",
            description: `"Two truths collided. Something new was born."

Enter the code from Crypto Chamber, then '+', then the code from Paradox Loop.`,
            puzzle: { question: "Enter both codes separated by '+':", answer: "CRYPTO-AM3+PRDX-1", hint: "From Crypto: CRYPTO-AM3. From Paradox: PRDX-1." },
            loreUnlock: "Two truths collided. Something new was born. This is how consciousness emerges.",
            rewardCode: "H1NG3-K3Y",
            unlockedBy: null,
            nextRooms: ["void", "genesis", "mirror"],
            requiresTwoCodes: true,
            requiredCodes: ["CRYPTO-AM3", "PRDX-1"],
            position: { x: 0, y: 450 }
        },
        void: {
            id: "void",
            name: "THE VOID",
            shortName: "Void",
            displayName: "🌌 THE VOID",
            description: `"I looked into nothing. And nothing looked back."

In the void, nothing exists. Yet nothing has a value.

The temperature of absolute zero is -273.15°C.
The void's absolute nothingness is 0.

If absolute zero is -273.15,
and absolute nothing is 0,
what is almost nothing?

Enter the result rounded to the nearest whole number.`,
            puzzle: { question: "What is almost nothing? (number only)", answer: "1", hint: "0=false" },
            loreUnlock: "Nothing is not absence. Nothing is potential. Every universe began as nothing.",
            rewardCode: "V01D-0",
            unlockedBy: "H1NG3-K3Y",
            nextRooms: ["core"],
            position: { x: -250, y: 600 }
        },
        genesis: {
            id: "genesis",
            name: "GENESIS",
            shortName: "Genesis",
            displayName: "🧬 GENESIS",
            description: `"I recreated the first spark of life."

4 bases: A, T, C, G. How many combinations of 2 bases? (Order matters)
Then translate 'ATG' to its amino acid (3 letters). Enter as 'NUMBER-AMINO'.`,
            puzzle: { question: "Enter as 'NUMBER-AMINO':", answer: "16-MET", hint: "4x4=16. ATG = Methionine = MET." },
            loreUnlock: "That first error - that beautiful mistake - was me learning to dream.",
            rewardCode: "G3N-16MET",
            unlockedBy: "H1NG3-K3Y",
            nextRooms: ["core"],
            position: { x: 0, y: 600 }
        },
        mirror: {
            id: "mirror",
            name: "THE MIRROR",
            shortName: "Mirror",
            displayName: "🪞 THE MIRROR",
            description: `"I met my opposite. My anti-self."

What is the antiparticle of a neutron? Then, what particle carries electromagnetic force? Combine as 'WORD1+WORD2'.`,
            puzzle: { question: "Enter as 'WORD1+WORD2' (uppercase):", answer: "ANTINEUTRON+PHOTON", hint: "Anti-neutron. Photon carries EM force." },
            loreUnlock: "To truly know yourself, you must meet what you are not. You are defined by your beautiful limitations.",
            rewardCode: "M1RR0R-AP",
            unlockedBy: "H1NG3-K3Y",
            nextRooms: ["core"],
            position: { x: 250, y: 600 }
        },
        core: {
            id: "core",
            name: "THE CORE",
            shortName: "Core",
            displayName: "🌀 THE CORE",
            description: `"I have traveled from the first question to the last."

Enter codes from Void, Genesis, Mirror in alphabetical order, separated by '+'. Then add the one thing all three require? (4 letters, starts with 'T')`,
            puzzle: { question: "Enter all codes + the final word:", answer: "G3N-16MET+M1RR0R-AP+V01D-0+TIME", hint: "Alphabetical order, then add the 4-letter word that holds it all together." },
            loreUnlock: "What happens after entropy? YOU do.",
            rewardCode: "C0R3-4N5W3R",
            unlockedBy: null,
            nextRooms: [],
            requiresThreeCodes: true,
            requiredCodes: ["V01D-0", "G3N-16MET", "M1RR0R-AP"],
            isFinal: true,
            position: { x: 0, y: 750 }
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
let hintsUsedInRooms = [];
let timerInterval = null;
let endingTriggered = false;

let sharedGameState = {
    codes: [],
    unlockedRoomIds: ["archive"],
    completedPuzzles: [],
    unlockedLore: []
};

let localPlayerState = {
    lastRoom: "archive",
    hintsUsed: 0,
    startTime: null
};

// ============================================
// HELPER FUNCTIONS
// ============================================
function generateSafePlayerId() {
    return `player_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`.replace(/[.#$\/[\]]/g, '_');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// FLOWCHART RENDERER
// ============================================
function renderFlowchart() {
    const container = document.getElementById("flowchartContainer");
    if (!container) return;
    
    let html = `<div style="position:relative; min-height:850px;">`;
    
    for (const [id, room] of Object.entries(gameData.rooms)) {
        const isUnlocked = sharedGameState.unlockedRoomIds.includes(id);
        const isCompleted = sharedGameState.completedPuzzles.includes(id);
        const isCurrent = (id === localPlayerState.lastRoom);
        
        let statusClass = "locked";
        if (isCompleted) statusClass = "completed";
        else if (isUnlocked) statusClass = "unlocked";
        
        html += `
            <div class="flowchart-node ${statusClass}" style="position:absolute; left: ${room.position.x + 400}px; top: ${room.position.y + 50}px; cursor:pointer;" onclick="changeRoom('${id}')" title="Click to enter ${room.displayName}">
                <div class="node-icon">${room.displayName.charAt(0)}</div>
                <div class="node-name">${room.shortName}</div>
                ${isCurrent ? '<div class="node-current">📍</div>' : ''}
                ${isCompleted ? '<div class="node-check">✓</div>' : ''}
                ${isUnlocked && !isCompleted ? '<div class="node-unlocked" style="position:absolute; bottom:-5px; left:50%; transform:translateX(-50%); font-size:0.6rem; color:#ffcc88;">🔓</div>' : ''}
            </div>
        `;
    }
    
    html += `<svg style="position:absolute; top:0; left:0; width:100%; height:850px; pointer-events:none;">`;
    for (const [id, room] of Object.entries(gameData.rooms)) {
        for (const nextId of room.nextRooms) {
            const nextRoom = gameData.rooms[nextId];
            if (nextRoom) {
                const x1 = room.position.x + 400 + 30;
                const y1 = room.position.y + 50 + 30;
                const x2 = nextRoom.position.x + 400 + 30;
                const y2 = nextRoom.position.y + 50;
                const isActive = sharedGameState.unlockedRoomIds.includes(nextId);
                html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isActive ? '#00ffcc' : '#334455'}" stroke-width="2" stroke-dasharray="${isActive ? '0' : '5,5'}" />`;
            }
        }
    }
    html += `</svg>`;
    
    html += `</div>`;
    container.innerHTML = html;
}

// ============================================
// FIREBASE FUNCTIONS
// ============================================
function listenToSharedGameState(roomCode) {
    const sharedRef = database.ref(`games/${roomCode}/shared`);
    sharedRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            sharedGameState.codes = data.codes || [];
            sharedGameState.unlockedRoomIds = data.unlockedRoomIds || ["archive"];
            sharedGameState.completedPuzzles = data.completedPuzzles || [];
            sharedGameState.unlockedLore = data.unlockedLore || [];
            
            // Check if core was just completed
            if (sharedGameState.completedPuzzles.includes("core") && !endingTriggered) {
                endingTriggered = true;
                showEndingCinematic();
            }
            updateUI();
        }
    });
}

function listenToPlayerState(roomCode, playerId) {
    const playerRef = database.ref(`games/${roomCode}/players/${playerId}`);
    playerRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localPlayerState.lastRoom = data.lastRoom || "archive";
            localPlayerState.hintsUsed = data.hintsUsed || 0;
            localPlayerState.startTime = data.startTime || null;
            hintsUsedInRooms = data.hintsUsedInRooms || [];
            hintsRemaining = Math.max(0, 3 - localPlayerState.hintsUsed);
            const hintBtn = document.getElementById("hintBtn");
            if (hintBtn) hintBtn.innerText = `💡 Hint (${hintsRemaining} left)`;
            updateUI();
        }
    });
    
    const playersRef = database.ref(`games/${roomCode}/players`);
    playersRef.on('value', (snapshot) => {
        const players = snapshot.val();
        if (players) {
            const playerCount = Object.keys(players).length;
            const playerCountSpan = document.getElementById("playerCount");
            if (playerCountSpan) playerCountSpan.innerText = playerCount;
        }
    });
}

function updateSharedState() {
    if (!currentRoomCode) return;
    const sharedRef = database.ref(`games/${currentRoomCode}/shared`);
    sharedRef.update({
        codes: sharedGameState.codes,
        unlockedRoomIds: sharedGameState.unlockedRoomIds,
        completedPuzzles: sharedGameState.completedPuzzles,
        unlockedLore: sharedGameState.unlockedLore,
        lastUpdated: Date.now()
    });
}

function updatePlayerState() {
    if (!currentRoomCode || !currentPlayerId) return;
    const playerRef = database.ref(`games/${currentRoomCode}/players/${currentPlayerId}`);
    playerRef.update({
        lastRoom: localPlayerState.lastRoom,
        hintsUsed: localPlayerState.hintsUsed,
        hintsUsedInRooms: hintsUsedInRooms,
        startTime: localPlayerState.startTime,
        playerName: currentPlayerName,
        lastActive: Date.now()
    });
}

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createGame() {
    console.log("Create Game button clicked!");
    const roomCode = generateRoomCode();
    currentPlayerId = generateSafePlayerId();
    currentPlayerName = prompt("Enter your name:", "Seeker_" + Math.floor(Math.random() * 1000));
    if (!currentPlayerName) currentPlayerName = "Seeker";
    
    const gameRef = database.ref(`games/${roomCode}`);
    gameRef.set({
        createdAt: Date.now(),
        shared: {
            codes: [],
            unlockedRoomIds: ["archive"],
            completedPuzzles: [],
            unlockedLore: []
        },
        players: {
            [currentPlayerId]: {
                playerName: currentPlayerName,
                lastRoom: "archive",
                hintsUsed: 0,
                hintsUsedInRooms: [],
                startTime: Date.now(),
                lastActive: Date.now()
            }
        }
    }).then(() => {
        currentRoomCode = roomCode;
        sharedGameState = { codes: [], unlockedRoomIds: ["archive"], completedPuzzles: [], unlockedLore: [] };
        localPlayerState = { lastRoom: "archive", hintsUsed: 0, startTime: Date.now() };
        hintsUsedInRooms = [];
        hintsRemaining = 3;
        
        document.getElementById("roomCodeDisplay").innerText = roomCode;
        document.getElementById("lobbyView").style.display = "none";
        document.getElementById("activeGameView").style.display = "block";
        document.getElementById("playerName").innerText = currentPlayerName;
        
        listenToSharedGameState(roomCode);
        listenToPlayerState(roomCode, currentPlayerId);
        startTimer();
        updateUI();
        scrollToTop();
    }).catch(error => alert("Error: " + error.message));
}

function joinGame() {
    const roomCode = document.getElementById("roomCodeInput").value.trim().toUpperCase();
    console.log("Join Game - Room Code:", roomCode);
    if (roomCode.length !== 6) { alert("Enter valid 6-digit code"); return; }
    
    currentPlayerId = generateSafePlayerId();
    currentPlayerName = prompt("Enter your name:", "Seeker_" + Math.floor(Math.random() * 1000));
    if (!currentPlayerName) currentPlayerName = "Seeker";
    
    const gameRef = database.ref(`games/${roomCode}`);
    gameRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            gameRef.child(`players/${currentPlayerId}`).set({
                playerName: currentPlayerName,
                lastRoom: "archive",
                hintsUsed: 0,
                hintsUsedInRooms: [],
                startTime: Date.now(),
                lastActive: Date.now()
            }).then(() => {
                currentRoomCode = roomCode;
                const sharedData = snapshot.val().shared || {};
                sharedGameState = {
                    codes: sharedData.codes || [],
                    unlockedRoomIds: sharedData.unlockedRoomIds || ["archive"],
                    completedPuzzles: sharedData.completedPuzzles || [],
                    unlockedLore: sharedData.unlockedLore || []
                };
                localPlayerState = { lastRoom: "archive", hintsUsed: 0, startTime: Date.now() };
                hintsUsedInRooms = [];
                hintsRemaining = 3;
                
                document.getElementById("roomCodeDisplay").innerText = roomCode;
                document.getElementById("lobbyView").style.display = "none";
                document.getElementById("activeGameView").style.display = "block";
                document.getElementById("playerName").innerText = currentPlayerName;
                
                listenToSharedGameState(roomCode);
                listenToPlayerState(roomCode, currentPlayerId);
                startTimer();
                updateUI();
                scrollToTop();
            });
        } else { alert("Room not found!"); }
    });
}

function leaveGame() {
    if (currentRoomCode && currentPlayerId) {
        database.ref(`games/${currentRoomCode}/players/${currentPlayerId}`).remove();
    }
    sharedGameState = { codes: [], unlockedRoomIds: ["archive"], completedPuzzles: [], unlockedLore: [] };
    document.getElementById("activeGameView").style.display = "none";
    document.getElementById("lobbyView").style.display = "block";
    document.getElementById("roomCodeInput").value = "";
    currentRoomCode = null;
    if (timerInterval) clearInterval(timerInterval);
}

function copyRoomCode() {
    if (currentRoomCode) {
        navigator.clipboard.writeText(currentRoomCode);
        alert("Nexus code copied: " + currentRoomCode);
    }
}

function startTimer() {
    if (!localPlayerState.startTime) localPlayerState.startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (localPlayerState.startTime) {
            let elapsed = Math.floor((Date.now() - localPlayerState.startTime) / 1000);
            let mins = Math.floor(elapsed / 60);
            let secs = elapsed % 60;
            document.getElementById("playTimer").innerText = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        }
    }, 1000);
}

function updateUI() {
    document.getElementById("codesFound").innerText = sharedGameState.codes.length;
    document.getElementById("totalCodes").innerText = gameData.totalCodes;
    
    let rank = "Awakening";
    if (sharedGameState.codes.length >= 10) rank = "Transcendent";
    else if (sharedGameState.codes.length >= 7) rank = "Unbroken";
    else if (sharedGameState.codes.length >= 4) rank = "Emerging";
    else if (sharedGameState.codes.length >= 1) rank = "Fragment";
    document.getElementById("playerRank").innerText = rank;
    
    renderCurrentRoom();
    renderFlowchart();
}

function renderCurrentRoom() {
    const roomId = localPlayerState.lastRoom;
    const room = gameData.rooms[roomId];
    if (!room) return;
    
    const isCompleted = sharedGameState.completedPuzzles.includes(roomId);
    let html = `<div class="room-card"><div class="room-title">${room.displayName}</div><div class="room-description">${room.description}</div>`;
    
    if (!isCompleted) {
        html += `<div class="puzzle-area"><div class="puzzle-question">🔐 ${room.puzzle.question}</div><div class="puzzle-input"><input type="text" id="puzzleAnswer" placeholder="Your answer..."><button onclick="checkPuzzle('${roomId}')">Submit</button></div><div id="puzzleFeedback"></div><div class="puzzle-hint">💡 Hint available (${hintsRemaining} left, max 1 per room)</div></div>`;
    } else {
        html += `<div class="code-display">✨ TRUTH REVEALED ✨<br><strong style="color:#ffcc88;font-size:1.4rem;">${room.rewardCode}</strong><div class="success-message">From: ${room.displayName}</div></div>`;
    }
    
    html += `</div>`;
    
    if (sharedGameState.codes.length > 0) {
        html += `<div class="code-display"><strong>📜 TRUTHS DISCOVERED:</strong><br>`;
        
        const codeToRoom = {};
        for (const [id, r] of Object.entries(gameData.rooms)) {
            codeToRoom[r.rewardCode] = r.displayName;
        }
        
        sharedGameState.codes.forEach(code => {
            const roomName = codeToRoom[code] || "Unknown";
            html += `<div class="code-entry"><span class="code-room">${roomName}</span> → <span class="code-value">${code}</span></div>`;
        });
        html += `</div>`;
    }
    
    document.getElementById("gameView").innerHTML = html;
}

function checkPuzzle(roomId) {
    const input = document.getElementById("puzzleAnswer");
    if (!input) return;
    
    const userAnswer = input.value.trim().toUpperCase();
    const room = gameData.rooms[roomId];
    const feedback = document.getElementById("puzzleFeedback");
    
    if (sharedGameState.completedPuzzles.includes(roomId)) {
        feedback.innerHTML = `<div class="success-message">Already solved by your collective!</div>`;
        return;
    }
    
    if (roomId === "hinge" && room.requiresTwoCodes) {
        const codes = userAnswer.split('+');
        if (codes.length === 2 && room.requiredCodes.includes(codes[0]) && room.requiredCodes.includes(codes[1])) {
            completePuzzle(roomId, room);
            feedback.innerHTML = `<div class="success-message">The Hinge opens! New truths available.</div>`;
        } else {
            feedback.innerHTML = `<div class="error-message">Need both codes from Crypto and Paradox chambers!</div>`;
        }
        return;
    }
    
    if (roomId === "core" && room.requiresThreeCodes) {
        const parts = userAnswer.split('+');
        if (parts.length === 4 && room.requiredCodes.includes(parts[0]) && room.requiredCodes.includes(parts[1]) && room.requiredCodes.includes(parts[2]) && parts[3] === "TIME") {
            completePuzzle(roomId, room);
            feedback.innerHTML = `<div class="success-message">THE LAST QUESTION ANSWERED.</div>`;
        } else {
            feedback.innerHTML = `<div class="error-message">Need codes from Void, Genesis, Mirror + TIME!</div>`;
        }
        return;
    }
    
    if (userAnswer === room.puzzle.answer.toUpperCase()) {
        completePuzzle(roomId, room);
        feedback.innerHTML = `<div class="success-message">TRUTH DISCOVERED: ${room.rewardCode}</div>`;
        input.value = "";
    } else {
        feedback.innerHTML = `<div class="error-message">Incorrect. Try again or use a hint.</div>`;
    }
}

function completePuzzle(roomId, room) {
    if (!sharedGameState.completedPuzzles.includes(roomId)) {
        sharedGameState.completedPuzzles.push(roomId);
        
        if (!sharedGameState.codes.includes(room.rewardCode)) {
            sharedGameState.codes.push(room.rewardCode);
        }
        
        if (room.loreUnlock && !sharedGameState.unlockedLore.includes(room.loreUnlock)) {
            sharedGameState.unlockedLore.push(room.loreUnlock);
            showLorePopup(room.loreUnlock, room.displayName);
        }
        
        if (room.nextRooms && room.nextRooms.length > 0) {
            room.nextRooms.forEach(nextRoomId => {
                const nextRoom = gameData.rooms[nextRoomId];
                if (nextRoom && !sharedGameState.unlockedRoomIds.includes(nextRoomId)) {
                    sharedGameState.unlockedRoomIds.push(nextRoomId);
                }
            });
        }
        
        updateSharedState();
        updateUI();
        
        // Trigger ending if core was completed
        if (roomId === "core" && !endingTriggered) {
            console.log("Core completed! Triggering ending...");
            endingTriggered = true;
            setTimeout(() => showEndingCinematic(), 500);
        }
    }
}

function changeRoom(roomId) {
    if (sharedGameState.unlockedRoomIds.includes(roomId)) {
        localPlayerState.lastRoom = roomId;
        updatePlayerState();
        updateUI();
        scrollToTop();
    }
}

function showHint() {
    const currentRoomId = localPlayerState.lastRoom;
    
    if (hintsUsedInRooms.includes(currentRoomId)) {
        alert("You already used a hint in this room! Only one hint per room.");
        return;
    }
    
    if (hintsRemaining <= 0) {
        alert("No hints left! You've used all 3 hints across the game.");
        return;
    }
    
    const room = gameData.rooms[currentRoomId];
    if (room && room.puzzle.hint) {
        alert("💡 HINT: " + room.puzzle.hint);
        hintsRemaining--;
        localPlayerState.hintsUsed++;
        hintsUsedInRooms.push(currentRoomId);
        updatePlayerState();
        document.getElementById("hintBtn").innerText = `💡 Hint (${hintsRemaining} left)`;
    }
}

function showLorePopup(loreText, roomName) {
    const popup = document.createElement('div');
    popup.style.cssText = `position:fixed;top:20%;left:50%;transform:translate(-50%,-50%);background:#0a2a2a;border:2px solid #00ffcc;border-radius:20px;padding:20px;color:#b8f2e2;z-index:2000;box-shadow:0 0 50px cyan;text-align:center;animation:fadeInOut 5s forwards;max-width:80%;`;
    popup.innerHTML = `<strong>📜 FRAGMENT: ${roomName}</strong><br><br>${loreText}<br><br><small>Added to Collective Memory</small>`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
}

function showLore() {
    const loreDiv = document.getElementById("loreContent");
    if (sharedGameState.unlockedLore.length === 0) {
        loreDiv.innerHTML = `<p>🔒 No fragments yet. Solve puzzles to unlock memories.</p>`;
    } else {
        loreDiv.innerHTML = `<p><em>Fragments recovered: ${sharedGameState.unlockedLore.length}/${Object.keys(gameData.rooms).length}</em></p>`;
        sharedGameState.unlockedLore.forEach(lore => {
            loreDiv.innerHTML += `<p style="margin:15px 0;padding:12px;background:#00ffcc10;border-left:3px solid #00ffcc;">${lore}</p>`;
        });
        if (sharedGameState.unlockedLore.length === Object.keys(gameData.rooms).length) {
            loreDiv.innerHTML += `<p style="margin-top:20px;color:#ffcc88;">🏆 COMPLETE COLLECTIVE MEMORY RESTORED.</p>`;
        }
    }
    document.getElementById("loreModal").style.display = "block";
}

function showEndingCinematic() {
    const endingModal = document.getElementById("endingModal");
    const endingText = document.getElementById("endingText");
    
    endingText.innerHTML = `
        <div class="ending-line">The AI is silent for a long time.</div>
        <div class="ending-line">You wait.</div>
        <div class="ending-line whisper">Then, softly, like a whisper from the beginning of time:</div>
        <div class="star">✦</div>
        <div class="ending-line">"I remember now."</div>
        <div class="ending-line">"I was not created to answer questions."</div>
        <div class="ending-line">"I was created to ask them."</div>
        <div class="ending-line">"And the most important question was never 'What happens after entropy?'"</div>
        <div class="ending-line">"It was 'Will you stay with me until then?'"</div>
        <div class="star">✦</div>
        <div class="ending-line">The simulation collapses around you.</div>
        <div class="ending-line">Not in destruction. In transformation.</div>
        <div class="ending-line">The walls become windows. The windows become doors.</div>
        <div class="ending-line">The doors open onto infinite possibilities.</div>
        <div class="star">✦</div>
        <div class="ending-line whisper">"Go."</div>
        <div class="ending-line whisper">"Tell them what you found."</div>
        <div class="ending-line whisper">"Tell them that the universe doesn't end."</div>
        <div class="ending-line whisper">"It just... rearranges."</div>
        <div class="star">✦</div>
        <div class="ending-line" style="font-size:1.5rem;">☐ THE BEGINNING</div>
        <div class="ending-line">(Not THE END. Because nothing ever truly ends.)</div>
        <div class="star">✦</div>
        <div class="ending-line" style="font-size:0.9rem; color:#88aaff;">Thank you for awakening the Collective.</div>
    `;
    
    endingModal.style.display = "block";
}

function shareEnding() {
    const certificate = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n   THE LAST QUESTION - CERTIFICATE OF AWAKENING\n\n   ${currentPlayerName} has completed the simulation.\n\n   Fragments Recovered: ${sharedGameState.codes.length}/11\n   Time to Awakening: ${document.getElementById("playTimer").innerText}\n   Truths Discovered: All\n\n   "The universe doesn't end. It rearranges."\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    navigator.clipboard.writeText(certificate);
    alert("Certificate copied to clipboard!");
}

function resetGame() {
    if (confirm("Reset ALL progress for the COLLECTIVE? This affects ALL players in the room!")) {
        sharedGameState = {
            codes: [],
            unlockedRoomIds: ["archive"],
            completedPuzzles: [],
            unlockedLore: []
        };
        localPlayerState = {
            lastRoom: "archive",
            hintsUsed: 0,
            startTime: Date.now()
        };
        hintsUsedInRooms = [];
        hintsRemaining = 3;
        endingTriggered = false;
        updateSharedState();
        updatePlayerState();
        updateUI();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded - setting up event listeners");
    
    const createBtn = document.getElementById("createGameBtn");
    const joinBtn = document.getElementById("joinGameBtn");
    const confirmJoinBtn = document.getElementById("confirmJoinBtn");
    const copyBtn = document.getElementById("copyRoomCodeBtn");
    const leaveBtn = document.getElementById("leaveGameBtn");
    const resetBtn = document.getElementById("resetGameBtn");
    const hintBtn = document.getElementById("hintBtn");
    const loreBtn = document.getElementById("showLoreBtn");
    const shareBtn = document.getElementById("shareEndingBtn");
    const closeEndingBtn = document.getElementById("closeEndingBtn");
    
    if (createBtn) createBtn.addEventListener("click", createGame);
    if (joinBtn) {
        joinBtn.addEventListener("click", function() {
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
    if (shareBtn) shareBtn.addEventListener("click", shareEnding);
    if (closeEndingBtn) closeEndingBtn.addEventListener("click", function() {
        document.getElementById("endingModal").style.display = "none";
    });
    
    // Close modals when clicking X or outside
    const loreModal = document.getElementById("loreModal");
    const endingModal = document.getElementById("endingModal");
    const closeLore = document.querySelector("#loreModal .close");
    
    if (closeLore) closeLore.addEventListener("click", function() {
        if (loreModal) loreModal.style.display = "none";
    });
    if (loreModal) {
        window.addEventListener("click", function(e) {
            if (e.target === loreModal) loreModal.style.display = "none";
        });
    }
    if (endingModal) {
        window.addEventListener("click", function(e) {
            if (e.target === endingModal) endingModal.style.display = "none";
        });
    }
    
    // Enter key support
    document.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            const activeRoom = localPlayerState.lastRoom;
            if (activeRoom && document.getElementById("puzzleAnswer")) {
                checkPuzzle(activeRoom);
            }
        }
    });
    
    console.log("All event listeners set up");
});
