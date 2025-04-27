import axios from "axios";
import api from "./api";


export const getCourseResponse = (lat, lon, startTime, endTime, tourspot) => {
    return api.get('/courses', {
      params: {
        lat,
        lon,
        startTime,
        endTime,
        tourspot
      }
    })
}

export const postChooseCourse = (courseLikeResponse) => {
    return api.post('/courses/like',
      courseLikeResponse)
}