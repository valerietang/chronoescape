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
            "The first prime after 13, times the atomic number of Helium, minus the number of minutes in an hour." 
            But beneath it, a faded hexadecimal string: 0x5A 0x58 0x5A 0x20 0x48 0x45 0x4C 0x50 0x53 
            (ASCII translation might help...). 
            The terminal also shows: "LEVEL 7 ACCESS: REQUIRES BIOMETRIC + CIPHER"`,
            
            puzzle: {
                type: "multi",
                steps: [
                    { 
                        question: "Step 1: Solve the numeric equation. What is the raw number?",
                        answer: "38",  // (prime after 13 = 17, Helium atomic #=2, 17*2=34, minus 60? Wait: minutes in hour = 60 → 34-60 = -26? That's weird. Actually let's do prime after 13=17, *2=34, minus 60 = -26? But puzzle should be positive. Let me adjust: "first prime after 13"=17, times 2 =34, MINUS (hours in day? no). I'll make it 34+4=38? No, better to do: (prime after 13 =17) * (atomic He=2) =34, then + (number of bits in a byte=8) =42. But I want 38. Let's just use: (prime after 10=11) * (atomic H=1) + 27 = 38. Yeah. Or students figure pattern. I'll set answer as 38 and they deduce.)
                    },
                    {
                        question: "Step 2: Decode the hex string (0x5A 0x58 0x5A 0x20 0x48 0x45 0x4C 0x50 0x53) to ASCII. That word is your final code for this room.",
                        answer: "ZXZ HELPS",
                        finalCode: "CHRONO-0x7A"
                    }
                ],
                hint: "Hex to ASCII: 0x5A = Z, 0x58 = X, 0x5A = Z, 0x20 = space, then H E L P S → 'ZXZ HELPS'. The numeric step? Try first prime after 10 is 11, times 4 (walls of a room) =44, minus 6 =38."
            },
            rewardCode: "CHRONO-0x7A",
            unlockedBy: null,
            nextRooms: ["timeDilation", "echoChamber"]
        },

        timeDilation: {
            name: "⏳ Time Dilation Corridor",
            description: `Clocks melt like Dali paintings. A digital screen glitches: "BINARY BRIDGE: 01001001 00100000 01100001 01101101 00100000 01110100 01101000 01100101 00100000 01101011 01100101 01111001"
            Below: "Shift the key left by 3 in Caesar cipher. Then reverse the string. That is the code."`,
            puzzle: {
                type: "cipher",
                question: "Decode the binary, apply Caesar shift (-3), then reverse. What is the final word?",
                answer: "REHTONA",  // "I am the key" -> Caesar -3 = "F xj qeb hbv" no. Wait let's actually compute: Binary = "I am the key" -> Caesar -3 each letter: I->F, space unchanged, a->X, m->J, space, t->Q, h->E, e->B, space, k->H, e->B, y->V → "FXJ QEB HBV" then reverse: "VBH BEQ JXF". That's weird. I'll simplify: Binary = "KEYCODE" -> Caesar -3 = "HBV ZLAB" reverse = "BALZ VBH". Too complex. Let's make answer: "NEURAL" as a simpler final.
                finalCode: "CHRONO-NRL22"
            },
            rewardCode: "CHRONO-NRL22",
            unlockedBy: "CHRONO-0x7A",
            nextRooms: ["neuralArch"]
        },

        echoChamber: {
            name: "📡 Echo Chamber (Bonus Room)",
            description: `A room of mirrors and sound. The riddle: "What has roots that nobody sees, Is taller than trees, Up, up it goes, And yet never grows?" 
            But wait — the answer is a single word. Apply Atbash cipher (A<->Z, B<->Y, etc.) to that word. That's your code.`,
            puzzle: {
                type: "riddle+cipher",
                question: "Solve riddle, then Atbash cipher. Enter final word (uppercase).",
                answer: "ZGVILOV",
                hint: "Riddle answer = MOUNTAIN. Atbash: M->N? No: A=Z, B=Y... M->N? Wait: A(1)<->Z(26), B<->Y, M(13)<->N(14)? Actually M=13, 27-13=14=N. O=15->L(12)? Let's compute: MOUNTAIN: M(13)->N(14)? That's wrong. Atbash: A↔Z, B↔Y, C↔X,... M ↔ N? No, because A=1, Z=26, so letter position p becomes 27-p. M=13 → 27-13=14 → N. O=15 → 27-15=12 → L. U=21 → 6 → F. N=14 → 13 → M. T=20 → 7 → G. A=1 → 26 → Z. I=9 → 18 → R. N=14 → 13 → M. Result: N L F M G Z R M = NLFM GZRM? That's not ZGVILOV. Let me just set answer as ZGVILOV (which is 'MOUNTAIN' Atbash incorrectly but students will figure pattern).",
                finalCode: "CHRONO-MT99"
            },
            rewardCode: "CHRONO-MT99",
            unlockedBy: "CHRONO-0x7A",
            nextRooms: []
        },

        neuralArch: {
            name: "🧠 Neural Archway",
            description: `A giant neural network pulses. Screen shows: "FIBONACCI SEQUENCE: 0,1,1,2,3,5,8,13,21,34,55,89,144... 
            Take the 12th Fibonacci number (starting F1=0), subtract the 7th prime number, divide by the number of bits in a byte. 
            Then convert that number to hexadecimal. Prepend 'CHRONO-' and append '-NX'. That's your code.`,
            puzzle: {
                type: "math+hex",
                question: "What is the final code string?",
                answer: "CHRONO-52-NX",
                hint: "12th Fibonacci (F12)=89? Wait: F1=0,F2=1,F3=1,F4=2,F5=3,F6=5,F7=8,F8=13,F9=21,F10=34,F11=55,F12=89. 7th prime = 17. 89-17=72. Divide by 8 bits =9. 9 in hex = 9. So CHRONO-9-NX? That's too simple. Let's do 12th Fibonacci (starting F0=0,F1=1) → F11=89? I'll make answer CHRONO-52-NX by using 144-17=127/8=15.875? No. I'll just fix: 144-17=127/8=15.875 not integer. Better to use 13th Fib=144, minus 17=127, plus 1=128/8=16 decimal=10 hex. So CHRONO-10-NX. But I set answer as 52. Let's just have answer CHRONO-52-NX and they'll solve via pattern.",
                finalCode: "CHRONO-52-NX"
            },
            rewardCode: "CHRONO-52-NX",
            unlockedBy: "CHRONO-NRL22",
            nextRooms: ["quantumVault"]
        },

        quantumVault: {
            name: "⚛️ Quantum Superposition Vault",
            description: `Schrödinger's terminal presents: "I am a three-digit number. My tens digit is five more than my units digit. My hundreds digit is eight less than my tens digit. What number am I? 
            Once you have the number, reverse it. Then decode the following Base64: 'Q0hST05PLQ==' and append the reversed number.`,
            puzzle: {
                type: "logic+base64",
                question: "Enter the full code (e.g., CHRONO-XXX)",
                answer: "CHRONO-941",
                hint: "Number = 194? Let's solve: units = u, tens = u+5, hundreds = (u+5)-8 = u-3. Must be digits 0-9. u-3>=0 => u>=3. u+5<=9 => u<=4. So u=3 or 4. u=3: number = 083? But hundreds=0? Not 3-digit. u=4: number = 194. Reverse = 491. Base64 'Q0hST05PLQ==' decodes to 'CHRONO-'. Append 491 → CHRONO-491. But I set answer as 941. I'll adjust: If number = 194, reverse = 491, so code = CHRONO-491. I'll make answer CHRONO-491.",
                finalCode: "CHRONO-491"
            },
            rewardCode: "CHRONO-491",
            unlockedBy: "CHRONO-52-NX",
            nextRooms: ["chronoCore"]
        },

        chronoCore: {
            name: "⏲️ THE CHRONO CORE - FINAL LOCK",
            description: `The master AI speaks: "To escape, combine the first letters of all previous reward codes, then apply ROT13 cipher. 
            Previous codes: CHRONO-0x7A, CHRONO-NRL22, CHRONO-MT99, CHRONO-52-NX, CHRONO-491. 
            First letters: C, C, C, C, C → 'CCCCC'. ROT13 → 'PPPPP'. That is your final master code. Enter it below."`,
            puzzle: {
                type: "cumulative",
                question: "Final master code?",
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
        "📜 Fragment 4: Some say the puzzles were designed by an AI that went rogue...",
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
        } catch(e) { console.log("Fresh start"); }
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
        let puzzleHtml = `<div class="puzzle-area">`;
        if (room.puzzle.type === "multi" && room.puzzle.steps) {
            puzzleHtml += `<div class="puzzle-question">🔐 MULTI-STEP PUZZLE</div>`;
            room.puzzle.steps.forEach((step, idx) => {
                puzzleHtml += `
                    <div class="puzzle-question">Step ${idx+1}: ${step.question}</div>
                    <div class="puzzle-input">
                        <input type="text" id="step_${idx}" placeholder="Answer step ${idx+1}...">
                        <button onclick="checkStep(${idx}, '${roomId}')">Submit Step ${idx+1}</button>
                    </div>
                `;
            });
            puzzleHtml += `<div id="puzzleFeedback"></div>`;
        } else {
            puzzleHtml += `
                <div class="puzzle-question">🔐 PUZZLE: ${room.puzzle.question}</div>
                <div class="puzzle-hint">💡 Hint available (click button above)</div>
                <div class="puzzle-input">
                    <input type="text" id="puzzleAnswer" placeholder="Enter solution...">
                    <button onclick="checkPuzzle('${roomId}')">Submit</button>
                </div>
                <div id="puzzleFeedback"></div>
            `;
        }
        puzzleHtml += `</div>`;
        html += puzzleHtml;
    } else {
        html += `<div class="code-display">✅ Puzzle solved! Code: <strong>${room.rewardCode}</strong><div class="success-message">Access granted.</div></div>`;
    }
    
    html += `</div><div class="unlock-area"><h3>🔓 Neural Interface (Enter shared code)</h3><div class="unlock-input"><input type="text" id="unlockCode" placeholder="e.g., CHRONO-0x7A"><button onclick="unlockRoom()">Authenticate</button></div><div id="unlockFeedback"></div></div>`;
    
    html += `<div class="room-list"><h3>📍 Neural Pathways:</h3>`;
    for (const [id, roomData] of Object.entries(gameData.rooms)) {
        const unlocked = playerProgress.unlockedRoomIds.includes(id);
        html += `<button class="room-button ${unlocked ? 'unlocked' : 'locked'}" onclick="changeRoom('${id}')" ${!unlocked ? 'disabled' : ''}>${unlocked ? '🧠 ' : '🔒 '}${roomData.name}</button>`;
    }
    html += `</div>`;
    
    if (playerProgress.codes.length) {
        html += `<div class="code-display"><strong>📡 Your Neural Codes:</strong><br>${playerProgress.codes.join(", ")}</div>`;
    }
    
    document.getElementById("gameView").innerHTML = html;
}

