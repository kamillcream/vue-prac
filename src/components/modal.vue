<script setup>
defineProps({
  course: Object
});
defineEmits(['close']);
</script>

<template>
    console.log(course);
  <div class="modal">
    <div class="modal-header">
      <slot name="header">
        <h3>{{ course?.title || '코스 상세' }}</h3>
      </slot>
    </div>
    <div class="modal-body">
      <slot name="body">
        <ul>
          <li v-for="(place, i) in course?.places || []" :key="i">
            {{ place.name }} - {{ place.time }}
          </li>
        </ul>
      </slot>
    </div>
    <div class="modal-footer">
      <slot name="footer">
        <button @click="$emit('close')">닫기</button>
      </slot>
    </div>
  </div>
</template>