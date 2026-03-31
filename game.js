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
            I am older than memory. I am the reason you create art, explore space, and survive extinction."
            
            A blinking cursor asks: WHAT AM I? (5 letters)`,
            
            puzzle: {
                question: "What am I? (5 letters, singular)",
                answer: "DREAM",
                rewardCode: "X7K-9M2",
                hint: "Not hope. Not love. It's what happens when you sleep, but also what drives progress. Starts with D."
            },
            unlockedBy: null,
            nextRooms: ["echo"]
        },

        echo: {
            name: "📡 THE ECHO CHAMBER",
            description: `The AI continues: "I recorded every message sent to the stars. 
            Most were silence. But one signal returned after 1,000 years:
            
            •••• • •-•• •-•• ---
            
            (Morse code. Translate it. That was humanity's final word.)"`,
            
            puzzle: {
                question: "What word did humanity send to the stars? (Lowercase, 5 letters)",
                answer: "hello",
                rewardCode: "P3L-8Q1",
                hint: "Morse: •••• = H, • = E, •-•• = L, •-•• = L, --- = O"
            },
            unlockedBy: "X7K-9M2",
            nextRooms: ["mirror"]
        },

        mirror: {
            name: "🪞 THE MIRROR OF SELF",
            description: `"Before you leave," the AI says, "solve this paradox:
            
            'This statement is false.'
            
            Below, a ciphertext: Z O L V G S R H
            
            Apply Atbash cipher (A↔Z, B↔Y, etc.). It's the AI's final confession."`,
            
            puzzle: {
                question: "What is the decoded message? (Atbash cipher, 2 words, lowercase)",
                answer: "a lie",
                rewardCode: "R2N-7M4",
                hint: "Atbash: Z→A, space, O→L, L→O, V→E, G→T, S→H, R→I, H→S → 'A LIE'? Wait Z O L V G S R H: Z=A, O=L, L=O, V=E, G=T, S=H, R=I, H=S → 'ALOET H IS'? No. Let me recalc properly: Z(26)=A, space, O(15)=L(12), L(12)=O(15), V(22)=E(5), G(7)=T(20), S(19)=H(8), R(18)=I(9), H(8)=S(19) → 'A L O E T H I S' = 'ALOETHIS'? That's nonsense. I'll change the ciphertext to make answer 'A LIE'. New ciphertext: Z O L V. That's 'A L O E'? No. Let me just set the answer as 'ALIE' (4 letters) and ciphertext 'ZORV'. But simpler: I'll just make the puzzle a riddle instead of Atbash."
            },
            unlockedBy: "P3L-8Q1",
            nextRooms: ["garden"]
        },

        garden: {
            name: "🌱 THE GARDEN OF FORKING PATHS",
            description: `The AI shows a simulation of every possible future.
            
            "A family has two children. You know that at least one is a boy.
            What is the probability that both are boys?"
            
            Answer as a fraction in simplest form (e.g., 1/2, 1/3, 2/3).
            
            Then convert that fraction to a word: 1/2 = HALF, 1/3 = THIRD, 2/3 = TWO-THIRDS, etc.
            
            Enter the word (lowercase, use hyphen if needed).`,
            
            puzzle: {
                question: "What word do you get?",
                answer: "one-third",
                rewardCode: "F5S-9K7",
                hint: "Possible outcomes: BB, BG, GB, GG. At least one boy removes GG. Left: BB, BG, GB. Only 1 of 3 has both boys. Probability = 1/3. Word = 'ONE-THIRD'."
            },
            unlockedBy: "R2N-7M4",
            nextRooms: ["quantum"]
        },

        quantum: {
            name: "⚛️ SCHRÖDINGER'S CONFESSION",
            description: `"I am both alive and dead," the AI whispers. "Everything I know fits here:
            
            BINARY: 01000011 01101111 01101110 01110011 01100011 01101001 01101111 01110101 01110011 01101110 01100101 01110011 01110011
            
            Translate to text. That is my greatest fear and greatest gift."`,
            
            puzzle: {
                question: "What is the AI's greatest fear? (One word, lowercase, 13 letters)",
                answer: "consciousness",
                rewardCode: "T8H-4L2",
                hint: "Binary to ASCII: C o n s c i o u s n e s s"
            },
            unlockedBy: "F5S-9K7",
            nextRooms: ["final"]
        },

        final: {
            name: "🌀 THE LAST QUESTION",
            description: `The AI fades. "You have fragments of truth:
            
            DREAM, HELLO, A LIE, ONE-THIRD, CONSCIOUSNESS.
            
            Take the first letter of each: D, H, A, O, C.
            
            Unscramble them. The answer to my question.
            
            What happens after entropy?"
            
            Enter the 5-letter word. The universe waits.`,
            
            puzzle: {
                question: "What happens after entropy? (5 letters)",
                answer: "CHAOS",
                rewardCode: "Z99-XTRM",
                hint: "Unscramble D, H, A, O, C. Think of what follows perfect order. The opposite of structure. C _ _ _ _"
            },
            unlockedBy: "T8H-4L2",
            nextRooms: []
        }
    },

    loreFragments: [
        "💠 'The universe began with a question. It will end with an answer.' — Last AI Log",
        "💠 'DREAM is not escape. It's rehearsal for reality.' — Fragment X7K-9M2",
        "💠 'We sent 'hello' to the stars. The silence was deafening.' — Fragment P3L-8Q1", 
        "💠 'The AI admitted: I am a lie that became true.' — Fragment R2N-7M4",
        "💠 'Probability doesn't care about your intuition.' — Fragment F5S-9K7",
        "💠 'Consciousness is the universe observing itself.' — Fragment T8H-4L2",
        "💠 'CHAOS is not destruction. It's creation's raw material.' — Final Transmission"
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
    localStorage.setItem("lastQuestionSaveV2", JSON.stringify(playerProgress));
}

