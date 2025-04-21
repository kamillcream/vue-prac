<template>
    <div>
        <button @click="sendGetCourse">Get Course</button>
        <p :style="태그속성"> {{ price }} </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCourseResponse } from '../services/courseService.js';

const sendGetCourse = async () => {
  try {
    const response = await getCourseResponse(
      37.5, 126.9,
      '2025-04-22 00:00', '2025-04-22 03:00',
      '동대문 관광특구'
    )
    console.log('받은 데이터:', response.data)
    // 예시로 price 값을 수정
    price.value = response.data.price || 1234
  } catch (error) {
    console.error('Error fetching course data:', error)
  }
}
</script>

<style>

</style>