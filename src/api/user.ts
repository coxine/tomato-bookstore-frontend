import { ApiResponse } from '../types/apiResponse'
import { Profile } from '../types/profile'
import { axios } from '../utils/require'

import { USER_MODULE } from './_prefix'

interface UserLoginInfo {
  username: string
  password: string
}

export const userGetInfo = (username: string) => {
  return axios
    .get<ApiResponse<Profile>>(`${USER_MODULE}/${username}`)
    .then((res) => {
      // .then部分由于没有其他处理，目前略显冗余，但方便以后增加逻辑(后均相同)
      return res
    })
}

export const userGetRole = (username: string) => {
  return userGetInfo(username).then((res) => {
    return {
      // 保持原有风格
      ...res,
      data: {
        ...res.data,
        data: res.data.data.role,
      },
    }
  })
}

export const userRegister = (userInfo: Profile) => {
  return axios
    .post<ApiResponse<null>>(`${USER_MODULE}`, userInfo)
    .then((res) => {
      return res
    })
}

export const userLogin = (userLoginInfo: UserLoginInfo) => {
  return axios
    .post<ApiResponse<string>>(`${USER_MODULE}/login`, userLoginInfo)
    .then((res) => {
      return res
    })
}

export const userUpdate = (userUpdateInfo: Profile) => {
  return axios
    .put<ApiResponse<null>>(`${USER_MODULE}`, userUpdateInfo)
    .then((res) => {
      return res
    })
}
