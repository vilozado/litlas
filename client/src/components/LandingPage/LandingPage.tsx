import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login, signup } from "../../services/authService";
import type { UserData } from "../../types/userData";
import "./LandingPage.css";
import { FaBookOpen, FaGlobeAmericas, FaMapMarkedAlt } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    // capitalize the first letter of each word in the name input
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const normalizedName = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    // handle login or register
    if (isLogin) {
      try {
        await login({ email, password } as UserData);
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        navigate("/dashboard");
      } catch (error: unknown) {
        if (error instanceof Error) {
          const message = error.message;
          setError(message || "Something went wrong. Please try again.");
        } else {
          setError("Unexpected error. Please try again.");
        }
      }
    } else {
      try {
        await signup({ name: normalizedName, email, password } as UserData);
        setName("");
        setEmail("");
        setPassword("");
        setIsLogin(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          const message = error.message;
          setError(message || "Something went wrong. Please try again.");
        } else {
          setError("Unexpected error. Please try again.");
        }
      }
    }
  };

  const visitLogin = () => {
    setIsLogin(true);
    setError(null);
  };

  const visitRegister = () => {
    setIsLogin(false);
    setError(null);
  };

  const features = [
    {
      icon: FaGlobeAmericas,
      title: "Explore literature by country",
      description:
        "Click anywhere on the world map to discover books connected to that nation’s literary tradition.",
    },
    {
      icon: FaBookOpen,
      title: "Build your global reading list",
      description:
        "Save recommendations and organize them into 'Read' and 'To Be Read' as you plan your literary journey.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Track your progress visually",
      description:
        "Watch countries light up as you read, turning your reading habits into a global map of exploration.",
    },
  ];

  return (
    <div className="auth-page-body">
      {/* Left side: Login form */}
      <div className="landing-left">
        <div>
          <h1 className="landing-title">LITLAS</h1>
        </div>

        <div className="landing-features">
          {features.map((f) => (
            <div key={f.title} className="feature-item">
              <f.icon className="feature-icon" />
              <div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-description">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="landing-footer">
          © {new Date().getFullYear()} LITLAS. All rights reserved.
        </p>
      </div>

      {/* Right side: Login form */}
      <div className="auth-right">
        <div className="auth-form-div">
          <h1 className="auth-form-title">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <h2 className="auth-form-subtitle">
            {isLogin
              ? "Sign in to continue your literary journey"
              : "Sign up to start your literary journey"}
          </h2>
          {error && (
            <div role="alert" className="alert-message">
              {error}
            </div>
          )}
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="input-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="input-box"
                  value={name}
                  onChange={handleChange}
                  required
                  pattern=".{3,}"
                  title="Name must contain at least 3 characters"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="this@example.com"
                className="input-box"
                value={email}
                onChange={handleChange}
                required
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
                autoComplete="email"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="input-box"
                value={password}
                onChange={handleChange}
                required
                pattern={
                  isLogin ? undefined : "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                }
                title={
                  isLogin
                    ? undefined
                    : "Must contain at least 8 characters with uppercase, lowercase, and a number."
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="show-hide-btn"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            <div>
              <button type="submit" className="auth-btn">
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="switch-page-div">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button onClick={visitRegister} className="switch-page-btn">
                  Sign up here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={visitLogin} className="switch-page-btn">
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
