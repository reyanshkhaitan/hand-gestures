//https://teachablemachine.withgoogle.com/models/4UJ_JzNnq/model.json
prediction = "";

Webcam.set({
width:350,
height:300,

image_format:'png',
png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
 
}
 console.log('ml5version', ml5.version);

 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4UJ_JzNnq/model.json', modelLoaded);

 function modelLoaded(){
     console.log("modelLoaded");
 }

function speak(){
    var synth = window.speechSynthesis;
    prediction = "This is the outcome" + prediction;
    var utter_this = new SpeechSynthesisUtterance(prediction);
    synth.speak(utter_this);
}

function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}


function gotResult(error, results) {
if (error) {
  console.error(error);
} else {
  console.log(results);
  document.getElementById("result_emotion_name").innerHTML = results[0].label;
  
  prediction_1 = results[0].label;
  prediction_2 = results[1].label;
  speak();
  if(results[0].label == "victory")
  {
      console.log("hi happy");
      document.getElementById("update_emoji").innerHTML = "&#9996;";
  }
  if(results[0].label == "best")
  {
      console.log("hi sad");
      document.getElementById("update_emoji").innerHTML = "&#128077;";
  }
  if(results[0].label == "nice")
  {
      console.log("angry");
      document.getElementById("update_emoji").innerHTML = "&#128077;";
  }

}
}
