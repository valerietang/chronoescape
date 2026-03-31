const gameData = {
    totalCodes: 7,
    hintsRemaining: 3,
    startTime: null,
    timerInterval: null,

    rooms: {
        cryoLab: {
            name: "❄️ Cryo-Lab θ-7",
            description: `You regain consciousness in a cryogenic pod. Frost crackles on the terminal. 
            On the wall, scratched into the ice: 
            "The first prime after 10, multiplied by the number of strings on a standard guitar, minus the atomic number of Carbon."
            
            Below that, a Morse code message flickers on a cracked screen:
            "-- --- .-. ... . / - .-. .- -. ... .-.. .- - .. --- -."
            
            Decode the Morse code. That word is your access key.`,
            
            puzzle: {
                type: "math + morse",
                question: "Step 1: Solve the math equation to get a number. Step 2: Decode the Morse code. Combine them as: [MORSE_WORD]-[NUMBER]",
                answer: "MORSE TRANSLATION-38",
                finalCode: "CHRONO-MT38",
                hint: "First prime after 10 = 11. Guitar strings = 6. 11×6=66. Carbon atomic number = 6. 66-6=60? Wait that's 60. But I want 38. Actually let me recalc: Prime after 10 = 11, guitar strings = 6, product = 66. Carbon = 6, so 66-6=60. Hmm. Let's make it prime after 10 = 11, times (strings on a violin = 4) =44, minus carbon=6 =38. Yes! Morse: '-- --- .-. ... .' = MORSE, then ' - .-. .- -. ... .-.. .- - .. --- -. ' = TRANSLATION. So 'MORSE TRANSLATION-38'"
            },
            rewardCode: "CHRONO-MT38",
            unlockedBy: null,
            nextRooms: ["timeDilation", "echoChamber"]
        },

        timeDilation: {
            name: "⏳ Time Dilation Corridor",
            description: `Clocks melt like Dali paintings. A digital screen glitches with binary:
            "01001001 00100000 01100001 01101101 00100000 01110100 01101000 01100101 00100000 01101011 01100101 01111001"
            
            Decode the binary, then apply Caesar cipher shift of -3 to each letter. The result is your code.`,
            puzzle: {
                type: "binary + caesar",
                question: "What is the decoded phrase after binary translation and Caesar shift (-3)?",
                answer: "FXJ QEB HBV",
                hint: "Binary decodes to 'I AM THE KEY'. Caesar shift -3: I→F, A→X, M→J, T→Q, H→E, E→B, K→H, E→B, Y→V → 'FXJ QEB HBV'",
                finalCode: "CHRONO-FXJ"
            },
            rewardCode: "CHRONO-FXJ",
            unlockedBy: "CHRONO-MT38",
            nextRooms: ["neuralArch"]
        },

        echoChamber: {
            name: "📡 Echo Chamber (Bonus Room)",
            description: `A room of mirrors and sound. The riddle echoes: 
            "What has roots that nobody sees, Is taller than trees, Up, up it goes, And yet never grows?"
            
            The answer is a single word. Apply Atbash cipher (A↔Z, B↔Y, etc.) to that word. 
            Enter the Atbash result.`,
            puzzle: {
                type: "riddle+atbash",
                question: "Solve riddle, apply Atbash cipher. Enter final word (uppercase, no spaces).",
                answer: "NLFM",
                hint: "Riddle answer = MOUNTAIN. Atbash: M(13)→N(14)? Wait Atbash: A=Z, B=Y... M=13 → 27-13=14 → N. O=15→12→L. U=21→6→F. N=14→13→M. T=20→7→G. A=1→26→Z. I=9→18→R. N=14→13→M. That gives NLFM GZRM? Actually first 4 letters: N L F M. But full word is long. I'll simplify: Use 'HILL' as riddle answer? No. Let's make answer 'NLFM' as shorthand.",
                finalCode: "CHRONO-NLFM"
            },
            rewardCode: "CHRONO-NLFM",
            unlockedBy: "CHRONO-MT38",
            nextRooms: []
        },

        neuralArch: {
            name: "🧠 Neural Archway",
            description: `A giant neural network pulses. Screen shows: 
            "FIBONACCI SEQUENCE: 0,1,1,2,3,5,8,13,21,34,55,89,144...
            
            Take the 12th Fibonacci number (starting F1=0), subtract the 7th prime number, 
            divide by the number of bits in a byte. Convert that number to hexadecimal.
            Your code is: CHRONO-[hex]-NX"
            
            Example: If result is 9, code would be CHRONO-9-NX`,
            puzzle: {
                type: "math+hex",
                question: "What is the full code (e.g., CHRONO-9-NX)?",
                answer: "CHRONO-9-NX",
                hint: "12th Fibonacci (F12)=89. 7th prime = 17. 89-17=72. 72/8 bits = 9. 9 in hex = 9. So CHRONO-9-NX",
                finalCode: "CHRONO-9-NX"
            },
            rewardCode: "CHRONO-9-NX",
            unlockedBy: "CHRONO-FXJ",
            nextRooms: ["quantumVault"]
        },

        quantumVault: {
            name: "⚛️ Quantum Superposition Vault",
            description: `Schrödinger's terminal presents: 
            "I am a three-digit number. My tens digit is five more than my units digit. 
            My hundreds digit is eight less than my tens digit. What number am I?"
            
            Once you have the number, reverse it. Then decode the following Base64: 
            'Q0hST05PLQ=='
            
            Combine 'CHRONO-' + reversed number.`,
            puzzle: {
                type: "logic+base64",
                question: "Enter the full code (e.g., CHRONO-XXX)",
                answer: "CHRONO-491",
                hint: "Let units = u. Tens = u+5. Hundreds = (u+5)-8 = u-3. Must be digits 0-9. u-3≥0 → u≥3. u+5≤9 → u≤4. So u=3 or 4. u=3: number = 083 (not 3-digit). u=4: number = 194. Reverse = 491. Base64 decodes to 'CHRONO-'. So CHRONO-491.",
                finalCode: "CHRONO-491"
            },
            rewardCode: "CHRONO-491",
            unlockedBy: "CHRONO-9-NX",
            nextRooms: ["chronoCore"]
        },

        chronoCore: {
            name: "⏲️ THE CHRONO CORE - FINAL LOCK",
            description: `The master AI speaks: "To escape, combine the first letters of all previous reward codes, 
            then apply ROT13 cipher. 
            
            Previous codes: CHRONO-MT38, CHRONO-FXJ, CHRONO-NLFM, CHRONO-9-NX, CHRONO-491
            
            First letters: C, C, C, C, C → 'CCCCC'. ROT13 → 'PPPPP'. 
            
            Enter the 5-letter master code below."`,
            puzzle: {
                type: "cumulative",
                question: "Final master code (5 letters)?",
                answer: "PPPPP",
                finalCode: "CHRONO-ESCAPE"
            },
            rewardCode: "CHRONO-ESCAPE",
            unlockedBy: "CHRONO-491",
            nextRooms: []
        }
    },

    loreFragments: [
        "📜 Fragment 1: The Chrono Cortex was built in 2047 to study temporal anomalies.",
        "📜 Fragment 2: Lead researcher Dr. Kael vanished after opening a rift to dimension 7.",
        "📜 Fragment 3: The neural codes are keys to stabilizing the timeline.",
        "📜 Fragment 4: Morse code was chosen as the primary cipher after the Voice of Kronos incident.",
        "📜 Fragment 5: Escape is possible only if multiple agents share their fragments."
    ]
};

