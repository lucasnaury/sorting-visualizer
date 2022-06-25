import { useArrayStore } from '../stores/array'
import { swap, move, waitForMs } from './utilities'

export const HeapSort = async () => {
    console.log("Heap Sort")
    const arrayStore = useArrayStore()


}




export const QuickSort = async () => {
    console.log("Quick Sort")

    const arrayStore = useArrayStore()

    await QuickSortStep(arrayStore, 0, arrayStore.arrayLength-1)

    
}


const QuickSortStep = async (arrayStore, start, end) => {

    if(start < end){
        //We choose an adequate pivot using the "median-of-three" method
        let pivot = await choosePivot(arrayStore, start, end)

        //We place the pivot in the right place
        pivot = await placePivot(arrayStore, start, end, pivot)

        //Recursively call the function on the left and right of the pivot
        await QuickSortStep(arrayStore, start, pivot - 1)//Left
        await QuickSortStep(arrayStore, pivot + 1, end)//Right

    }else{
        //Visualization (sorted)
        arrayStore.colorsArray[start] = 3
    }



}

const choosePivot = async (arrayStore, start, end) => {
    //We use the median of three method to try to find the best pivot

    const a = arrayStore.array[start]
    const c = arrayStore.array[end]

    const middleIndex = Math.floor((start + end) / 2)
    const b = arrayStore.array[middleIndex]
    
    //Visualization (comparison)
    arrayStore.colorsArray[start] = 1
    arrayStore.colorsArray[middleIndex] = 1
    arrayStore.colorsArray[end] = 1
    await waitForMs(arrayStore.delay)

    //Visualization (reset comparison)
    arrayStore.colorsArray[start] = 0
    arrayStore.colorsArray[middleIndex] = 0
    arrayStore.colorsArray[end] = 0

    // x is positive if a is greater than b.
    // x is negative if b is greater than a.
    const x = a - b;
    const y = b - c;
    const z = a - c;
    // Checking if b is middle (x and y both are positive)
    if (x * y > 0) {
        return middleIndex;
    }else if (x * z > 0){
        return end;
    }else{
        return start;
    }

    
}

const placePivot = async (arrayStore, start, end, pivot) => {

    //We put the pivot at the start
    await swap(pivot, start, arrayStore.delay)
    pivot = start

    //Foreach item except the pivot
    for(let i=start+1; i<=end; i++){

        //Visualization (comparison)
        arrayStore.colorsArray[i] = 1
        arrayStore.colorsArray[pivot] = 1
        await waitForMs(arrayStore.delay)


        if(arrayStore.array[i] < arrayStore.array[pivot]){

            //Visualization (before move)
            arrayStore.colorsArray[i] = 2
            arrayStore.colorsArray[pivot] = 0
            await waitForMs(arrayStore.delay / 2)

            move(i, pivot)//Move every smaller items before the pivot

            //Visualization (after move)
            arrayStore.colorsArray[pivot] = 2
            arrayStore.colorsArray[i] = 0
            await waitForMs(arrayStore.delay / 2)


            pivot++//It causes the pivot to increment index
                    
        
            //Visualization (not sorted)
            arrayStore.colorsArray[pivot - 1] = 0

        }else{
            //Visualization (not sorted)
            arrayStore.colorsArray[pivot] = 0
        }
        arrayStore.colorsArray[i] = 0
    }    

    //Visualization (sorted)
    arrayStore.colorsArray[pivot] = 3

    return pivot


}





export const MergeSort = async () => {
    console.log("Merge Sort")
    const arrayStore = useArrayStore()

    await MergeSortStep(arrayStore, 0, arrayStore.arrayLength)

}

const MergeSortStep = async (arrayStore, start, end) => { //Start inclus, end exclus

    if (end - start <= 1) return [start, end] //If only 1 or 0 item

    const middleIndex = Math.floor((start + end) / 2) //On "coupe" l'array en 2

    //APPELS RECURSIFS
    const [leftStart, leftEnd] = await MergeSortStep(arrayStore, start, middleIndex)
    const [rightStart, rightEnd] = await MergeSortStep(arrayStore, middleIndex, end)

    return await merge(arrayStore, leftStart, leftEnd, rightEnd)

}