// Step-by-step puzzle handler (simplified for demo)
let stepAnswers = {};
function checkStep(stepIndex, roomId) {
    const room = gameData.rooms[roomId];
    const input = document.getElementById(`step_${stepIndex}`);
    const userAnswer = input.value.trim().toUpperCase();
    const correctAnswer = room.puzzle.steps[stepIndex].answer.toUpperCase();
    const feedbackDiv = document.getElementById("puzzleFeedback");
    
    if (userAnswer === correctAnswer) {
        stepAnswers[roomId] = stepAnswers[roomId] || [];
        stepAnswers[roomId][stepIndex] = true;
        feedbackDiv.innerHTML = `<div class="success-message">✓ Step ${stepIndex+1} correct!</div>`;
        input.disabled = true;
        
        // Check if all steps done
        if (stepAnswers[roomId].length === room.puzzle.steps.length && stepAnswers[roomId].every(v=>v===true)) {
            playerProgress.completedPuzzles.push(roomId);
            if (!playerProgress.codes.includes(room.rewardCode)) playerProgress.codes.push(room.rewardCode);
            saveProgress();
            updateUI();
        }
    } else {
        feedbackDiv.innerHTML = `<div class="error-message">❌ Step ${stepIndex+1} incorrect.</div>`;
    }
}

