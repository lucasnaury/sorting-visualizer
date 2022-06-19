<script setup>
import { ref, reactive, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { useArrayStore } from '../stores/array'
import sortTypes from '../types/sort'

const arrayStore = useArrayStore()

const sortMethods =  Array.from(Object.values(sortTypes).values())
const dropdownVisible = ref(false)

const selectedAlgorithm = ref(useStorage('selectedAlgorithm',sortMethods[0]))
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
            <button id="sort" @click="arrayStore.sort(selectedAlgorithm)">
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
    height: 50px;
    background: var(--dark-color);
    h1{
        margin-left: 50px;
        margin-right: auto;
        font-size: 20px;
    }
    .middle{
        display: flex;
        align-items: center;
        justify-content: space-around;

        .sort-type{
            position: relative;
            display: flex;
            margin-right:50px;        
            cursor: pointer;
    
            #dropdown-text{
                text-align: right;
                padding-right: 12px;
                font-size: 16px;
            }
            #dropdown{
                position: absolute;
                top: 100%;
                right: 0;
                width: auto;
                background: var(--dark-color);
                border-radius: 0 0 5px 5px;
                list-style-type: none;
                pointer-events: none;
                transform: translateY(-10px);
                margin: 0;
                padding: 8px 0;
                opacity: 0;
                transition: transform 150ms ease-out, opacity 300ms ease-out;
                    width: max-content;
                
                li{
                    padding: 10px 22px;
                    font-size: 15px;
                    user-select: none;

                    &:hover{
                        background: transparentize(white, .95);
                    }
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
            margin-left: 50px;
            align-items: center;
    
            h2{
                font-size: 16px;
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
                width: 22px;
                height: 22px;
                padding-right: 9px;
            }
        }
        #sort{
            background: var(--accent-color);
            font-size: 16px;
        }
        #randomize{
            background: var(--accent-color-light);
            font-size: 15px;
        }
    }
}
</style>