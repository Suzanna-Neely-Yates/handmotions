// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;

let ballLocation = [0, 250];
let ballAngle = 0;

let leftBar = 0;
let rightBar = 0;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    //console.log(poses); 
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}


function modelLoaded() {
    console.log('poseNet ready');
}

function bounceBall() {
    ballAngle + PI
}

function collisionDetector() {
    // check if hits wall
    ballX = ballLocation[0];
    ballY = ballLocation[1];

    if (ballY + 5 === 480 || ballY - 5 === 0) {
        bounceBall();
    } else if (ballX = 5 === rightBar || ballX - 5 === leftBar) {
        bounceBall();
    }
}

function draw() {
    // flip camera
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0);

    console.log("HELLO");
    setTimeout(function () {
        collisionDetector()
        y = Math.sin(ballAngle) + ballLocation[1];
        x = Math.cos(ballAngle) + ballLocation[0];
        ballLocation = [x, y];
        leftBar = 0;
        rightBar = 0;
    }, 100);
    console.log("DOG");

    if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, d);
        fill(0, 0, 255);
        square(20, (pose.rightWrist.y - 50), 32);
        square(550, (pose.leftWrist.y - 50), 32);

        ellipse(ballLocation[0], ballLocation[1], 32);


        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}