import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const clientId = "test_id";
  //const clientSecret = "RBvJGhpDhv9PmryWPx9RYi0SvKGKyuSJ";
  const redirectUri = encodeURIComponent("http://localhost:5173/callback");

  const authUri = `http://localhost:8080/realms/master/protocol/openid-connect/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  console.log(authUri);

  const handleLogin = () => {
    window.open(authUri, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/user");
    }
  }, []);

  return (
    <div>
      <h1>OAuth2.0 - Keycloak</h1>

      <button onClick={handleLogin}>Log in with Keycloak</button>
    </div>
  );
};

export default Home;
