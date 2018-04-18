document.getElementById('analyseButton').addEventListener('click', analyze);

function analyze() {
  let url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender';
  let passcode = ' 85163d058f534c0188eedaa79e60e771';

  let srcImg = document.getElementById("input").value;
  document.querySelector('#myImg').src = srcImg;

  let reqBody = {
    'url': srcImg
  };

  var myHeader = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': passcode
  });

  var initObject = {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: myHeader
  }

  var request = new Request(url, initObject);
  fetch(request)
  .then( (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(res.statusText));
    }
  }).then( (res) => {
      if (!res[0].age && res[0].gender == undefined) {
        console.log(res[0].faceAttributes);
         document.getElementById("attribs").innerHTML=
         `<strong>Age: </strong>${res[0].faceAttributes.age}</br>
          <strong>Gender: </strong>${res[0].faceAttributes.gender}`
      }
    }).catch( (err) => {
    alert(err);
    console.log(err);
    document.getElementById("attribs").innerHTML = " ";
});
  }
