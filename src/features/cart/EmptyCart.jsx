import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="p-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-6 text-xl font-semibold">
        Your cart empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
