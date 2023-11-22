// import fs from 'fs';
// import fs from "fs/promises";
let JSONValue;
function main() {
    let audio1 = new Audio();
    audio1.src = "./audio1.mp3";
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let analyser;
    let audioSource;
    let flag = 0;
    query(audio1).then((response) => {
        JSONValue = response
    });
    document.getElementById("audio-svg").addEventListener("click", () => {
        const audioContext = new AudioContext();
        if (!audio1.paused) audio1.pause();
        else audio1.play();


        audio1.addEventListener('timeupdate', () => {
            let currentTime = audio1.currentTime * 1000


            JSONValue.forEach(element => {
                if (currentTime >= element.start && currentTime <= element.end) {

                    document.getElementById('audio-text').innerHTML = element.part
                }
            });

        })


        if (flag === 0) {
            audioSource = audioContext.createMediaElementSource(audio1);
            analyser = audioContext.createAnalyser();
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 512;
            flag = 1;
        }
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const barWidth = canvas.width / bufferLength;
        let barHeight;
        let x;

        function animate() {
            x = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 2;
                ctx.fillStyle = "white";

                ctx.fillRect(
                    i * barWidth,
                    (canvas.height - barHeight) / 1.4,
                    barWidth * i,
                    barHeight,
                    "white"
                );
                x += barWidth;
            }

            requestAnimationFrame(animate);
        }
        animate();
    });
}
main();

async function query(audio1) {
    let res;
    // if (!audio1.paused) {
    const fileName = await axios.get("http://localhost:3001/get");
    res = fileName.data;
    // }
    return res
}
