import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.userName);

  return (
    <div className="my-10 text-center">
      <h1 className="mb-10 text-2xl font-semibold text-stone-700 sm:my-16 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          We're Happy to serve you, {username}🩷
        </Button>
      )}
    </div>
  );
}

export default Home;
