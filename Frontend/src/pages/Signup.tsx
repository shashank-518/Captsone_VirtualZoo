import { useState } from "react";
import InputField from "../components/ui/InputField";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSignup = async () => {
    const response = await fetch("https://captsone-virtualzoo.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

        <InputField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && <p className="text-center text-sm mt-2 text-blue-600">{message}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
