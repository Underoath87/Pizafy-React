import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-y-scroll">
      {isLoading && <Loader />}

      <Header />

      <main className="max-w-3xl px-5">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default Applayout;
