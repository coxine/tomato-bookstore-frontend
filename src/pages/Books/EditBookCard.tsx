import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@mui/joy'
import React from 'react'

import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Specification } from '../../types/specification'

interface EditBookCardProps {
  initialBookData: Book
}

export default function EditBookCard({ initialBookData }: EditBookCardProps) {
  const [bookData, setBookData] = React.useState<Book>(initialBookData)

  // 针对表单字段的通用变更处理（字符串和数字均转换为字符串进行保存，再转换成number）
  const handleChange = (field: keyof Book, value: string) => {
    setBookData((prev) => ({
      ...prev,
      [field]: field === 'price' ? parseFloat(value) || 0 : value,
    }))
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

  // 添加新规格，临时生成 id 可用 index 拼接时间戳
  const [newSpec, setNewSpec] = React.useState<{ item: string; value: string }>(
    { item: '', value: '' }
  )
  const addSpecification = () => {
    if (newSpec.item.trim() && newSpec.value.trim()) {
      const spec: Specification = {
        id: Date.now().toString(),
        productId: '', // 此处 productId 留空
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

  const handleSubmit = () => {
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    console.log('提交的商品数据：', bookData)
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
        <Button size="sm" variant="solid" onClick={handleSubmit}>
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
                <Button
                  variant="outlined"
                  color="danger"
                  size="sm"
                  onClick={() => removeSpecification(index)}
                >
                  删除
                </Button>
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
            <Button variant="solid" size="sm" onClick={addSpecification}>
              添加规格
            </Button>
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
            <Button variant="solid" size="sm" onClick={addTag}>
              添加标签
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            {bookData.tags &&
              bookData.tags.map((tag, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="sm"
                  onClick={() => removeTag(index)}
                >
                  {tag} x
                </Button>
              ))}
          </Stack>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
