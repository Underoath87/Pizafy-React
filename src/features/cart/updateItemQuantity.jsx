import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantiy, increaseQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseQuantiy(pizzaId))}>
        &minus;
      </Button>
      <span className="text-xs font-bold">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
