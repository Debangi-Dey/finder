video = "";
status1 = ""
Objects = []
ObjName = ""

function preload() {
    video = createVideo("video.mp4");
}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
    video.hide();

}

function draw() {
    image(video, 0, 0, 350, 350);
    if (status1 != "") {
        objD.detect(video, getResult)
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected"
            document.getElementById("noObj").innerHTML = "no. of Objects : " + Objects.length

            fill("red")
            perc = floor(Objects[i].confidence * 100)
            text(Objects[i].label + " " + perc + "%", Objects[i].x - 30, Objects[i].y)
            noFill()
            stroke("pink")
            rect(Objects[i].x - 30, Objects[i].y, Objects[i].width, Objects[i].height)
            if (ObjName == Objects[i].label) {
                video.stop()
                document.getElementById("status").innerHTML = ObjName + " Found"
                s = window.speechSynthesis
                utter = new SpeechSynthesisUtterance(ObjName + " Found")
                s.speak(utter)
            } else {
                document.getElementById("status").innerHTML = ObjName + " Not Found"
                s = window.speechSynthesis
                utter = new SpeechSynthesisUtterance(ObjName + " Not Found")
                s.speak(utter)
            }
        }
    }

}

function start() {
    objD = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status : Detecting Objects"
    ObjName = document.getElementById("objName").value
}

function getResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        Objects = results

    }
}

function modelLoaded() {
    status1 = true
    video.loop()
    video.speed(1)
    video.volume(1)
}