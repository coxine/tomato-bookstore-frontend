import {
  AddShoppingCart,
  Delete,
  Edit,
  // Star,
  // ShoppingCartCheckout,
} from '@mui/icons-material'
import { Box, Button } from '@mui/joy'
import { Link } from 'react-router-dom'

import { Book } from '../../types/book'

interface BookActionsProps {
  book: Book
  onCartAction: (mode: 'add' | 'buy') => void
  onDeleteClick: () => void
}

export function BookActions({
  book,
  onCartAction,
  onDeleteClick,
}: BookActionsProps) {
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN'

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          color="warning"
          variant="soft"
          startDecorator={<AddShoppingCart />}
          onClick={() => onCartAction('add')}
        >
          加入购物车
        </Button>
        {/* <Button
          color='warning'
          variant="outlined"
          startDecorator={<Star />}>
          书籍评分
        </Button> */}
        {/* <Button
          color="danger"
          variant="soft"
          startDecorator={<ShoppingCartCheckout />}
          onClick={() => onCartAction('buy')}
        >
          立即购买
        </Button> */}
      </Box>

      {isAdmin && (
        <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
          <Link to={`/books/edit/${book.id}`}>
            <Button color="primary" variant="soft" startDecorator={<Edit />}>
              编辑书籍
            </Button>
          </Link>
          <Button
            color="danger"
            variant="soft"
            startDecorator={<Delete />}
            onClick={onDeleteClick}
          >
            删除书籍
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default BookActions
