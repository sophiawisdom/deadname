
let firstTime = true;

async function loadit() {
    const buf = await fetch("/static/scream.wav").then(r => r.arrayBuffer());
    const ctx = new AudioContext();
    const audioBuf = await ctx.decodeAudioData(buf);
    const src = ctx.createBufferSource();
    src.buffer = audioBuf;
    src.loop = true;
    const panner = ctx.createStereoPanner();
    src.connect(panner);
    panner.connect(ctx.destination);
    const canvas = document.getElementById("canvas")
    canvas.onclick = () => {
        if (firstTime) {
            firstTime = false;
            ctx.resume();
            src.start();
        }
    }
    canvas.onmousemove = ({offsetX}) => {
        const porcentage = (2*offsetX/canvas.offsetWidth) - 1;
        panner.pan.setValueAtTime(porcentage, ctx.currentTime);
    }
}

window.onload = () => {
    loadit()
}