// import JXG from 'jsxgraph';

// Just code behind.
function checkStep1() {
    const selected = document.querySelector("input[name='q1']:checked");
    if (!selected) return;
    const feedback = document.getElementById("feedback1");
    if (selected.value === "a") {
        feedback.textContent = "✅ ¡Correcto!"
        document.getElementById("step2").style.display = "block";
    }
    else {
        feedback.textContent = "❌ Intenta de nuevo."
    }
}

function checkStep2() {
    const selected = document.querySelector("input[name='q2']:checked");
    if (!selected) return;
    const feedback = document.getElementById("feedback2");
    if (selected.value === "b") {
        feedback.textContent = "✅ ¡Correcto!";
        document.getElementById("step3").style.display = "block";
    } else {
        feedback.textContent = "❌ Intenta de nuevo."
    }
}

function checkStep3() {
    const selected = document.querySelector("input[name='q3']:checked");
    if (!selected) return;
    var feedback = document.getElementById("feedback3");
    if (selected.value === "b") {
        feedback.textContent = "✅ ¡Correcto!";
        document.getElementById("graph").style.display = "block";
        drawGraph();
    } else {
        feedback.textContent = "❌ Intenta de nuevo."
    }
}

function drawGraph() {
    const board = JXG.JSXGraph.initBoard('jxgbox', {
        boundingBox: [-2, 20, 4, -10],
        axis: true
    })
}