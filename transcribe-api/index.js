
const fs = require('fs');
const fetch = require('node-fetch');
const express = require('express')
const FormData = require('form-data');
const axios = require('axios');
// const fetch = require("fetch")
const vttToJson = require("vtt-to-json")


const app = express()
const port = 3001

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.get('/get', (req, res) => {
    const fileName = fs.createReadStream('../audio1.mp3');

    const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';
    const token = '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';
    const model = 'whisper-1';
    const responseFormat = 'vtt';

    const formData = new FormData();
    formData.append('file', fileName);
    formData.append('model', model);
    formData.append('response_format', responseFormat);


    let vttString = `00:00:00.000 --> 00:00:07.800
    Are you one of those who has plenty of business ideas, but you fail to execute upon them because you don't know where to even start?
    
    00:00:08.280 --> 00:00:15.360
    Are you one of those who are always brimming with ideas and you're like, oh my God, I thought of this five years back.
    
    00:00:16.200 --> 00:00:18.560
    But you know what, somebody else did something about it.
    
    00:00:19.760 --> 00:00:21.320
    The problem is never ideas.
    
    00:00:21.560 --> 00:00:23.600
    The problem is not that you don't know what to do.
    
    00:00:23.800 --> 00:00:32.840
    The problem is that there is no guide, there is no theory, there is no structure to how do you even begin to execute your idea.
    
    00:00:33.320 --> 00:00:38.760
    The truth is nothing is organized for you to create a step by step guide.
    
    00:00:39.000 --> 00:00:40.360
    My name is Ankur Warreku.
    
    00:00:40.400 --> 00:00:42.320
    I'm the co-founder of Nearby.com.
    
    00:00:42.560 --> 00:00:52.160
    I've been an entrepreneur for the last 12 years, raised more than $40 million in funding, got Nearby to a sales of over $100 million annually.
    
    00:00:52.520 --> 00:00:59.240
    And then I quit in 2019, stepped down as the CEO to help build more entrepreneurs.
    
    00:00:59.440 --> 00:01:08.240
    And I've condensed the 12 years of my experience into 16 hours, a course that I call the Complete Guide to Starting Up.
    
    00:01:08.600 --> 00:01:15.680
    Eight chapters that will take you through every possible step that you need to know to start your own business.
    
    00:01:16.160 --> 00:01:18.200
    How do you pick a startup idea?
    
    00:01:18.520 --> 00:01:20.920
    How do you validate the strength of that idea?
    
    00:01:21.160 --> 00:01:23.400
    How do you decide on the co-founding team?
    
    00:01:23.520 --> 00:01:27.520
    How do you decide the split of equity between your co-founder and yourself?
    
    00:01:27.960 --> 00:01:30.040
    Whether you should go for funding or not?
    
    00:01:30.160 --> 00:01:33.000
    How do you decide the first version of your product?
    
    00:01:33.000 --> 00:01:34.120
    How do you build that out?
    
    00:01:34.120 --> 00:01:35.520
    How do you price that product?
    
    00:01:35.520 --> 00:01:40.280
    How do you launch it, market it, and get your first thousand customers or so?
    
    00:01:40.960 --> 00:01:48.040
    Everything that you need to know, packaged in a form that's consumable, coming from somebody who's done it.
    
    00:01:48.400 --> 00:01:54.640
    I've made so many mistakes in the last 12 years that I would love for all of you to learn from those mistakes
    
    00:01:54.640 --> 00:01:58.240
    and never find yourself anymore in a situation where you say,
    
    00:01:58.520 --> 00:02:02.560
    I have so many ideas, but I don't know where to even begin.
    
    00:02:03.240 --> 00:02:07.040
    You can begin your idea journey right now.
    
    00:02:07.400 --> 00:02:10.840
    Sign up for this course, and I will see you inside of it.`;

    vttToJson(vttString)
        .then((result) => {
            console.log(result)
            res.send(result)
        });
    // axios.post(apiUrl, formData, {
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         ...formData.getHeaders(),
    //     },
    // })
    //     .then(response => {
    //         const { entries } = parse(
    //             fs
    //                 .readFileSync(response.data) // or '.srt'
    //                 .toString()
    //         );
    //         console.log(response.data, entries)
    //         res.send(entries)

    //     })
    //     .catch(error => {
    //         res.send(error);
    //     });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})