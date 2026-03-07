import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

const text = {
  en: {
    login: "Log in",
    phone: "Phone number",
    email: "Email Login",
    password: "Password",
    register: "Register",
    remember: "Remember password",
  },
  hi: {
    login: "लॉग इन करें",
    phone: "फोन नंबर",
    email: "ईमेल लॉगिन",
    password: "पासवर्ड",
    register: "पंजीकरण करवाना",
    remember: "पासवर्ड याद रखें",
  },
};

export default function Login() {
  const [tab, setTab] = useState("phone");
  const [lang, setLang] = useState("en");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        (tab === "phone" ? u.phone === phone : u.email === email) &&
        u.password === password,
    );

    if (user) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
    } else alert("Invalid credentials");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="topbar">
          <span className="logo">Paisaaa</span>

          <button
            className="lang-btn"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
          >
            {lang === "en" ? "EN" : "HD"}
          </button>
        </div>

        <h2>{text[lang].login}</h2>

        <div className="tabs">
          <div
            className={tab === "phone" ? "tab active" : "tab"}
            onClick={() => setTab("phone")}
          >
            {text[lang].phone}
          </div>

          <div
            className={tab === "email" ? "tab active" : "tab"}
            onClick={() => setTab("email")}
          >
            {text[lang].email}
          </div>
        </div>

        {tab === "phone" ? (
          <input
            className="input"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        ) : (
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <div style={{ position: "relative" }}>
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            placeholder={text[lang].password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="remember">
          <input type="checkbox" />
          <span>{text[lang].remember}</span>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          {text[lang].login}
        </button>

        <button className="register-btn" onClick={() => navigate("/register")}>
          {text[lang].register}
        </button>
      </div>
    </div>
  );
}
