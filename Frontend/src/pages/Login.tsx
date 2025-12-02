import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage(""); // Clear old errors

    const response = await fetch("https://captsone-virtualzoo.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data);
    

    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.name);
      // 👉 Redirect immediately without showing any message
      navigate("/home", { replace: true });
      return;
    }

    // 👉 Only show error messages
    setMessage(data.message || "Login failed");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <InputField 
          label="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error message */}
        {message && (
          <p className="text-red-600 text-center mt-2">{message}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
  Signup
</Link>
        </p>
      </div>
    </div>
  );
}
