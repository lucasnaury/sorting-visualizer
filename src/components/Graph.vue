<script setup>
import { useArrayStore } from '../stores/array'
import { onMounted } from 'vue';

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
    display: flex;
    flex-direction: column;
    align-items: center;

    .graph{
        display: flex;
        align-items: baseline;
        justify-content: center;
        overflow: hidden;
        height: calc(100% - 50px);
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
        width: max(100%, 400px);
        padding: 0;
        margin: 30px 0 0;
        list-style-type: none;


        li{
            position: relative;
            color: transparentize(white, 0.4);
            font-size: 14px;
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