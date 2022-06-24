import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import SortTypes from '../types/sort'
import * as SortMethods from '../common/sort-methods.js'

const getRandomIntInInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const useArrayStore = defineStore('arrayStore', {
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            minArrayLength: 2,
            maxArrayLength: 100,

            minArrayNumber: 5,
            maxArrayNumber: 100,

            arrayLength: useStorage('arrayLength', 55),
            array: [],
            savedArray: [],
            colorsArray: [],
            maxNumberInArray: 0,

            isSorting: false,
            isSorted: false,
            delay: 20
        }
    },
    actions: {
        randomizeArray() {
            if (this.isSorting == false) {
                console.log("Randomize array")
                var newArray = [];
                this.maxNumberInArray = 0;//Reset previous max

                for (var i = 0; i < this.arrayLength; i++) {
                    var e = getRandomIntInInterval(this.minArrayNumber, this.maxArrayNumber);
                    newArray.push(e);
                    if (e > this.maxNumberInArray) this.maxNumberInArray = e;
                }

                this.array = newArray;
                this.savedArray = [...newArray];

                this.isSorted = false
                this.colorsArray = new Array(this.arrayLength).fill(0);
            }
        },
        async sort(method) {
            if (this.isSorting == false && this.isSorted == false) {
                const initialDelay = this.delay

                this.isSorting = true

                switch (method) {
                    case SortTypes.BubbleSort: await SortMethods.BubbleSort(); break;
                    case SortTypes.InsertionSort: await SortMethods.InsertionSort(); break;
                    case SortTypes.SelectionSort: await SortMethods.SelectionSort(); break;
                    case SortTypes.MergeSort: await SortMethods.MergeSort(); break;
                    case SortTypes.QuickSort: await SortMethods.QuickSort(); break;
                    case SortTypes.HeapSort: await SortMethods.HeapSort(); break;
                }

                this.delay = initialDelay //Reset it to default value if set to 0 to stop
                this.isSorting = false
                this.isSorted = true

            }
        }
    }
})