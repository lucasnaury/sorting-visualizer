import { useArrayStore } from "../stores/array";

export const waitForMs = (ms) => {
    if (ms == 0) return Promise.resolve()

    return new Promise(resolve => setTimeout(resolve, ms));
}

export const swap = async (indexA, indexB, delay) => {
    const arrayStore = useArrayStore()

    //Visualization (swap)
    arrayStore.colorsArray[indexA] = 2
    arrayStore.colorsArray[indexB] = 2
    await waitForMs(delay / 2)

    //Swap
    let temp = arrayStore.array[indexA]
    arrayStore.array[indexA] = arrayStore.array[indexB]
    arrayStore.array[indexB] = temp

    //Wait for another half delay to see the swap
    await waitForMs(delay / 2)

}

export const insert = (array, item, index) => {
    array.splice(index, 0, item);
    return array
}

export const remove = (array, index) => {
    array.splice(index, 1)
    return array
}

export const move = (array, start, target) => {
    if (start > target) {
        array = insert(array, array[start], target) //On l'insère l'élément au bon endroit

        array = remove(array, start + 1);//Puis on supprime celui d'origine

        return array
    } else {
        array = insert(array, array[start], target) //On l'insère l'élément au bon endroit

        array = remove(array, start);//Puis on supprime celui d'origine

        return array
    }

}