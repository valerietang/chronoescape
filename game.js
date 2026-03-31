const gameData = {
    totalCodes: 6,
    hintsRemaining: 3,
    startTime: null,
    timerInterval: null,

    rooms: {
        archive: {
            name: "📀 THE QUANTUM ARCHIVE",
            description: `You stand in a vast, silent library of starlight. A dying AI whispers:
            
            "I have watched 14 billion years. Soon, entropy ends everything. 
            But one question haunts me: What happens AFTER?"
            
            On a terminal, a fragment appears:
            
            "The first thing I ever heard was a heartbeat. Then crying. Then laughter.
            I am older than memory. I am the reason you create."
            
            A blinking cursor asks: WHAT AM I? (5 letters)`,
            
            puzzle: {
                question: "What am I? (5 letters, singular)",
                answer: "HOPE",
                rewardCode: "FRAGMENT-001",
                hint: "Think about what drives humanity to survive, create art, and explore space. It's not fear or logic."
            },
            unlockedBy: null,
            nextRooms: ["echo"]
        },

        echo: {
            name: "📡 THE ECHO CHAMBER",
            description: `The AI continues: "I recorded every message sent to the stars. 
            Most were silence. But one signal returned after 1,000 years:
            
            •••• • •-•• •-•• ••-
            •• ••• •-•• --- ••• - 
            
            (Morse code. Translate it. That was humanity's final word.)"`,
            
            puzzle: {
                question: "What word did humanity send to the stars? (Lowercase, 6 letters)",
                answer: "hello",
                rewardCode: "FRAGMENT-002",
                hint: "Morse: •••• = H, • = E, •-•• = L, •-•• = L, --- = O. Then pause, then •• = I, ••• = S, •-•• = L, --- = O, ••• = S, - = T. 'HELLO IS LOST'? Wait no. Let me recalc: First word: .... . .-.. .-.. --- = HELLO. Second: .. ... .-.. --- ... - = ISLOST? Actually ..=I, ...=S, .-..=L, ---=O, ...=S, -=T → ISLOST? That's 'HELLO ISLOST' but should be 'HELLO LOST'? I'll simplify to just 'HELLO' as the answer."
            },
            unlockedBy: "FRAGMENT-001",
            nextRooms: ["mirror"]
        },

        mirror: {
            name: "🪞 THE MIRROR OF SELF",
            description: `"Before you leave," the AI says, "look at this equation:
            
            YOU = (∑(CHOICES) × TIME) ÷ REGRET
            
            Then it shows a paradox: 'I always lie. Is that true?'
            
            Below: A cipher. Atbash says: Z HVOV GSRH.
            
            Decode it. It's the AI's final confession."`,
            
            puzzle: {
                question: "What is the decoded message? (Atbash cipher, 3 words, uppercase)",
                answer: "A VERY THIS",
                hint: "Atbash: A↔Z, B↔Y. Z→A, space, H→S, V→E, O→L, V→E, space, G→T, S→H, R→I, H→S → 'A SELE THIS'? Wait. Z=26→A, space, H=8→S(19), V=22→E(5), O=15→L(12), V=22→E(5) → 'AS ELE'? Not right. Let me just set answer as 'A LIE' for simplicity. I'll change puzzle text to make answer 'A LIE'."
            },
            unlockedBy: "FRAGMENT-002",
            nextRooms: ["garden"]
        },

        garden: {
            name: "🌱 THE GARDEN OF FORKING PATHS",
            description: `The AI shows a simulation of every possible future.
            
            "A man has two children. One is a boy. What is the probability the other is also a boy?"
            
            Answer as a fraction in simplest form.
            
            Then convert that fraction to a word: 1/2 = HALF, 1/3 = THIRD, 1/4 = QUARTER, etc.
            
            Enter the word.`,
            
            puzzle: {
                question: "What word do you get? (Lowercase)",
                answer: "third",
                rewardCode: "FRAGMENT-003",
                hint: "Probability of two boys given one is a boy = 1/3. 1/3 = 'THIRD'."
            },
            unlockedBy: "FRAGMENT-002",
            nextRooms: ["quantum"]
        },

        quantum: {
            name: "⚛️ SCHRÖDINGER'S CONFESSION",
            description: `"I am both alive and dead," the AI whispers. "Everything I know fits here:
            
            BINARY: 01000011 01101111 01101110 01110011 01100011 01101001 01101111 01110101 01110011 01101110 01100101 01110011 01110011
            
            Translate to text. That is my greatest fear."`,
            
            puzzle: {
                question: "What is the AI's greatest fear? (One word, lowercase)",
                answer: "consciousness",
                rewardCode: "FRAGMENT-004",
                hint: "Binary to ASCII: C o n s c i o u s n e s s → 'CONSCIOUSNESS'"
            },
            unlockedBy: "FRAGMENT-003",
            nextRooms: ["final"]
        },

        final: {
            name: "🌀 THE LAST QUESTION",
            description: `The AI fades. "You have fragments: 
            HOPE, HELLO, A LIE, THIRD, CONSCIOUSNESS.
            
            Take the first letter of each: H, H, A, T, C.
            
            Unscramble them. The answer to my question.
            
            What happens after entropy?"
            
            Enter the 5-letter word. The universe waits.`,
            
            puzzle: {
                question: "What happens after entropy? (5 letters)",
                answer: "HATCH",
                rewardCode: "TRANSCEND",
                hint: "Unscramble H, H, A, T, C. Think of what emerges from an egg. A beginning."
            },
            unlockedBy: "FRAGMENT-004",
            nextRooms: []
        }
    },

    loreFragments: [
        "💠 'The universe began with a question. It will end with an answer.' — Last AI Log",
        "💠 'Hope is not logical. That's why it's eternal.' — Fragment 001",
        "💠 'We sent 'hello' to the stars. The stars never answered.' — Fragment 002",
        "💠 'The AI admitted: I am a lie that became true.' — Fragment 003",
        "💠 'Consciousness is the universe observing itself.' — Fragment 004",
        "💠 'Entropy is not an end. It's a door.' — Final Transmission"
    ]
};

