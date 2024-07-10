import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const decoded = jwtDecode(token);
  const [show, setSetshow] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const showDecode = () => {
    setSetshow(!show);
  };

  return (
    <div>
      <h1>Hello {decoded.given_name.toUpperCase()} Here is your Token</h1>

      {!show ? (
        <p>{token}</p>
      ) : (
        <div>
          <h3>Decoded Token:</h3>
          <pre>{JSON.stringify(decoded, null, 2)}</pre>
        </div>
      )}

      <button onClick={showDecode}>
        {!show ? "See Decoded Token" : "Hide Decoded Token"}
      </button>

      <button onClick={handleLogOut}>Log Me Out</button>
    </div>
  );
};

export default User;
