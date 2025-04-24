import axios from "axios";
import api from "./api";


export const getCourseResponse = (lat, lon, startTime, endTime, tourspot) => {
    return api.get('/course/get', {
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
    return api.post('/course/like',
      courseLikeResponse)
}