import { defineStore } from 'pinia'

const getRandomIntInInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const useArrayStore = defineStore('arrayStore', {
    state: () => {
        return {
          // all these properties will have their type inferred automatically
          minArrayLength: 25,
          maxArrayLength: 100,

          minArrayNumber: 10,
          maxArrayNumber: 100,

          arrayLength: 55,
          array: [],
          maxNumberInArray: 0
        }
    },
    actions : {
        randomizeArray(){
            console.log("Randomize array")
            var newArray = [];
            this.maxNumberInArray = 0;//Reset previous max

            for(var i = 0; i < this.arrayLength; i++){
                var e = getRandomIntInInterval(this.minArrayNumber,this.maxArrayNumber);
                newArray.push(e);
                if (e > this.maxNumberInArray) this.maxNumberInArray = e;
            }
            this.array = newArray;    
        }
    }
})