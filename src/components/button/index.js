import "./style.css";
const Button = ({ danger, active, disabled, children, ...props }) => {
  return (
    <button
      {...props}
      className={`btn ${danger ? "btn-danger" : "btn-success"} ${
        active ? "active" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
