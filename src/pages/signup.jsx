import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link as MyLink } from "react-router-dom";
import './signup.css'
import { auth } from "../utils/firebade";
const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUpUser = () => {
    console.log(username);
    console.log(email);
    console.log(password);
    setLoading(true);
    createUserWithEmailAndPassword( auth, email, password)
      .then((user) => {
        console.log("User is signed up:", user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="form-container">
      <form className="custom-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
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
            onClick={handleSignUpUser}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        <p className="text-small">
          Already have an account?{" "}
          <MyLink className="link" to={"/signin"}>
            Sign in
          </MyLink>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
