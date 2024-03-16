function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle); // Split array into left half

    const right = arr.slice(middle);   // Split array into right half

    console.log("Left half:", left);
    console.log("Right half:", right);
    console.log("----------------------");

    return merge(mergeSort(left), mergeSort(right)); // Recursively merge sorted halves
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]); // Add smaller element from left half
            leftIndex++;
        } else {
            result.push(right[rightIndex]); // Add smaller element from right half
            rightIndex++;
        }
    }

    // Add remaining elements from left and right halves
    console.log("Merging:", result.concat(left.slice(leftIndex), right.slice(rightIndex)));
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Example usage:
const arr = [8, 3, 9, 5, 1, 4, 6, 2, 7];
console.log("Original array:", arr);
console.log("----------------------");
const sortedArr = mergeSort(arr);
console.log("----------------------");
console.log("Sorted array:", sortedArr);



// creating array of size n and inserting random values
const n=20;
const array=[];
init();//automatically calls on refresh

const initButton=document.getElementById("init");
const playButton=document.getElementById("play");

initButton.addEventListener("click",()=>{
    init();
})

playButton.addEventListener("click",()=>{
    play();
})


function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showbars();
}

// console.log(array);

function play(){
    const copy=[...array]
    mergeSort(copy) ;
    // animate(moves);
}

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

var divs=[];

// Visualizing array 
function showbars(){
    container.innerHTML=" ";//to clear the container before sorting
    for(let i=0;i<n;i++){
        const bar=document.createElement("div");
        divs[i]=bar;
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}
