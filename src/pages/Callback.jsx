import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) navigate("/user");

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);

    if (code) {
      getAccessToken(code);
    } else {
      navigate("/");
    }
  }, []);

  const getAccessToken = async (code) => {
    try {
      const clientId = "test_id";
      const clientSecret = "RBvJGhpDhv9PmryWPx9RYi0SvKGKyuSJ";
      const redirectUri = "http://localhost:5173/callback";

      const tokenUrl =
        "http://localhost:8080/realms/master/protocol/openid-connect/token";

      const params = new URLSearchParams();
      params.append("code", code);
      params.append("grant_type", "authorization_code");
      params.append("redirect_uri", redirectUri);
      params.append("client_id", clientId);
      params.append("client_secret", clientSecret);

      console.log(params);

      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      const data = await response.json();
      console.log(data);

      localStorage.setItem("access_token", data.access_token);

      navigate("/user");
    } catch (error) {
      navigate("/");
      window.alert("opps ");
    }
  };

  return (
    <div>
      <span className="loader"></span>;
    </div>
  );
};

export default Callback;
