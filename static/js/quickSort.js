const container = document.querySelector(".algorithm-container");
var flag = 0;
var isStopped = 0;
const defaultNumElements = 10;
var numElements = defaultNumElements; // Change this to accept user input

document.getElementById("halt-algorithm").addEventListener("click", function(){
  flag = 1;
  document.getElementById("halt-algorithm").setAttribute("disabled", "true");
  document.getElementById("play-algorithm").removeAttribute("disabled");
})

document.getElementById("stop-algorithm").addEventListener("click", function(){
  isStopped = 1;
})

function generateArray(num = numElements){

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
        indexElement.style.transform = `translate(${i * 30}px)`;

        // Adding these indices
        var indexElementLabel = document.createElement("label");
        indexElementLabel.classList.add("idx-id");
        indexElementLabel.innerText = i;

        // Append index blocks to the HTML page
        indexElement.appendChild(indexElementLabel);
        indexContainer.appendChild(indexElement);
    }
}

// We need an async/await function for each of our algorithms
// Sorting algorithms are still pretty fast (relatively). Fast enough that it'd be useless to visualize them at their intended speed
async function quickSortLometo(leftIdx, rightIdx, delay = 300){
    var arrayBars = document.querySelectorAll(".bar");
    // Note: Promises, async/await
    var pivot = parseInt(arrayBars[rightIdx].childNodes[0].innerHTML);
    var i = leftIdx - 1;
    arrayBars[rightIdx].style.backgroundColor = "red";

    for(var j = leftIdx; j <= rightIdx - 1; j++){
        arrayBars[j].style.backgroundColor = "darkblue"; // Change this color later to something more user-friendly
        
        await new Promise((res) =>
            setTimeout(() => {
            res();
            }, delay) // Set a timer for 300 ms
        );

        // Compare values
        var value1 = parseInt(arrayBars[j].childNodes[0].innerHTML);

        if(value1 < pivot){
            i++;
            var temp1 = arrayBars[i].style.height;
            var temp2 = arrayBars[i].childNodes[0].innerText;
            arrayBars[i].style.height = arrayBars[j].style.height;
            arrayBars[j].style.height = temp1;
            arrayBars[i].childNodes[0].innerText = arrayBars[j].childNodes[0].innerText;
            arrayBars[j].childNodes[0].innerText = temp2;
            arrayBars[i].style.backgroundColor = "orange";

            if (i != j){
                arrayBars[j].style.backgroundColor = "rgb(24, 190, 255)";
            }

            await new Promise((res) => 
                setTimeout(() => {
                    res();
                }, delay)
            );

        } else {
            // Do another thing
            arrayBars[j].style.backgroundColor = "rgb(24, 190, 255)";
        }

        if(flag == 1) await pauseAlgorithm();

        if (isStopped == 1){
            arrayBars[i].style.backgroundColor = "rgb(0, 183, 255)";
            arrayBars[j].style.backgroundColor = "rgb(0, 183, 255)";
            document.getElementById("generate-arr-button").disabled = false;
            document.getElementById("selection-button").disabled = false;
            isStopped = 0;
            return;
        }

    }

    // Swap values
    i++;
    var temp1 = arrayBars[i].style.height;
    var temp2 = arrayBars[i].childNodes[0].innerText;
    arrayBars[i].style.height = arrayBars[rightIdx].style.height;
    arrayBars[rightIdx].style.height = temp1;
    arrayBars[i].childNodes[0].innerText = arrayBars[rightIdx].childNodes[0].innerText;
    arrayBars[rightIdx].childNodes[0].innerText = temp2;
    arrayBars[rightIdx].style.backgroundColor = "rgb(24, 190, 255)";
    arrayBars[i].style.backgroundColor = "rgb(49, 226, 13)";

    // Write some code to interface with the HTML page
    await new Promise((res) =>
      setTimeout(() => {
        res();
      }, delay)
    );

    // Enable user buttons
    document.getElementById("generate-arr-button").disabled = false;
    document.getElementById("generate-arr-button").style.backgroundColor = "#6f459e";
    
    document.getElementById("selection-button").disabled = false;
    document.getElementById("selection-button").style.backgroundColor = "#6f459e";
    return i;
}

async function quickSort(leftIdx = 0, rightIdx = numElements - 1, delay = 300){
    if(leftIdx < rightIdx){
        var pivot = await quickSortLometo(leftIdx, rightIdx);
        await quickSort(leftIdx, pivot - 1);
        await quickSort(pivot + 1, rightIdx);
    }
}

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

generateArray();
generateIndices();