const merge = async (arrayStore, leftStart, middle, rightEnd) => {

    for (let i = 0; i < middle - leftStart && rightEnd - middle > 0; i++) {
        while (middle < rightEnd && arrayStore.array[middle] < arrayStore.array[leftStart + i]) {//Si on peut insérer le premier élément de arrayRight dans arrayLeft avant l'index i

            //Visualization (comparison)
            arrayStore.colorsArray[middle] = 1
            arrayStore.colorsArray[leftStart + i] = 1
            await waitForMs(arrayStore.delay)

            //Visualization (before move)
            arrayStore.colorsArray[middle] = 2

            await waitForMs(arrayStore.delay / 2)

            move(middle, leftStart + i)//On insère le premier élément de l'array de droite dès que l'on peut

            //Visualization (after move)
            arrayStore.colorsArray[middle] = 3
            arrayStore.colorsArray[leftStart + i] = 2
            await waitForMs(arrayStore.delay / 2)

            //Visualization (sorted)
            arrayStore.colorsArray[leftStart + i] = 3
            await waitForMs(arrayStore.delay)



            middle++ //Le move agrandit la taille de l'array de gauche et diminue celui de droite            
            i++//Et on peut directement décaler à l'indice d'après car on sait que arrayRight est trié


        }
        if (middle == rightEnd) {//If no element left in right array, last element is well placed
            arrayStore.colorsArray[middle - 1] = 3
            await waitForMs(arrayStore.delay)
        } else {//If right element bigger, leftStart+i element is already well placed
            arrayStore.colorsArray[leftStart + i] = 3
            await waitForMs(arrayStore.delay)

        }
    }

    //Visualization (put all remaining right items as sorted)
    for (let i = middle; i < rightEnd; i++) {
        arrayStore.colorsArray[i] = 3
    }

    return [leftStart, rightEnd]
}




export const SelectionSort = async () => {
    console.log("Selection Sort")
    const arrayStore = useArrayStore()

    let debut = 0

    while (debut < arrayStore.arrayLength) {
        let current_min_index = debut//Reset min index

        //Get the min in the unsorted part
        for (let i = debut; i < arrayStore.arrayLength; i++) {

            //Visualization (comparison)
            const previous_min_index = current_min_index //Save variable to remove color even when value changed
            arrayStore.colorsArray[i] = 1
            arrayStore.colorsArray[previous_min_index] = 1
            await waitForMs(arrayStore.delay)

            if (arrayStore.array[i] < arrayStore.array[current_min_index]) {//If new min, set current_min_index to new min index
                current_min_index = i
            }

            //Visualization (comparison)
            arrayStore.colorsArray[i] = 0
            arrayStore.colorsArray[previous_min_index] = 0

        }

        //Swap
        await swap(debut, current_min_index)


        //Visualization (sorted)
        arrayStore.colorsArray[debut] = 3
        //Visualization (not sorted at all, swapped with sorted)
        if (debut != current_min_index) arrayStore.colorsArray[current_min_index] = 0


        await waitForMs(arrayStore.delay)

        debut++

    }


}




export const InsertionSort = async () => {
    console.log("Insertion Sort")
    const arrayStore = useArrayStore()


    arrayStore.colorsArray[0] = 1 //Consider first element already sorted

    for (let i = 1; i < arrayStore.arrayLength; i++) {

        let j = i

        while (j > 0 && arrayStore.array[j] < arrayStore.array[j - 1]) {//While not sorted, should be inserted in the right spot

            //Visualization (comparison)
            arrayStore.colorsArray[j] = 1
            arrayStore.colorsArray[j - 1] = 1
            await waitForMs(arrayStore.delay)

            //Swap
            await swap(j, j - 1, arrayStore.delay)


            //Visualization (Put back the item in sorted color)
            arrayStore.colorsArray[j] = 3

            j--
        }
        //Visualization (sorted)
        arrayStore.colorsArray[j] = 3
        arrayStore.colorsArray[j - 1] = 3

        await waitForMs(arrayStore.delay)

    }


}




export const BubbleSort = async () => {
    console.log("Bubble Sort")
    const arrayStore = useArrayStore()

    let isSorted = false

    let fin = arrayStore.arrayLength
    while (!isSorted) {
        if (fin > 1) {
            for (let i = 0; i < fin - 1; i++) {

                //Visualization (comparison)
                arrayStore.colorsArray[i] = 1
                arrayStore.colorsArray[i + 1] = 1
                await waitForMs(arrayStore.delay)

                //Compare both values
                if (arrayStore.array[i] > arrayStore.array[i + 1]) {//If wrong order, swap them

                    //Swap
                    await swap(i, i + 1, arrayStore.delay)
                }

                //Visualization
                arrayStore.colorsArray[i] = 0
                if (i != fin - 2) {//If it's not last item
                    arrayStore.colorsArray[i + 1] = 0 //Default color, not sorted yet
                } else {
                    arrayStore.colorsArray[i + 1] = 3 //In its final place
                }
            }

            //Eeach iteration, decrease array length
            fin--
        }
        else {
            //Visualization
            arrayStore.colorsArray[0] = 3//In its final place

            //Stop while loop
            isSorted = true
        }
    }


}