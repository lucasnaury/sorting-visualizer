import { useArrayStore } from '../stores/array'
import { swap, move, insert, remove, waitForMs } from './utilities'

const delay = 200

export const QuickSort = () => {
    console.log("Quick Sort")
    const arrayStore = useArrayStore()

    //Reset
    arrayStore.isSorting = false
}

export const HeapSort = () => {
    console.log("Heap Sort")
    const arrayStore = useArrayStore()

    //Reset
    arrayStore.isSorting = false
}




export const MergeSort = async () => {//PROBLEM, INFINITE RECURSION
    console.log("Merge Sort")
    const arrayStore = useArrayStore()

    await MergeSortStep(arrayStore, 0, arrayStore.arrayLength)

    //Reset
    arrayStore.isSorting = false
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
            await waitForMs(delay)

            //Visualization (before move)
            arrayStore.colorsArray[middle] = 2

            await waitForMs(delay / 2)

            arrayStore.array = move(arrayStore.array, middle, leftStart + i)//On insère le premier élément de l'array de droite dès que l'on peut

            //Visualization (after move)
            arrayStore.colorsArray[middle] = 3
            arrayStore.colorsArray[leftStart + i] = 2
            await waitForMs(delay / 2)

            //Visualization (sorted)
            arrayStore.colorsArray[leftStart + i] = 3
            await waitForMs(delay)



            middle++ //Le move agrandit la taille de l'array de gauche et diminue celui de droite            
            i++//Et on peut directement décaler à l'indice d'après car on sait que arrayRight est trié


        }
        if (middle == rightEnd) {//If no element left in right array, last element is well placed
            arrayStore.colorsArray[middle - 1] = 3
            await waitForMs(delay)
        } else {//If right element bigger, leftStart+i element is already well placed
            arrayStore.colorsArray[leftStart + i] = 3
            await waitForMs(delay)

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
            await waitForMs(delay)

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


        await waitForMs(delay)

        debut++

    }


    //Reset
    arrayStore.isSorting = false
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
            await waitForMs(delay)

            //Swap
            await swap(j, j - 1, delay)


            //Visualization (Put back the item in sorted color)
            arrayStore.colorsArray[j] = 3

            j--
        }
        //Visualization (sorted)
        arrayStore.colorsArray[j] = 3
        arrayStore.colorsArray[j - 1] = 3

        await waitForMs(delay)

    }



    //Reset
    arrayStore.isSorting = false
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
                await waitForMs(delay)

                //Compare both values
                if (arrayStore.array[i] > arrayStore.array[i + 1]) {//If wrong order, swap them

                    //Swap
                    await swap(i, i + 1, delay)
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
    //Reset
    arrayStore.isSorting = false


}