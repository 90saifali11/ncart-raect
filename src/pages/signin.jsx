import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Link as MyLink, useNavigate } from "react-router-dom";
import './signin.css'
import { auth } from "../utils/firebade";
const SigninForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup( auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("errorMessage->", error.message);
      });
  };

  return (
    <div className="form-container">
      <form className="custom-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className={`btn ${loading ? "btn-loading" : ""}`}
            onClick={loginUser}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <h1 className="text-center">Or</h1>
        <div className="form-group">
          <button
            type="button"
            className={`btn ${loading ? "btn-loading" : ""}`}
            onClick={loginWithGoogle}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login with Google"}
          </button>
        </div>
        <p className="text-small">
          Need to create an account?{" "}
          <MyLink to={"/signup"} className="link">
            Sign up
          </MyLink>
        </p>
      </form>
    </div>
  );
};

export default SigninForm;

