import { useArrayStore } from '../stores/array'
import { swap, waitForMs } from './utilities'

const delay = 20

export const QuickSort = () => {
    console.log("QuickSort")
    const arrayStore = useArrayStore()

    //Reset
    arrayStore.isSorting = false
}

export const HeapSort = () => {
    console.log("HeapSort")
    const arrayStore = useArrayStore()

    //Reset
    arrayStore.isSorting = false
}

export const SelectionSort = () => {
    console.log("SelectionSort")
    const arrayStore = useArrayStore()

    //Reset
    arrayStore.isSorting = false
}




export const InsertionSort = async () => {
    console.log("InsertionSort")
    const arrayStore = useArrayStore()


    arrayStore.colorsArray[0] = 1 //Consider first element already sorted

    for (let i = 1; i < arrayStore.arrayLength; i++) {

        let j = i

        while (j > 0 && arrayStore.array[j] < arrayStore.array[j - 1]) {//While not sorted, should be inserted in the right spot

            //Visualization (comparison)
            arrayStore.colorsArray[j] = 1
            arrayStore.colorsArray[j - 1] = 1

            swap(j, j - 1)

            await waitForMs(delay)

            j--
        }

    }



    //Reset
    arrayStore.isSorting = false
}









export const BubbleSort = async () => {
    console.log("BubbleSort")
    const arrayStore = useArrayStore()

    let isSorted = false

    let fin = arrayStore.array.length
    while (!isSorted) {
        if (fin > 1) {
            for (let i = 0; i < fin - 1; i++) {
                //Visualization (comparison)
                arrayStore.colorsArray[i] = 1
                arrayStore.colorsArray[i + 1] = 1
                await waitForMs(delay)

                //Compare both values
                if (arrayStore.array[i] > arrayStore.array[i + 1]) {//If wrong order, swap them
                    swap(i, i + 1)
                    await waitForMs(delay)
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