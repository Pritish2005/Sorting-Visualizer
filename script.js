// creating array of size n and inserting random values
const n=20;
const array=[];
init();//automatically calls on refresh


function init(){

    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showbars();
}


// console.log(array);

// sorting array
function bubbleSort(arr, n)
{
    // to record the swaps
    const swaps=[];

    var i, j, temp;
    var swapped;
    for (i = 0; i < n - 1; i++) 
    {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) 
        {
            if (arr[j] > arr[j + 1]) 
            {
                swaps.push([i-1,i]);
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

    return swaps;
}

function play(){
 const swaps=bubbleSort(array,n) ;
 showbars();
}

// function animate(swaps)

// Visualizing array 

function showbars(){
    container.innerHTML=" ";//to clear the container before sorting
    for(let i=0;i<n;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

// more colours
// array val on top of bars