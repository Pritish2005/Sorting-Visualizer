// creating array of size n and inserting random values
const n=20;
const array=[];
const toggler=[];
init();//automatically calls on refresh

const initButton=document.getElementById("init");

initButton.addEventListener("click",()=>{
    init();
})

function init(){

    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showbars();
}

function toggleBubbleSort(){
    function play(){
        const copy=[...array]
        const moves=bubbleSort(copy,n) ;
        animate(moves);
    }
    play();
}


// console.log(array);


function animate(moves) {
    if(moves.length==0){
        showbars();
        return;
    }
    const move=moves.shift();
    const [i,j]=move.indices;
    if(move.type=="swap"){
        [array[i],array[j]]=[array[j],array[i]];
    }
    showbars(move);
    setTimeout(function(){
        animate(moves);
    },50);
}

// Visualizing array 
function showbars(move){
    container.innerHTML=" ";//to clear the container before sorting
    for(let i=0;i<n;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(move && move.indices.includes(i)){
            // To show what being sorted
            bar.style.backgroundColor=
                move.type=="swap"?"red":"blue";
        }
        container.appendChild(bar);
    }
}

// function play(){
//     const copy=[...array]
//     // const moves=bubbleSort(copy,n) ;
//     // const moves=insertionSort(copy,n) ;
//     // const moves=quickSort(copy) ;
//     // const moves=heapSort(copy) ;
//     // const moves=selectionSort(copy) ;
//     animate(moves);
// }





// Sorting Algorithms

// sorting array
function bubbleSort(arr, n)
{
    console.log("Trying bubble sort")
    // to record the moves
    const moves=[];

    var i, j, temp;
    var swapped;
    for (i = 0; i < n - 1; i++) 
    {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) 
        {
            moves.push({indices:[j,j+1],type:"comp"});
            if (arr[j] > arr[j + 1]) 
            {
                moves.push({indices:[j,j+1],type:"swap"});
                // Swap arr[j] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // if no two elements were 
        // swapped by inner loop, then break
        if (swapped == false)
        break;
    }

    return moves;
}

function insertionSort(arr, n) {
    const moves = [];

    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            moves.push({ indices: [j - 1, j], type: "comp" });
            moves.push({ indices: [j - 1, j], type: "swap" });
            // Swap arr[j] and arr[j-1]
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            j--;

            // Update indices for comparison
            moves.push({ indices: [j, j + 1], type: "comp" });
        }
    }

    return moves;
}

function quickSort(arr) {
    const moves = [];

    function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            moves.push({ indices: [j, high], type: "comp" });
            if (arr[j] < pivot) {
                i++;

                moves.push({ indices: [i, j], type: "swap" });
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        moves.push({ indices: [i + 1, high], type: "swap" });
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    function _quickSort(arr, low, high) {
        if (low < high) {
            let pi = partition(arr, low, high);

            _quickSort(arr, low, pi - 1);
            _quickSort(arr, pi + 1, high);
        }
    }

    _quickSort(arr, 0, arr.length - 1);
    return moves;
}

function heapSort(arr) {
    const moves = [];

    // Function to heapify a subtree rooted with node i which is an index in arr[]
    function heapify(arr, n, i) {
        let largest = i; // Initialize largest as root
        let left = 2 * i + 1; // left = 2*i + 1
        let right = 2 * i + 2; // right = 2*i + 2

        // If left child is larger than root
        if (left < n) {
            moves.push({ indices: [i, left], type: "comp" });
            if (arr[left] > arr[largest])
                largest = left;
        }

        // If right child is larger than largest so far
        if (right < n) {
            moves.push({ indices: [largest, right], type: "comp" });
            if (arr[right] > arr[largest])
                largest = right;
        }

        // If largest is not root
        if (largest !== i) {
            moves.push({ indices: [i, largest], type: "swap" });
            let temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }

    // Build heap (rearrange array)
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr, arr.length, i);
    }

    // One by one extract an element from heap
    for (let i = arr.length - 1; i > 0; i--) {
        // Move current root to end
        moves.push({ indices: [0, i], type: "swap" });
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // call max heapify on the reduced heap
        heapify(arr, i, 0);
    }

    return moves;
}

function selectionSort(arr) {
    const moves = [];

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            moves.push({ indices: [minIndex, j], type: "comp" });
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            moves.push({ indices: [i, minIndex], type: "swap" });
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return moves;
}