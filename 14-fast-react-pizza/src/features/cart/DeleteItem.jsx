import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispactch = useDispatch();

  return (
    <Button type="small" onClick={() => dispactch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
