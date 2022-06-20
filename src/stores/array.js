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
            minArrayLength: 25,
            maxArrayLength: 100,

            minArrayNumber: 5,
            maxArrayNumber: 100,

            arrayLength: useStorage('arrayLength', 55),
            array: [],
            colorsArray: [],
            maxNumberInArray: 0,

            isSorting: false
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
                this.colorsArray = new Array(this.arrayLength).fill(0);
            }
        },
        sort(method) {
            if (this.isSorting == false) {
                this.isSorting = true

                switch (method) {
                    case SortTypes.QuickSort: SortMethods.QuickSort(); break;
                    case SortTypes.HeapSort: SortMethods.HeapSort(); break;
                    case SortTypes.SelectionSort: SortMethods.SelectionSort(); break;
                    case SortTypes.InsertionSort: SortMethods.InsertionSort(); break;
                    case SortTypes.BubbleSort: SortMethods.BubbleSort(); break;
                }

            }
        }
    }
})