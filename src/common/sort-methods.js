import { useArrayStore } from '../stores/array'
import { swap, insert, waitForMs } from './utilities'

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

export const MergeSort = () => {
    console.log("MergeSort")
    const arrayStore = useArrayStore()

    arrayStore.array = MergeSortStep(arrayStore.array)

    //Reset
    arrayStore.isSorting = false
}

const MergeSortStep = (array) => {

    if (array.length <= 1) return array

    const middleIndex = Math.floor(array.length / 2)

    let arrayLeft = array.slice(0, middleIndex)
    let arrayRight = array.slice(middleIndex, array.length)

    return merge(MergeSortStep(arrayLeft), MergeSortStep(arrayRight))

}

const merge = (arrayLeft, arrayRight) => {
    console.log("Merge", arrayLeft.join(','), "     ", arrayRight.join(','))

    for (let i = 0; i < arrayLeft.length && arrayRight.length > 0; i++) {
        while (arrayRight[0] < arrayLeft[i]) {//Si on peut insérer le premier élément de arrayRight dans arrayLeft avant l'index i

            arrayLeft = insert(arrayLeft, arrayRight.shift(), i) //On l'insère avant i et on le supprime de ArrayLeft

        }
    }


    arrayLeft = arrayLeft.concat(arrayRight)//Add remaining right items at the end of the left array



    return arrayLeft

}

export const SelectionSort = async () => {
    console.log("SelectionSort")
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

        swap(debut, current_min_index)

        await waitForMs(delay)

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
    console.log("InsertionSort")
    const arrayStore = useArrayStore()


    arrayStore.colorsArray[0] = 1 //Consider first element already sorted

    for (let i = 1; i < arrayStore.arrayLength; i++) {

        let j = i

        while (j > 0 && arrayStore.array[j] < arrayStore.array[j - 1]) {//While not sorted, should be inserted in the right spot

            //Visualization (comparison)
            arrayStore.colorsArray[j] = 1
            arrayStore.colorsArray[j - 1] = 1

            await waitForMs(delay)

            swap(j, j - 1)

            //Visualization (Put back the item in sorted color)
            arrayStore.colorsArray[j] = 3

            await waitForMs(delay)

            j--
        }
        //Visualization (sorted)
        arrayStore.colorsArray[j] = 3
        arrayStore.colorsArray[j - 1] = 3

    }



    //Reset
    arrayStore.isSorting = false
}









export const BubbleSort = async () => {
    console.log("BubbleSort")
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