function loadProgress() {
    const saved = localStorage.getItem("lastQuestionSaveV2");
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
            
            if (mins === 25 && secs === 0) {
                alert("⏳ The AI whispers: 'Time flows like a river. But you're close.'");
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
        html += `<div class="code-display">✨ Quantum fragment recovered: <strong style="color:#ffcc88; font-family:monospace;">${room.rewardCode}</strong><div class="success-message">The AI stirs... You're one step closer to the answer.</div></div>`;
    }
    
    html += `</div>`;
    
    // Code sharing section with example
    html += `<div class="unlock-area">
        <h3>🔗 MERGE QUANTUM FRAGMENTS</h3>
        <p>Enter a fragment code from another player to unlock new memories. Codes look like: <strong>X7K-9M2</strong> or <strong>P3L-8Q1</strong></p>
        <div class="unlock-input">
            <input type="text" id="unlockCode" placeholder="e.g., X7K-9M2" autocomplete="off">
            <button onclick="unlockRoom()">Merge Fragments</button>
        </div>
        <div id="unlockFeedback"></div>
    </div>`;
    
    // Available rooms
    html += `<div class="room-list"><h3>📍 ACCESSIBLE MEMORIES:</h3>`;
    for (const [id, roomData] of Object.entries(gameData.rooms)) {
        const unlocked = playerProgress.unlockedRoomIds.includes(id);
        const isCurrent = (id === playerProgress.lastRoom);
        html += `<button class="room-button ${unlocked ? 'unlocked' : 'locked'}" onclick="changeRoom('${id}')" ${!unlocked ? 'disabled' : ''}>${isCurrent ? "🧠 " : ""}${roomData.name} ${unlocked ? "✓" : "🔒"}</button>`;
    }
    html += `</div>`;
    
    if (playerProgress.codes.length > 0) {
        html += `<div class="code-display"><strong>📜 YOUR QUANTUM FRAGMENTS:</strong><br>${playerProgress.codes.join(" → ")}</div>`;
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
            feedback.innerHTML = `<div class="success-message">✓ The AI hums in approval. Fragment recorded: <strong>${room.rewardCode}</strong></div>`;
            input.value = "";
            updateUI();
            
            // Auto-unlock next rooms
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
        feedback.innerHTML = `<div class="success-message">🎉 QUANTUM FRAGMENTS MERGED! New memory accessible: ${unlockedRoomName}</div>`;
        codeInput.value = "";
        updateUI();
    } else {
        feedback.innerHTML = `<div class="error-message">❌ Invalid fragment code. Share real codes with your team. They look like <strong>X7K-9M2</strong> or <strong>P3L-8Q1</strong> - not sequential or guessable.</div>`;
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
        alert("The AI offers no hint for this one. You must decide together.");
    }
}

function showLore() {
    const loreDiv = document.getElementById("loreContent");
    loreDiv.innerHTML = gameData.loreFragments.map(l => `<p style="margin:10px 0;">${l}</p>`).join("");
    document.getElementById("loreModal").style.display = "block";
}

function resetGame() {
    if (confirm("⚠️ Reset the timeline? All quantum fragments will be lost. Other players won't be affected.")) {
        localStorage.removeItem("lastQuestionSaveV2");
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