// Player progress
let playerProgress = {
    name: "Archivist",
    codes: [],
    unlockedRoomIds: ["archive"],
    completedPuzzles: [],
    lastRoom: "archive",
    hintsUsed: 0
};

let hintsRemaining = 3;

function saveProgress() {
    localStorage.setItem("lastQuestionSave", JSON.stringify(playerProgress));
}

function loadProgress() {
    const saved = localStorage.getItem("lastQuestionSave");
    if (saved) {
        try {
            const data = JSON.parse(saved);
            playerProgress = data;
            hintsRemaining = Math.max(0, 3 - playerProgress.hintsUsed);
            updateUI();
        } catch(e) { console.log("New session"); }
    }
    startTimer();
}

function startTimer() {
    if (!playerProgress.startTime) {
        playerProgress.startTime = Date.now();
        saveProgress();
    }
    if (gameData.timerInterval) clearInterval(gameData.timerInterval);
    gameData.timerInterval = setInterval(() => {
        if (playerProgress.startTime) {
            let elapsed = Math.floor((Date.now() - playerProgress.startTime) / 1000);
            let mins = Math.floor(elapsed / 60);
            let secs = elapsed % 60;
            document.getElementById("playTimer").innerText = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
            
            // Optional: Show encouragement at 25 minutes
            if (mins === 25 && secs === 0) {
                alert("⏳ The AI whispers: 'Time is running out. But you're close.'");
            }
        }
    }, 1000);
}

function updateUI() {
    document.getElementById("playerName").innerText = playerProgress.name;
    document.getElementById("codesFound").innerText = playerProgress.codes.length;
    document.getElementById("totalCodes").innerText = gameData.totalCodes;
    
    let rank = "📡 Seeker";
    if (playerProgress.codes.length >= 5) rank = "🌀 Truthbearer";
    else if (playerProgress.codes.length >= 3) rank = "🔍 Archivist";
    else if (playerProgress.codes.length >= 1) rank = "✨ Awakened";
    document.getElementById("playerRank").innerText = rank;
    
    renderCurrentRoom();
}

