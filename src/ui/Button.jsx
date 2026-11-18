import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "focus-within: cursor-pointer rounded-full bg-yellow-400  font-bold uppercase transition-colors duration-300 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-1 md:px-5 md: py-2.5 text-xs md:text-base",
    round:
      " px-3 py-2 md:px-3 text-sm md:text-base bg-yellow-500 rounded-full font-bold hover:bg-yellow-400 cursor-pointer transition-all duration-300",
    secondary:
      "  px-4 py-3 md:px-6 md:py-4 focus-within: cursor-pointer text-stone-400 rounded-full border-2 border-stone-300  font-bold uppercase transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:outline-none",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
