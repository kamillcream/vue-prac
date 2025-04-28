<template>
  <div>
    <div>
      <label for="date">날짜 선택</label>
      <input type="date" id="date" v-model = "selectedDate"/>
      <p>선택한 날짜: {{ selectedDate }}</p>
      <p v-if="isPastDate">❗️과거 날짜를 선택했습니다.</p>
    </div>
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
                    <h3 style="color: red">{{ selectedCourse?.places?.[0]?.name }}</h3>
                </template>
                <template #body>
                    <p>Details about the selected course will go here.</p>
                    <button v-if="selectedCourse" @click="chooseCourse">
                      선택하기
                    </button>
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
import { compile, ref, toRaw, computed , watch} from 'vue';
import { useStore } from 'vuex';
import { getCourseResponse, postChooseCourse } from '../services/courseService.js';
import Course from '../components/courseCard.vue'
import Modal from '../components/modal.vue';

const courses = ref([]);
const showModal = ref(false);
const store = useStore();
const selectedDate = ref('')
const isPastDate = ref(false)
const selectedCourse = computed(() => store.state.selectedCourse)

function select(course){
  store.commit('selectCourse', course)
  console.log("store: ", selectedCourse.value);
}
const sendGetCourse = async () => {
  try {
    const response = await getCourseResponse(
      37.5, 126.9,
      '2025-04-27 20:00', '2025-04-27 23:00',
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
  select(course);
  showModal.value = !showModal.value;
  console.log(selectedCourse.value);
}

const chooseCourse = () => {
  if (!selectedCourse.value || !selectedCourse.value.places) {
    console.warn('선택된 코스가 없거나 잘못됨');
    return;
  }

  const request = {
    areas: toRaw(selectedCourse.value.places),
    courseNumber: selectedCourse.value.places.length,
    startTime: "2025-04-24 20:00",
    endTime: "2025-04-24 23:00",
    isActive: false
  };
  console.log(request);
  postChooseCourse(request);
};

watch(selectedDate, (newDate) => {
  if (!newDate) {
    isPastDate.value = false
    return
  }

  const today = new Date()
  const selected = new Date(newDate)

  today.setHours(0, 0, 0, 0)
  selected.setHours(0, 0, 0, 0)

  isPastDate.value = selected < today
})

const courseLikeRequest = (selectedCourse) => {
  console.log(selectedCourse);  
  return {
    areas: selectedCourse.places,
    courseNumber: area.length,
    startTime: "2025-04-24 20:00",
    endTime: "2025-04-24 23:00",
    isActive: false
  }
};
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