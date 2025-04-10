import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SaveIcon from '@mui/icons-material/Save'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  styled,
  Textarea,
} from '@mui/joy'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { imageProductCoverUpload } from '../../api/picture'
import { productUpdate } from '../../api/products'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Specification } from '../../types/specification'
import { productValidators } from '../../utils/validator/productValidator'

interface EditBookCardProps {
  productId: string
  initialBookData: Book
}

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`

export default function EditBookCard({
  productId,
  initialBookData,
}: EditBookCardProps) {
  const navigate = useNavigate()
  const [bookData, setBookData] = React.useState<Book>(initialBookData)
  const [cover, setCover] = React.useState<File | null>(null)
  const [errors, setErrors] = React.useState<Record<string, string>>({
    title: '',
    price: '',
    description: '',
    detail: '',
  })

  // 针对表单字段的通用变更处理（字符串和数字均转换为字符串进行保存，再转换成number）
  const handleChange = (field: keyof Book, value: string) => {
    setBookData((prev) => ({
      ...prev,
      [field]: field === 'price' ? parseFloat(value) || 0 : value,
    }))

    if (productValidators[field]) {
      const { valid, message } = productValidators[field](value)
      setErrors((prev) => ({ ...prev, [field]: valid ? '' : message || '' }))
    }
  }

  // 处理规格变更
  const handleSpecChange = (
    index: number,
    field: keyof Omit<Specification, 'id' | 'productId'>,
    value: string
  ) => {
    const newSpecs = [...(bookData.specifications || [])]
    newSpecs[index] = { ...newSpecs[index], [field]: value }
    setBookData((prev) => ({ ...prev, specifications: newSpecs }))
  }

  const [newSpec, setNewSpec] = React.useState<{ item: string; value: string }>(
    { item: '', value: '' }
  )
  const addSpecification = () => {
    if (newSpec.item.trim() && newSpec.value.trim()) {
      const spec: Specification = {
        id: '',
        productId: productId,
        item: newSpec.item.trim(),
        value: newSpec.value.trim(),
      }
      setBookData((prev) => ({
        ...prev,
        specifications: [...(prev.specifications || []), spec],
      }))
      setNewSpec({ item: '', value: '' })
    }
  }

  const removeSpecification = (index: number) => {
    const newSpecs = [...(bookData.specifications || [])]
    newSpecs.splice(index, 1)
    setBookData((prev) => ({ ...prev, specifications: newSpecs }))
  }

  // 处理标签操作
  const [newTag, setNewTag] = React.useState<string>('')
  const addTag = () => {
    if (newTag.trim()) {
      setBookData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }))
      setNewTag('')
    }
  }

  const removeTag = (index: number) => {
    const newTags = [...(bookData.tags || [])]
    newTags.splice(index, 1)
    setBookData((prev) => ({ ...prev, tags: newTags }))
  }

  const productInfoSubmit = (infoData: Book) => {
    console.log(infoData)
    productUpdate(infoData).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '提交成功',
          message: '数据更新完成！',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
        navigate(`/books/${productId}`)
      } else if (res.data.code === '400') {
        showToast({
          title: '提交失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！提交用户信息失败，请重新尝试提交！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  const handleSubmit = () => {
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    const firstErrorMessage = Object.values(errors).find((msg) => msg)

    if (firstErrorMessage !== undefined) {
      showToast({
        title: '提交失败',
        message: firstErrorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }

    if (!cover) {
      productInfoSubmit(bookData)
    } else {
      const coverFile = new FormData()
      coverFile.append('file', cover)
      imageProductCoverUpload(productId, coverFile).then((res) => {
        if (res.data.code === '200') {
          handleChange('cover', res.data.data)
          productInfoSubmit({ ...bookData, cover: res.data.data })
        } else if (res.data.code === '400') {
          showToast({
            title: '提交失败',
            message: res.data.msg,
            severity: ToastSeverity.Danger,
            duration: 3000,
          })
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错！提交书籍封面失败，请重新尝试提交！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }

  const handleCoverUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      showToast({
        title: '图片上传失败',
        message: '图片上传错误！请重新尝试',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    if (!file.type.startsWith('image/')) {
      showToast({
        title: '图片上传失败',
        message: '请选择有效的图片文件！',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    setCover(file)
    showToast({
      title: '图片选择成功',
      message: '请点击保存按钮以提交！',
      severity: ToastSeverity.Success,
      duration: 3000,
    })
  }

  // 渲染通用输入框
  const renderInput = (
    label: string,
    field: keyof Book,
    type: string = 'text'
  ) => (
    <Stack spacing={1}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          size="sm"
          type={type}
          value={bookData[field] ? bookData[field].toString() : ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={label}
        />
      </FormControl>
    </Stack>
  )

  return (
    <InfoCard
      title="编辑书籍信息"
      actions={
        <>
          <Button
            size="sm"
            color="primary"
            variant="plain"
            component="label"
            startDecorator={<UploadRoundedIcon />}
          >
            添加新封面
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleCoverUpdate}
            />
          </Button>
          <Button
            size="sm"
            variant="soft"
            onClick={handleSubmit}
            startDecorator={<SaveIcon />}
          >
            保存
          </Button>
        </>
      }
    >
      <Stack spacing={3}>
        {renderInput('标题', 'title')}
        {renderInput('价格', 'price', 'number')}
        <Stack spacing={1}>
          <FormLabel>简介</FormLabel>
          <FormControl>
            <Textarea
              minRows={2}
              value={bookData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="请输入商品简介"
              size="sm"
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>详细介绍（支持Markdown语法）</FormLabel>
          <FormControl>
            <Textarea
              minRows={3}
              value={bookData.detail || ''}
              onChange={(e) => handleChange('detail', e.target.value)}
              placeholder="请输入详细介绍"
              size="sm"
            />
          </FormControl>
        </Stack>

        {/* 规格部分 */}
        <Stack spacing={1}>
          <FormLabel>规格</FormLabel>
          {bookData.specifications &&
            bookData.specifications.map((spec, index) => (
              <Stack
                key={spec.id}
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                spacing={1}
              >
                <FormControl sx={{ flex: 1 }}>
                  <Input
                    size="sm"
                    value={spec.item}
                    placeholder="规格名称"
                    onChange={(e) =>
                      handleSpecChange(index, 'item', e.target.value)
                    }
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <Input
                    size="sm"
                    value={spec.value}
                    placeholder="规格值"
                    onChange={(e) =>
                      handleSpecChange(index, 'value', e.target.value)
                    }
                    endDecorator={
                      <IconButton
                        variant="soft"
                        color="danger"
                        onClick={() => removeSpecification(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </FormControl>
              </Stack>
            ))}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ flex: 1 }}
          >
            <FormControl sx={{ flex: 1 }}>
              <Input
                size="sm"
                value={newSpec.item}
                placeholder="规格名称"
                onChange={(e) =>
                  setNewSpec((prev) => ({ ...prev, item: e.target.value }))
                }
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <Input
                size="sm"
                value={newSpec.value}
                placeholder="规格值"
                onChange={(e) =>
                  setNewSpec((prev) => ({ ...prev, value: e.target.value }))
                }
                endDecorator={
                  <IconButton
                    variant="soft"
                    onClick={addSpecification}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                }
              />
            </FormControl>
          </Stack>
        </Stack>

        {/* 标签部分 */}
        <Stack spacing={1}>
          <FormLabel>标签</FormLabel>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ sm: 'center' }}
          >
            <FormControl sx={{ flex: 1 }}>
              <Input
                size="sm"
                value={newTag}
                placeholder="新标签"
                onChange={(e) => setNewTag(e.target.value)}
                endDecorator={
                  <IconButton onClick={addTag} color="primary" variant="soft">
                    <AddIcon />
                  </IconButton>
                }
              />
            </FormControl>
          </Stack>
          <Stack direction="row" flexWrap="wrap">
            {bookData.tags &&
              bookData.tags.map((tag, index) => (
                <Button
                  key={index}
                  variant="soft"
                  size="sm"
                  color="primary"
                  onClick={() => removeTag(index)}
                  endDecorator={<HighlightOffIcon />}
                  sx={{ mx: 0.5, mb: 0.5 }}
                >
                  {tag}
                </Button>
              ))}
          </Stack>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
