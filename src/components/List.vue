<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { ListProps } from './typing'
import { randomColor } from '../utils'
import Loading from './Loading.vue'

const list  = ref<ListProps[]>([{ background: "rgb(233,32,38)" }])
const scrollRef = ref<HTMLDivElement>()
const isRequest = ref<boolean>(false)

const getList = (list: number): Promise<ListProps[]>  => {
  console.log('请求中...');
  const delay = Math.ceil(Math.random() * 5) * 1000
  return new Promise(resolve => {
    setTimeout(() => {
      const data =  new Array(list).fill('').map(_ => {
        return {background: randomColor()}
      })
      resolve(
        data
      )
    }, delay);
  })
}

const handleGetData = async () => {
  if(isRequest.value || !scrollRef.value || list.value.length >= 50) {
    return
  }
  
  // 滚动一半触发接口请求(题目又要loading又要滚到一半矛盾)
  // if(scrollRef.value?.scrollTop >= scrollRef.value?.scrollHeight / 2) {
  if (scrollRef.value.scrollHeight <= Math.ceil(scrollRef.value.scrollTop + scrollRef.value.clientHeight) + 10) {
    isRequest.value = true
    console.log('滚动一半了...');
    const res = await getList(10)
    isRequest.value = false
    list.value = [...list.value, ...res]
  }
}

onMounted(async() => {
  const res = await getList(10)
  list.value = [...list.value, ...res]
  scrollRef.value?.addEventListener('scroll', handleGetData)
})

onUnmounted(() => scrollRef.value?.removeEventListener('scroll', handleGetData))


</script>

<template>
  <main ref="scrollRef">
    <div class="box" v-for="(item, index) in list" :key="index" :style="{background: item.background}">{{ index }}</div>
    <div class="loading" v-show="isRequest">
      <Loading />
    </div>
  </main>
</template>

<style scoped>
  main {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
  }

  .box {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }

</style>