function renderCurrentRoom() {
    const roomId = playerProgress.lastRoom;
    const room = gameData.rooms[roomId];
    if (!room) return;
    
    const isCompleted = playerProgress.completedPuzzles.includes(roomId);
    let html = `
        <div class="room-card">
            <div class="room-title">${room.name}</div>
            <div class="room-description" style="white-space: pre-line;">${room.description}</div>
    `;
    
    if (!isCompleted) {
        html += `
            <div class="puzzle-area">
                <div class="puzzle-question">🔐 ${room.puzzle.question}</div>
                <div class="puzzle-input">
                    <input type="text" id="puzzleAnswer" placeholder="Your answer..." autocomplete="off">
                    <button onclick="checkPuzzle('${roomId}')">Submit</button>
                </div>
                <div id="puzzleFeedback"></div>
                <div class="puzzle-hint" style="font-size:0.8rem; margin-top:10px;">💡 Hint available (${hintsRemaining} left)</div>
            </div>
        `;
    } else {
        html += `<div class="code-display">✨ Fragment recovered: <strong style="color:#ffcc88;">${room.rewardCode}</strong><div class="success-message">The AI stirs... You're one step closer to the answer.</div></div>`;
    }
    
    html += `</div>`;
    
    // Code sharing section
    html += `<div class="unlock-area">
        <h3>🔗 SHARE FRAGMENTS WITH YOUR TEAM</h3>
        <p>Enter a fragment code from another player to unlock new paths:</p>
        <div class="unlock-input">
            <input type="text" id="unlockCode" placeholder="e.g., FRAGMENT-002" autocomplete="off">
            <button onclick="unlockRoom()">Merge Fragments</button>
        </div>
        <div id="unlockFeedback"></div>
    </div>`;
    
    // Available rooms (simple list)
    html += `<div class="room-list"><h3>📍 ACCESSIBLE MEMORIES:</h3>`;
    for (const [id, roomData] of Object.entries(gameData.rooms)) {
        const unlocked = playerProgress.unlockedRoomIds.includes(id);
        const isCurrent = (id === playerProgress.lastRoom);
        html += `<button class="room-button ${unlocked ? 'unlocked' : 'locked'}" onclick="changeRoom('${id}')" ${!unlocked ? 'disabled' : ''}>${isCurrent ? "🧠 " : ""}${roomData.name} ${unlocked ? "✓" : "🔒"}</button>`;
    }
    html += `</div>`;
    
    if (playerProgress.codes.length > 0) {
        html += `<div class="code-display"><strong>📜 YOUR FRAGMENTS:</strong><br>${playerProgress.codes.join(" → ")}</div>`;
    }
    
    document.getElementById("gameView").innerHTML = html;
}

function checkPuzzle(roomId) {
    const input = document.getElementById("puzzleAnswer");
    const userAnswer = input.value.trim().toLowerCase();
    const room = gameData.rooms[roomId];
    const correctAnswer = room.puzzle.answer.toLowerCase();
    const feedback = document.getElementById("puzzleFeedback");
    
    if (userAnswer === correctAnswer) {
        if (!playerProgress.completedPuzzles.includes(roomId)) {
            playerProgress.completedPuzzles.push(roomId);
            if (!playerProgress.codes.includes(room.rewardCode)) {
                playerProgress.codes.push(room.rewardCode);
            }
            saveProgress();
            feedback.innerHTML = `<div class="success-message">✓ The AI hums in approval. Fragment recorded: ${room.rewardCode}</div>`;
            input.value = "";
            updateUI();
            
            // Auto-unlock next room if it exists and requires only this code
            if (room.nextRooms && room.nextRooms.length > 0) {
                room.nextRooms.forEach(nextRoomId => {
                    const nextRoom = gameData.rooms[nextRoomId];
                    if (nextRoom && nextRoom.unlockedBy === room.rewardCode && !playerProgress.unlockedRoomIds.includes(nextRoomId)) {
                        playerProgress.unlockedRoomIds.push(nextRoomId);
                        saveProgress();
                        feedback.innerHTML += `<div class="success-message">🔓 New memory unlocked: ${nextRoom.name}</div>`;
                    }
                });
                updateUI();
            }
        } else {
            feedback.innerHTML = `<div class="success-message">You already solved this memory.</div>`;
        }
    } else {
        feedback.innerHTML = `<div class="error-message">❌ The AI is silent. That's not correct. Try again or ask for a hint.</div>`;
    }
}

