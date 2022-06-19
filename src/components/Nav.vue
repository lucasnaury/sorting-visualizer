<script setup>
import {ref, reactive, computed} from 'vue'
import { useArrayStore } from '../stores/array';

const arrayStore = useArrayStore()

const sortMethods = ["Quick Sort","Heap Sort","Selection Sort","Insertion Sort","Bubble Sort"]

const selectedAlgorithm = ref(sortMethods[0])
const dropdownVisible = ref(false)

const dropdownMethods = computed(()=> sortMethods.filter(meth => meth != selectedAlgorithm.value))

const minLength = arrayStore.minArrayLength
const maxLength = arrayStore.maxArrayLength

</script>

<template>
    <nav>
        <h1>Sorting Visualizer</h1>
        <div class="middle">
            <div class="sort-type" @click='dropdownVisible = !dropdownVisible'>
                <h2 id="dropdown-text">{{selectedAlgorithm}}</h2>
                <ul id="dropdown" :class="dropdownVisible ? 'visible' : ''">
                    <li v-for="method in dropdownMethods" :key="method" @click="selectedAlgorithm = method">{{ method }}</li>
                </ul>
                <img src="../assets/icons/dropdown.svg" />

            </div>
            <div class="array-length">
                <h2>Array length :</h2>
                <input type="range" name="" id="" :min="minLength" :max="maxLength" v-model.number="arrayStore.arrayLength" @input="arrayStore.randomizeArray"/>
            </div>
        </div>            
        <div class="buttons">
            <button id="randomize" @click="arrayStore.randomizeArray()">
                <img src="../assets/icons/random.svg" />
                Randomize
            </button>
            <button id="sort">
                <img src="../assets/icons/sort.svg" />
                Sort
            </button>
        </div>
    </nav>
</template>


<style scoped lang="scss">
nav{
    display: flex;
    align-items: center;
    height: 60px;
    background: var(--dark-color);
    h1{
        margin-left: 50px;
        margin-right: auto;
        font-size: 24px;
    }
    .middle{
        display: flex;
        align-items: center;
        justify-content: space-around;

        .sort-type{
            position: relative;
            display: flex;
            margin: 0 50px;        
            cursor: pointer;
    
            #dropdown-text{
                text-align: right;
                padding-right: 12px;
                font-size: 20px;
            }
            #dropdown{
                position: absolute;
                top: 100%;
                right: 0;
                width: 100%;
                background: var(--dark-color);
                border-radius: 0 0 5px 5px;
                list-style-type: none;
                pointer-events: none;
                transform: translateY(-10px);
                margin: 0;
                padding: 10px;
                opacity: 0;
                transition: transform 150ms ease-out, opacity 300ms ease-out;
                
                li{
                    padding: 8px 12px;
                    font-size: 15px;
                    user-select: none;
                }
                
                
                &.visible{
                    pointer-events: auto;
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            img{
                width: 16px;
                padding-top: 2px;
            }
        }
        .array-length{
            display: flex;
            margin: 0 50px;
            align-items: center;
    
            h2{
                font-size: 18px;
                padding-right: 20px;
            }
            input{
                height: 4px;            
                cursor: ew-resize;
                accent-color: var(--accent-color-light);
            }
        }
    }    
    .buttons{
        display: flex;
        margin-left: auto;
        height: 100%;
        button{
            all: unset;
            height: 100%;
            padding: 0 20px;
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;

            img{
                width: 28px;
                height: 28px;
                padding-right: 9px;
            }
        }
        #sort{
            background: var(--accent-color);
            font-size: 20px;
        }
        #randomize{
            background: var(--accent-color-light);
            font-size: 18px;
        }
    }
}
</style>