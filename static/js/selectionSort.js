const container = document.querySelector(".algorithm-container");
var flag = 0;
var isStopped = 0;

document.getElementById("halt-algorithm").addEventListener("click", function(){
  flag = 1;
  document.getElementById("halt-algorithm").setAttribute("disabled", "true");
  document.getElementById("play-algorithm").removeAttribute("disabled");
})

document.getElementById("stop-algorithm").addEventListener("click", function(){
  isStopped = 1;
})

// Generate the sorting bars (default value is 20)
function generateArray(num = 20){

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

// We need an async/await function for each of our algorithms
// Sorting algorithms are still really fast. So fast, that it'd be useless to visualize them at their intended speed

async function selectionSort(){

    let arrayBars = document.querySelectorAll(".bar");
    // Note: Promises, async/await
    var minimumIdx = 0;
    for(var i = 0; i < arrayBars.length; i++){
      minimumIdx = i;

      if(isStopped == 1) break;

      arrayBars[i].style.backgroundColor = "darkblue"; // Change this color later to something more user-friendly
      for(var j = i + 1; j < arrayBars.length; j++){
        arrayBars[j].style.backgroundColor = "red";
        
        await new Promise((res) =>
          setTimeout(() => {
            res();
          }, 300) // Set a timer for 300 ms
        );

        // Compare values
        var value1 = parseInt(arrayBars[j].childNodes[0].innerHTML);
        var value2 = parseInt(arrayBars[minimumIdx].childNodes[0].innerHTML);

        if(value1 < value2){
          if(minimumIdx !== i){
            arrayBars[minimumIdx].style.backgroundColor = "rgb(169, 169, 169)";
          }

          minimumIdx = j;
        } else {
          // Do another thing
          arrayBars[j].style.backgroundColor = "rgb(24, 190, 255)";
        }

        if(flag == 1) await pauseAlgorithm();
        if (isStopped == 1){
          arrayBars[i].style.backgroundColor = "rgb(0, 183, 255)";
          arrayBars[j].style.backgroundColor = "rgb(0, 183, 255)";
          arrayBars[minimumIdx].style.backgroundColor = "rgb(0, 183, 255)";
          break;
        }
      }

      // Swap values
      var temp1 = arrayBars[minimumIdx].style.height;
      var temp2 = arrayBars[minimumIdx].childNodes[0].innerText;
      arrayBars[minimumIdx].style.height = arrayBars[i].style.height;
      arrayBars[i].style.height = temp1;
      arrayBars[minimumIdx].childNodes[0].innerText = arrayBars[i].childNodes[0].innerText;
      arrayBars[i].childNodes[0].innerText = temp2;

      // Write some code to interface with the HTML page
      await new Promise((res) =>
        setTimeout(() => {
          res();
        }, 300)
      );

        arrayBars[minimumIdx].style.backgroundColor = "rgb(24, 190, 255)";
        arrayBars[i].style.backgroundColor = "rgb(49, 226, 13)";

    }

    // Enable user buttons
    document.getElementById("generate-arr-button").disabled = false;
    document.getElementById("generate-arr-button").style.backgroundColor = "#6f459e";
    
    document.getElementById("selection-button").disabled = false;
    document.getElementById("selection-button").style.backgroundColor = "#6f459e";

}

generateArray();

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

// Disable user buttons
// function disableUserButtons(){
//   document.getElementById("generate-arr-button").disabled = true;
//   document.getElementById("generate-arr-button").style.backgroundColor = "#d8b6ff";
//   document.getElementById("selection-button").disabled = true;
//   document.getElementById("selection-button").style.backgroundColor = "#d8b6ff";
// }