import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "./../../store.js";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="space-y-6">
        <div className="label">
          <label className="font-medium sm:w-40">First Name</label>
          <input
            className="w-full"
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={userName}
          />
        </div>

        <div className="label">
          <label className="font-medium sm:w-40">Phone number</label>
          <div className="w-full">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-2xl bg-red-100 px-2 text-xs text-red-900">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="label relative">
          <label className="font-medium sm:w-40">Address</label>
          <div className="w-full">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              className="input"
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-2xl bg-red-100 px-2 text-xs text-red-900">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute top-9 right-0">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-10 flex items-center space-x-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 cursor-pointer accent-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-bold text-stone-800">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Process Order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log(newOrder);

  store.dispatch(clearCart());

  // console.log(newOrder);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
