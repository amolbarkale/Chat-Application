import "./reg.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Reg() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("password doesnt mastch");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log("user:", user);

      try {
        await axios.post("http://localhost:5656/api/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log("err:", err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginwraper">
        <div className="loginleft">
          <h3 className="loginlogo">LogoHere</h3>
          <span className="loginDesc">Slogan of instagram</span>
        </div>
        <div className="loginright">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              ref={username}
              required
              placeholder="username"
              type="text"
              className="loginIp"
            />
            <input
              ref={email}
              required
              placeholder="mail"
              type="text"
              className="loginIp"
            />
            <input
              ref={password}
              required
              placeholder="pass"
              type="password"
              className="loginIp"
            />
            <input
              ref={passwordAgain}
              required
              placeholder="pass again"
              type="password"
              className="loginIp"
            />
            <button className="lognBtn" type="submit">
              SgnUp
            </button>
            <button className="loginRegisterBtn">Login if already have </button>
          </form>
        </div>
      </div>
    </div>
  );
}