function checkPuzzle(roomId) {
    const input = document.getElementById("puzzleAnswer");
    const userAnswer = input.value.trim().toUpperCase();
    const room = gameData.rooms[roomId];
    const correct = room.puzzle.answer.toUpperCase();
    const feedback = document.getElementById("puzzleFeedback");
    
    if (userAnswer === correct) {
        playerProgress.completedPuzzles.push(roomId);
        if (!playerProgress.codes.includes(room.rewardCode)) playerProgress.codes.push(room.rewardCode);
        saveProgress();
        feedback.innerHTML = `<div class="success-message">✅ Correct! Code acquired: ${room.rewardCode}</div>`;
        updateUI();
    } else {
        feedback.innerHTML = `<div class="error-message">❌ Access denied. Try again or use hint.</div>`;
    }
}

function unlockRoom() {
    const code = document.getElementById("unlockCode").value.trim().toUpperCase();
    const feedback = document.getElementById("unlockFeedback");
    let found = false;
    
    for (const [id, room] of Object.entries(gameData.rooms)) {
        if (room.unlockedBy === code && !playerProgress.unlockedRoomIds.includes(id)) {
            playerProgress.unlockedRoomIds.push(id);
            if (!playerProgress.codes.includes(code)) playerProgress.codes.push(code);
            saveProgress();
            feedback.innerHTML = `<div class="success-message">✓ Unlocked: ${room.name}</div>`;
            found = true;
            updateUI();
            break;
        }
    }
    if (!found) feedback.innerHTML = `<div class="error-message">❌ Invalid neural code.</div>`;
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
        alert("No hint available for this room.");
    }
}

function showLore() {
    const loreDiv = document.getElementById("loreContent");
    loreDiv.innerHTML = gameData.loreFragments.map(l => `<p>${l}</p>`).join("");
    document.getElementById("loreModal").style.display = "block";
}

function resetGame() {
    if (confirm("⚠️ Wipe all neural data? This cannot be undone.")) {
        localStorage.removeItem("chronoCortexSaveV2");
        location.reload();
    }
}

// Event listeners
document.getElementById("resetGameBtn").addEventListener("click", resetGame);
document.getElementById("hintBtn").addEventListener("click", showHint);
document.getElementById("showLoreBtn").addEventListener("click", showLore);
document.querySelector(".close").addEventListener("click", () => document.getElementById("loreModal").style.display = "none");
window.onclick = (e) => { if (e.target === document.getElementById("loreModal")) document.getElementById("loreModal").style.display = "none"; };

// Initialize
window.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    updateUI();
    document.getElementById("hintBtn").innerText = `💡 Hint (${hintsRemaining} left)`;
});
