// Runtime = How long your code takes to complete
/* 

    The ranking of runtimes (best to worst) goes like so:
        1. O(1) <- constant time
        2. O(log(n)) <- Grows very slow
        3. O(n) <- Linear
        4. O(n * log(n)) <- Grows faster
        5. O(n^2)
        6. O(n^3)
        7. O(n^n)
        8. O(2^n)
        9. O(n!)



*/   

function bubbleSortAsc(arr){
    // Reaaally inefficient algorithm 

    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr.length - 1; j++){
            // Check if element is already swapped
            if(arr[j] > arr[j + 1]){
                // Swap values
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;

}

function bubbleSortDesc(arr){
    // Reaaally inefficient algorithm 

    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr.length - 1; j++){
            // Check if element is already swapped
            if(arr[j] < arr[j + 1]){
                // Swap values
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

class bubbleSortTest {
    constructor(){
        var array = [1, 3, 2, 6, 8, 5, 4, 12, 9, 7, 10, 11];

        var arrayResult = bubbleSortAsc(array);

        if(this.testBubbleSort(arrayResult)){
            console.log("Pass!!");
        }

    }

    testBubbleSort(arr){
        // Testing sorting algorithms

        for(var i = 0; i < arr.length; i++){
            if(arr[i + 1] < arr[i]){
                return false;
            }
        }

        return true;
    }

}

const test1 = new bubbleSortTest();

