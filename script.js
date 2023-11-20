
// audioSource = audioCtx.createMediaElementSource(audio1);
// analyser = audioCtx.createAnalyser();
// audioSource.connect(analyser);
// console.log(analyser, 'analyser')

// analyser.connect(audioCtx.destination);

// analyser.fftSize = 128;
// // console.log(analyser, 'analyser')
// const bufferLength = analyser.frequencyBinCount;
// const dataArray = new Uint8Array(bufferLength);
// const barWidth = canvas.width / bufferLength;
// let barHeight;
// animate(dataArray, barWidth, barHeight, bufferLength, analyser);

// let x = 0;
// function animate(dataArray, barWidth, barHeight, bufferLength, analyser) {
//     x = 0;
//     console.log('animate')
//     analyser.getByteFrequencyData(dataArray);
//     for (let i = 0; i < bufferLength; i++) {
//         barHeight = dataArray[i];
//         ctx.fillStyle = "white";
//         ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//         x += barWidth;
//     }

// }


// for (let i = 0; i < bufferLength; i++) {
//     barHeight = dataArray[i];
//     const red = (i * barHeight) / 10;
//     const green = i * 4;
//     const blue = barHeight / 4 - 12;
//     ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
//     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//     x += barWidth;
// }

function main() {
    let audio1 = new Audio();
    audio1.src = "./audio.mp3";
    const container = document.getElementById("container");
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    let analyser;
    let audioSource;




    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // audio1 = new Audio();
    // audio1.src = "./audio.mp3"; 
    let flag = 0;
    document.getElementById('audio-svg').addEventListener('click', () => {
        const audioContext = new AudioContext();

        if (!audio1.paused)
            audio1.pause();
        else
            audio1.play()
        if (flag == 0) {
            audioSource = audioContext.createMediaElementSource(audio1);
            analyser = audioContext.createAnalyser();
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
            console.log(analyser, 'this')
            analyser.fftSize = 512;
            flag = 1;
        }
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const barWidth = canvas.width / bufferLength;
        let barHeight;
        let x

        function animate() {
            x = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            for (i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 2;
                ctx.fillStyle = 'white';
                ctx.fillRect(i * barWidth, (canvas.height - barHeight) / 2, barWidth * i, barHeight, 'white');
                x += barWidth
            }

            requestAnimationFrame(animate)
        }
        animate()
    })

    // console.log(getSamples(analyser, dataArray), 'samples')


    // function getSamples(analyser, dataArray) {
    //     analyser.getByteTimeDomainData(dataArray)
    //     let normSamples = [...dataArray].map(e => e / 128 - 1);
    //     return normSamples
    // }
    // // const barWidth = canvas.width / bufferLength;
    // let barHeight;

    // // })


    // class Bar {
    //     constructor(x, y, width, height, color) {
    //         this.x = x;
    //         this.y = y;
    //         this.width = width;
    //         this.height = height;
    //         this.color = color
    //     }
    //     update(micInput) {
    //         this.height = micInput
    //     }
    //     draw(context) {
    //         context.fillStyle = this.color;
    //         context.fillRect(this.x, this.y, this.width, this.height)
    //     }
    // }
    // let bars = []


    // function createBars() {
    //     for (let i = 0; i < 256; i++) {
    //         bars.push(new Bar(i * barWidth, canvas.height / 2, 2, 100, 'white'))
    //     }
    // }
    // createBars();
    // console.log(analyser, 'jeueegn');
    // function animate() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     // bar1.draw(ctx)
    //     bars.forEach(function (bar) {
    //         bar.draw(ctx)
    //     })
    //     requestAnimationFrame(animate);


    // }
    // animate()
}
main()