const container = document.querySelector(".algorithm-container");
var flag = 0;
var isStopped = 0;
const defaultNumElements = 10;
var numElements = defaultNumElements;

document.getElementById("halt-algorithm").addEventListener("click", function(){
  flag = 1;
  document.getElementById("halt-algorithm").setAttribute("disabled", "true");
  document.getElementById("play-algorithm").removeAttribute("disabled");
})

document.getElementById("stop-algorithm").addEventListener("click", function(){
  isStopped = 1;
})

function generateArray(num = 10){

  var isPresent = document.querySelectorAll("div");

  if(isPresent.length > 0){
    container.innerHTML = '';
  }

  for(let i = 0; i < num; i++){
      // Generate a random value from 1 - 100  
      const value = Math.floor(Math.random() * 100) + 1;

      // Create a div and add a class "bar" to it for each bar
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${value * 3}px`;

      bar.style.transform = `translateX(${i * 30}px)`;
      // equivalent in CSS to transform: translateX(...)

      // We want the random integer value placed within each bar
      const label = document.createElement("label");
      label.classList.add("bar-value");
      label.innerHTML = value;
      bar.appendChild(label);
      container.appendChild(bar);
  }
}

var indexContainer = document.getElementById("indices");
function generateIndices(){
    for(var i = 0; i < numElements; i++){
        var indexElement = document.createElement("div");
        indexElement.classList.add("idx");
        indexElement.style.height = `${20}px`;
        indexElement.style.transform = `translateX(${i * 30}px)`;

        // Adding these indices
        var indexElementLabel = document.createElement("label");
        indexElementLabel.classList.add("idx-id");
        indexElementLabel.innerText = i;

        // Append index blocks to the HTML page
        indexElement.appendChild(indexElementLabel);
        indexContainer.appendChild(indexElement);
    }
}

// Promise function to swap elements
function swap(element1, element2){
    return new Promise((res) => {
        var temp = element1.style.transform;
        element1.style.transform = element2.style.transform;
        element2.style.transform = temp;

        window.requestAnimationFrame(() => {

          // Timer for 250 ms
          setTimeout(() => {
            container.insertBefore(element2, element1);
            res();
          }, 250);
        });
    });
}

// Note: Add a delay feature
async function bubbleSort(){

    let arrayBars = document.querySelectorAll(".bar");
    // Note: Promises, async/await
    
    for(var i = 0; i < arrayBars.length; i++){
      // arrayBars[i].style.backgroundColor = "darkblue"; // Change this color later to something more user-friendly
      for(var j = 0; j < arrayBars.length - i - 1; j++){
        arrayBars[j].style.backgroundColor = "red";
        arrayBars[j + 1].style.backgroundColor = "darkblue";
        

        // Set delay
        await new Promise((res) =>
          setTimeout(() => {
            res();
          }, 300) // Set a timer for 300 ms
        );

        // Compare values
        var value1 = parseInt(arrayBars[j].childNodes[0].innerHTML);
        var value2 = parseInt(arrayBars[j + 1].childNodes[0].innerHTML);

        if(value1 > value2){
          await swap(arrayBars[j], arrayBars[j + 1]);
          arrayBars = document.querySelectorAll(".bar");
        }

        if(flag == 1) await pauseAlgorithm();

        if (isStopped == 1){
          arrayBars[i].style.backgroundColor = "rgb(0, 183, 255)";
          arrayBars[j].style.backgroundColor = "rgb(0, 183, 255)";
          arrayBars[minimumIdx].style.backgroundColor = "rgb(0, 183, 255)";
          document.getElementById("generate-arr-button").disabled = false;
          document.getElementById("selection-button").disabled = false;
          isStopped = 0;
          return;
        }
      
        arrayBars[j].style.backgroundColor = "rgb(0, 183, 255)";
        arrayBars[j + 1].style.backgroundColor = "rgb(0, 183, 255)";
      
      }

        arrayBars[arrayBars.length - i - 1].style.backgroundColor = "rgb(49, 226, 13)";

    }

    // Enable user buttons
    document.getElementById("generate-arr-button").disabled = false;
    document.getElementById("generate-arr-button").style.backgroundColor = "#6f459e";
    
    document.getElementById("selection-button").disabled = false;
    document.getElementById("selection-button").style.backgroundColor = "#6f459e";

}

generateArray();
generateIndices();

// Regenerate a new array on page reload
function generate(){
  window.location.reload();
}

// Start/stop algorithm
function pauseAlgorithm(){
  return new Promise(res => {
    let isClicked = function() {
      document.getElementById("halt-algorithm").removeAttribute("disabled");
      document.getElementById("play-algorithm").setAttribute("disabled", "true");
      document.getElementById("play-algorithm").removeEventListener("click", isClicked);

      flag = 0;
      res("resolved");
    }

    document.getElementById("play-algorithm").addEventListener("click", isClicked)

  })
}