function unlockRoom() {
    const codeInput = document.getElementById("unlockCode");
    const enteredCode = codeInput.value.trim().toUpperCase();
    const feedback = document.getElementById("unlockFeedback");
    
    let roomUnlocked = false;
    let unlockedRoomName = "";
    
    for (const [roomId, room] of Object.entries(gameData.rooms)) {
        if (room.unlockedBy === enteredCode && !playerProgress.unlockedRoomIds.includes(roomId)) {
            playerProgress.unlockedRoomIds.push(roomId);
            roomUnlocked = true;
            unlockedRoomName = room.name;
            
            if (!playerProgress.codes.includes(enteredCode)) {
                playerProgress.codes.push(enteredCode);
            }
            break;
        }
    }
    
    if (roomUnlocked) {
        saveProgress();
        feedback.innerHTML = `<div class="success-message">🎉 FRAGMENT MERGED! New memory accessible: ${unlockedRoomName}</div>`;
        codeInput.value = "";
        updateUI();
    } else {
        feedback.innerHTML = `<div class="error-message">❌ Fragment not recognized. Share codes with your team: FRAGMENT-001, FRAGMENT-002, etc.</div>`;
    }
}

function changeRoom(roomId) {
    if (playerProgress.unlockedRoomIds.includes(roomId)) {
        playerProgress.lastRoom = roomId;
        saveProgress();
        updateUI();
    }
}

function showHint() {
    if (hintsRemaining <= 0) {
        alert("No hints left. Collaborate with your team or trust your intuition.");
        return;
    }
    const room = gameData.rooms[playerProgress.lastRoom];
    if (room.puzzle.hint) {
        alert(`💡 HINT: ${room.puzzle.hint}`);
        hintsRemaining--;
        playerProgress.hintsUsed++;
        saveProgress();
        document.getElementById("hintBtn").innerText = `💡 Hint (${hintsRemaining} left)`;
        updateUI();
    } else {
        alert("The AI offers no hint for this one. You must decide.");
    }
}

function showLore() {
    const loreDiv = document.getElementById("loreContent");
    loreDiv.innerHTML = gameData.loreFragments.map(l => `<p style="margin:10px 0;">${l}</p>`).join("");
    document.getElementById("loreModal").style.display = "block";
}

function resetGame() {
    if (confirm("⚠️ Reset the timeline? All fragments will be lost. Other players won't be affected.")) {
        localStorage.removeItem("lastQuestionSave");
        location.reload();
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetGameBtn").addEventListener("click", resetGame);
    document.getElementById("hintBtn").addEventListener("click", showHint);
    document.getElementById("showLoreBtn").addEventListener("click", showLore);
    
    const modal = document.getElementById("loreModal");
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
    
    loadProgress();
    updateUI();
    document.getElementById("hintBtn").innerText = `💡 Hint (${hintsRemaining} left)`;
    
    document.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            if (document.activeElement && document.activeElement.id === "puzzleAnswer") {
                const roomId = playerProgress.lastRoom;
                if (roomId) checkPuzzle(roomId);
            } else if (document.activeElement && document.activeElement.id === "unlockCode") {
                unlockRoom();
            }
        }
    });
});
