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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { imageProductCoverUploadWithoutCreate } from '../../api/picture'
import { productCreate } from '../../api/products'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Specification } from '../../types/specification'
import { productValidators } from '../../utils/validator/productValidator'

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

export default function CreateBookCard() {
  const navigate = useNavigate()
  const [cover, setCover] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({
    title: '',
    price: '',
    description: '',
    detail: '',
  })
  const [bookData, setBookData] = useState<Book>({
    id: '',
    title: '',
    price: 0,
    description: '',
    detail: '',
    cover: '',
    specifications: [],
    tags: [],
    rate: 0,
  })

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

  const handleSpecChange = (
    index: number,
    field: keyof Omit<Specification, 'id' | 'productId'>,
    value: string
  ) => {
    const newSpecs = [...(bookData.specifications || [])]
    newSpecs[index] = { ...newSpecs[index], [field]: value }
    setBookData((prev) => ({ ...prev, specifications: newSpecs }))
  }

  const [newSpec, setNewSpec] = useState<{ item: string; value: string }>({
    item: '',
    value: '',
  })
  const addSpecification = () => {
    if (newSpec.item.trim() && newSpec.value.trim()) {
      const spec: Specification = {
        id: '',
        productId: '', // Leave blank for new book creation
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

  const [newTag, setNewTag] = useState<string>('')
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
    productCreate(infoData).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '创建成功',
          message: `书籍 ${infoData.title} 已经成功创建！`,
          severity: ToastSeverity.Success,
          duration: 3000,
        })
        navigate(`/books/${res.data.data.id}`)
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
      imageProductCoverUploadWithoutCreate(coverFile).then((res) => {
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

  const handleCoverAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      title="创建书籍"
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
              onChange={handleCoverAdd}
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
