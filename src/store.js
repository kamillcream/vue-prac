import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      selectedCourse : null,  
    }
  },
  mutations: {
    selectCourse(state, courseData) {
      state.selectedCourse = courseData;
    }
  }
})

export default store