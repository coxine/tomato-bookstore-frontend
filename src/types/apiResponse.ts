// 用于设置axios的默认放回对象结构，便于代码编写与类型检查
export interface ApiResponse<T> {
  code: string
  data: T
  msg: string
}
