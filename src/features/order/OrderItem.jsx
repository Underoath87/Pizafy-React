import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex justify-between p-4">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm font-medium text-gray-700 capitalize italic">
        {isLoadingIngredients ? "Proceeding" : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
