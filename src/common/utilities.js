import { useArrayStore } from "../stores/array";

export const waitForMs = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const swap = (indexA, indexB) => {
    const arrayStore = useArrayStore()

    let temp = arrayStore.array[indexA]
    arrayStore.array[indexA] = arrayStore.array[indexB]
    arrayStore.array[indexB] = temp

    //Visualization (swap)
    arrayStore.colorsArray[indexA] = 2
    arrayStore.colorsArray[indexB] = 2
}

export const insert = (array, item, index) => {
    array.splice(index, 0, item);
    return array
}