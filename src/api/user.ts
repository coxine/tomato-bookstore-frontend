import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { USER_MODULE } from './_prefix'

interface UserLoginInfo {
  username: string
  password: string
}

interface UserInfo {
  username: string
  password?: string // just need when logining
  name: string
  avater?: string
  telephone?: string
  email?: string
  location?: string
  role?: string
}

// TODO: 测试未完成
export const userGetInfo = (username: string) => {
  return axios
    .get<ApiResponse<UserInfo>>(`${USER_MODULE}/${username}`)
    .then((res) => {
      // .then部分由于没有其他处理，目前略显冗余，但方便以后增加逻辑(后均相同)
      return res
    })
}

export const userRegister = (userInfo: UserInfo) => {
  userInfo.role = 'USER'
  return axios
    .post<ApiResponse<null>>(`${USER_MODULE}`, userInfo)
    .then((res) => {
      // 目前创建用户还未得到设置返回内容
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
