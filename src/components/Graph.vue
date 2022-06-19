<script setup>
import { useArrayStore } from '../stores/array'
import { ref, reactive, onMounted } from 'vue';

const arrayStore = useArrayStore()


onMounted(() => {
    arrayStore.randomizeArray()
})

</script>

<template>
    <div className="graph-container">
            <div className="graph">
                <div class="bar" v-for="(e, i) in arrayStore.array" :key="i" :style="`height: ${e/arrayStore.maxNumberInArray * 100}%`"></div>
            </div>
            <ul className="legend">
                <li>Comparison</li>
                <li>Swap</li>
                <li>Sorted</li>
            </ul>
        </div>
</template>

<style scoped lang="scss">
.graph-container{
    height: 75%;

    .graph{
        display: flex;
        align-items: baseline;
        justify-content: center;
        overflow: hidden;
        height: 80%;
        .bar{
            background: var(--graph-color);
            height: 300px;
            width: 4px;
            margin: 0 3px;
        }
    }

    .legend{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        padding: 0;
        margin: 30px 0 0;
        list-style-type: none;


        li{
            position: relative;
            color: transparentize(white, 0.4);
            font-size: 16px;
            font-weight: 300;

            &::before{
                content: '';
                width: 10px;
                height: 10px;
                position: absolute;
                top: 50%;
                transform: translate(-100%,-50%);
                left: -10px;
            }

            &:nth-child(1)::before{
                background: var(--graph-comparison-color);
            }
            &:nth-child(2)::before{
                background: var(--graph-swap-color);
            }
            &:nth-child(3)::before{
                background: var(--graph-sorted-color);
            }
        }
    }
}
</style>