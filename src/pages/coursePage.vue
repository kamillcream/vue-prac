<template>
  <div>
    <button @click = "sendGetCourse">Get Course</button>
    <button @click = "switchModal">switchModal</button>
    <div v-if = "courses.length > 0">
        <div v-for= "course in courses" :key="course.id" >
            <Course :course = "course" @open="openModalWithCourse(course)"/>   
        </div>
    </div>
    <div class = "modal-wrap" v-show = "showModal">
        <div class = "modal-container">
            <Modal class="modal-component" @close="switchModal">
                <template #header>
                    <h3>{{ selectedCourse?.places?.[0]?.name }}</h3>
                </template>
                <template #body>
                    <p>Details about the selected course will go here.</p>
                </template>
                <template #footer>
                    <button @click="switchModal">Close</button>
                </template>
            </Modal>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCourseResponse } from '../services/courseService.js';
import Course from '../components/courseCard.vue'
import Modal from '../components/modal.vue';

const courses = ref([]);
const showModal = ref(false);
const selectedCourse = ref(null);

const sendGetCourse = async () => {
  try {
    const response = await getCourseResponse(
      37.5, 126.9,
      '2025-04-24 17:00', '2025-04-24 20:00',
      '동대문 관광특구'
    )
    courses.value = response.data.result.courses;
    console.log('Course data:', courses.value);
  } catch (error) {
    console.error('Error fetching course data:', error)
  }
}

const switchModal = async () => {
    showModal.value = !showModal.value;
    console.log("new status: ", showModal.value);
}

const openModalWithCourse = (course) => {
    selectedCourse.value = course;
    showModal.value = !showModal.value;
    console.log(selectedCourse.value);
}
</script>

<style>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 800px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>