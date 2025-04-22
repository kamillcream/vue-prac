<template>
    <div>
        <button @click="sendGetCourse">Get Course</button>
        <div v-if = "courses.length > 0">
            <div v-for= "course in courses" :key="course.id">
                <Course :course = "course" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCourseResponse } from '../services/courseService.js';
import Course from './courseCard.vue'

const courses = ref([]);

const sendGetCourse = async () => {
  try {
    const response = await getCourseResponse(
      37.5, 126.9,
      '2025-04-22 22:00', '2025-04-23 00:00',
      '동대문 관광특구'
    )
    courses.value = response.data.result.courses;
    console.log('Course data:', courses.value);
  } catch (error) {
    console.error('Error fetching course data:', error)
  }
}
</script>

<style>

</style>