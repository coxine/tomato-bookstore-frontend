import { ApiResponse } from '../types/apiResponse'
import { Profile } from '../types/profile'
import { axios } from '../utils/require'

import { USER_MODULE } from './_prefix'

interface UserLoginInfo {
  username: string
  password: string
}

export const userGetInfo = async (username: string) => {
  const res = await axios.get<ApiResponse<Profile>>(
    `${USER_MODULE}/${username}`
  )
  return res
}

export const userGetRole = async (username: string) => {
  const res = await userGetInfo(username)
  return {
    // 保持原有风格
    ...res,
    data: {
      ...res.data,
      data: res.data.data.role,
    },
  }
}

export const userGetSimpleInfo = async (username: string) => {
  const res = await userGetInfo(username)
  return {
    // 保持原有风格
    ...res,
    data: {
      ...res.data,
      data: {
        username: res.data.data.username,
        telephone: res.data.data.telephone,
        location: res.data.data.location,
      },
    },
  }
}

export const userRegister = async (userInfo: Profile) => {
  const res = await axios.post<ApiResponse<null>>(`${USER_MODULE}`, userInfo)
  return res
}

export const userLogin = async (userLoginInfo: UserLoginInfo) => {
  const res = await axios.post<ApiResponse<string>>(
    `${USER_MODULE}/login`,
    userLoginInfo
  )
  return res
}

export const userUpdate = async (userUpdateInfo: Profile) => {
  const res = await axios.put<ApiResponse<null>>(
    `${USER_MODULE}`,
    userUpdateInfo
  )
  return res
}

export const userUpdatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const res = await axios.put<ApiResponse<string>>(`${USER_MODULE}/password`, {
    password: oldPassword,
    newPassword: newPassword,
  })
  return res
}
