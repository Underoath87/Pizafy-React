import { useSelector } from "react-redux";
import { formatCurrency } from "./../../utils/helpers";
import { getCurrentQuantity } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./updateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  return (
    <li className="flex items-center justify-between py-4">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between space-x-4">
        <p className="text-sm font-semibold text-stone-700">
          {formatCurrency(totalPrice)}
        </p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
