import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SaveIcon from '@mui/icons-material/Save'
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Textarea,
} from '@mui/joy'
import { useState } from 'react'

import { productCreate } from '../../api/products'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Specification } from '../../types/specification'

export default function CreateBookCard() {
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

  const handleSubmit = () => {
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    productCreate(bookData).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '创建成功',
          message: '',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
      } else if (res.data.code === '400') {
        showToast({
          title: '提交失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      }
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
        <Button
          size="sm"
          variant="soft"
          onClick={handleSubmit}
          startDecorator={<SaveIcon />}
        >
          保存
        </Button>
      }
    >
      <Stack spacing={3}>
        {renderInput('标题', 'title')}
        {renderInput('价格', 'price', 'number')}
        <Stack spacing={1}>
          <FormLabel>描述</FormLabel>
          <FormControl>
            <Textarea
              minRows={2}
              value={bookData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="请输入商品描述"
              size="sm"
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>详细介绍</FormLabel>
          <FormControl>
            <Textarea
              minRows={3}
              value={bookData.detail || ''}
              onChange={(e) => handleChange('detail', e.target.value)}
              placeholder="请输入详细信息"
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
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <FormControl>
                  <Input
                    size="sm"
                    value={spec.item}
                    placeholder="规格名称"
                    onChange={(e) =>
                      handleSpecChange(index, 'item', e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    value={spec.value}
                    placeholder="规格值"
                    onChange={(e) =>
                      handleSpecChange(index, 'value', e.target.value)
                    }
                  />
                </FormControl>
                <IconButton
                  variant="soft"
                  color="danger"
                  size="sm"
                  onClick={() => removeSpecification(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl>
              <Input
                size="sm"
                value={newSpec.item}
                placeholder="规格名称"
                onChange={(e) =>
                  setNewSpec((prev) => ({ ...prev, item: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <Input
                size="sm"
                value={newSpec.value}
                placeholder="规格值"
                onChange={(e) =>
                  setNewSpec((prev) => ({ ...prev, value: e.target.value }))
                }
              />
            </FormControl>
            <IconButton
              variant="soft"
              size="sm"
              onClick={addSpecification}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* 标签部分 */}
        <Stack spacing={1}>
          <FormLabel>标签</FormLabel>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl>
              <Input
                size="sm"
                value={newTag}
                placeholder="新标签"
                onChange={(e) => setNewTag(e.target.value)}
              />
            </FormControl>
            <IconButton
              variant="soft"
              size="sm"
              onClick={addTag}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            {bookData.tags &&
              bookData.tags.map((tag, index) => (
                <Button
                  key={index}
                  variant="soft"
                  size="sm"
                  color="primary"
                  onClick={() => removeTag(index)}
                  endDecorator={<HighlightOffIcon />}
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