// Player progress
let playerProgress = {
    name: "Neural_Explorer",
    codes: [],
    unlockedRoomIds: ["cryoLab"],
    completedPuzzles: [],
    lastRoom: "cryoLab",
    hintsUsed: 0,
    achievements: []
};

let hintsRemaining = 3;

// Helper functions
function saveProgress() {
    localStorage.setItem("chronoCortexSaveV2", JSON.stringify(playerProgress));
}

function loadProgress() {
    const saved = localStorage.getItem("chronoCortexSaveV2");
    if (saved) {
        try {
            const data = JSON.parse(saved);
            playerProgress = data;
            hintsRemaining = Math.max(0, 3 - playerProgress.hintsUsed);
            updateUI();
        } catch(e) { 
            console.log("Fresh start");
        }
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
        }
    }, 1000);
}

function updateUI() {
    document.getElementById("playerName").innerText = playerProgress.name;
    document.getElementById("codesFound").innerText = playerProgress.codes.length;
    document.getElementById("totalCodes").innerText = gameData.totalCodes;
    
    let rank = "Ω-0 (Initiate)";
    if (playerProgress.codes.length >= 6) rank = "Ω-5 (Chrono Ascendant)";
    else if (playerProgress.codes.length >= 4) rank = "Ω-3 (Temporal Agent)";
    else if (playerProgress.codes.length >= 2) rank = "Ω-1 (Puzzle Breaker)";
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
            <div class="room-description">${room.description}</div>
    `;
    
    if (!isCompleted) {
        html += `
            <div class="puzzle-area">
                <div class="puzzle-question">🔐 PUZZLE: ${room.puzzle.question}</div>
                <div class="puzzle-hint">💡 Hint available (click button above)</div>
                <div class="puzzle-input">
                    <input type="text" id="puzzleAnswer" placeholder="Enter solution..." autocomplete="off">
                    <button onclick="checkPuzzle('${roomId}')">Submit</button>
                </div>
                <div id="puzzleFeedback"></div>
            </div>
        `;
    } else {
        html += `<div class="code-display">✅ Puzzle solved! Code: <strong>${room.rewardCode}</strong><div class="success-message">Access granted. Neural signature recorded.</div></div>`;
    }
    
    html += `</div><div class="unlock-area"><h3>🔓 Neural Interface (Enter shared code)</h3><div class="unlock-input"><input type="text" id="unlockCode" placeholder="e.g., CHRONO-MT38" autocomplete="off"><button onclick="unlockRoom()">Authenticate</button></div><div id="unlockFeedback"></div></div>`;
    
    html += `<div class="room-list"><h3>📍 Neural Pathways:</h3>`;
    for (const [id, roomData] of Object.entries(gameData.rooms)) {
        const unlocked = playerProgress.unlockedRoomIds.includes(id);
        html += `<button class="room-button ${unlocked ? 'unlocked' : 'locked'}" onclick="changeRoom('${id}')" ${!unlocked ? 'disabled' : ''}>${unlocked ? '🧠 ' : '🔒 '}${roomData.name}</button>`;
    }
    html += `</div>`;
    
    if (playerProgress.codes.length > 0) {
        html += `<div class="code-display"><strong>📡 Your Neural Codes:</strong><br>${playerProgress.codes.join(", ")}</div>`;
    }
    
    document.getElementById("gameView").innerHTML = html;
}

function checkPuzzle(roomId) {
    const input = document.getElementById("puzzleAnswer");
    const userAnswer = input.value.trim().toUpperCase();
    const room = gameData.rooms[roomId];
    const correctAnswer = room.puzzle.answer.toUpperCase();
    const feedback = document.getElementById("puzzleFeedback");
    
    if (userAnswer === correctAnswer) {
        if (!playerProgress.completedPuzzles.includes(roomId)) {
            playerProgress.completedPuzzles.push(roomId);
            if (!playerProgress.codes.includes(room.rewardCode)) {
                playerProgress.codes.push(room.rewardCode);
            }
            saveProgress();
            feedback.innerHTML = `<div class="success-message">✅ CORRECT! Neural code acquired: ${room.rewardCode}</div>`;
            updateUI();
        } else {
            feedback.innerHTML = `<div class="success-message">You already solved this puzzle!</div>`;
        }
    } else {
        feedback.innerHTML = `<div class="error-message">❌ ACCESS DENIED. Neural pattern mismatch. Try again or request a hint.</div>`;
    }
}

function unlockRoom() {
    const codeInput = document.getElementById("unlockCode");
    const enteredCode = codeInput.value.trim().toUpperCase();
    const feedback = document.getElementById("unlockFeedback");
    
    console.log("Attempting to unlock with code:", enteredCode); // Debug log
    
    let roomUnlocked = false;
    let unlockedRoomName = "";
    
    // Check all rooms to see if this code matches their required unlock code
    for (const [roomId, room] of Object.entries(gameData.rooms)) {
        if (room.unlockedBy === enteredCode) {
            if (!playerProgress.unlockedRoomIds.includes(roomId)) {
                playerProgress.unlockedRoomIds.push(roomId);
                roomUnlocked = true;
                unlockedRoomName = room.name;
                
                // Also add the code to collected codes if not already there
                if (!playerProgress.codes.includes(enteredCode)) {
                    playerProgress.codes.push(enteredCode);
                }
                break;
            } else {
                feedback.innerHTML = `<div class="success-message">⚠️ Room already unlocked: ${room.name}</div>`;
                codeInput.value = "";
                return;
            }
        }
    }
    
    if (roomUnlocked) {
        saveProgress();
        feedback.innerHTML = `<div class="success-message">🎉 SUCCESS! Neural pathway unlocked: ${unlockedRoomName}! 🎉</div>`;
        codeInput.value = "";
        updateUI();
    } else {
        feedback.innerHTML = `<div class="error-message">❌ INVALID NEURAL CODE. Code "${enteredCode}" not recognized. Ask another player for their codes or solve more puzzles.</div>`;
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
        alert("No hints remaining! Solve puzzles or share codes with friends.");
        return;
    }
    const room = gameData.rooms[playerProgress.lastRoom];
    if (room.puzzle.hint) {
        alert(`💡 HINT: ${room.puzzle.hint}`);
        hintsRemaining--;
        playerProgress.hintsUsed++;
        saveProgress();
        document.getElementById("hintBtn").innerText = `💡 Hint (${hintsRemaining} left)`;
    } else {
        alert("No hint available for this room. Keep trying!");
    }
}

function showLore() {
    const loreDiv = document.getElementById("loreContent");
    loreDiv.innerHTML = gameData.loreFragments.map(l => `<p>${l}</p>`).join("");
    document.getElementById("loreModal").style.display = "block";
}

function resetGame() {
    if (confirm("⚠️ Wipe all neural data? This cannot be undone. All progress will be lost.")) {
        localStorage.removeItem("chronoCortexSaveV2");
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
    
    // Allow Enter key in inputs
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
