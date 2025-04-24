<script setup>
defineProps({
  course: Object
})
</script>

<template>
  <div class="course-card">
    <h3>코스</h3>
    <ul>
      <li v-for="(place, i) in course.places" :key="i">
        {{ place.name }} - {{ place.time }}
      </li>
      <button @click="$emit('open')">상세보기</button>
    </ul>
  </div>
</template>