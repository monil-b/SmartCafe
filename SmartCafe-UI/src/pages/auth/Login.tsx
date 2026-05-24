import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Login Successful");

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg rounded-xl overflow-hidden border border-border/70 shadow-xl">
        <div className="flex flex-col">
          {/* Left: Form */}
          <div className="w-full bg-card p-8 text-card-foreground md:p-12">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="mb-5 h-auto rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            <h2 className="text-center text-4xl font-extrabold mb-1">
              Welcome back
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Login to your account
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="mt-2 h-11 rounded-lg border border-input bg-background/70 p-3 shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="********"
                  className="mt-2 h-11 rounded-lg border border-input bg-background/70 p-3 shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-medium shadow-md"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="mt-4">
              <button className="w-full flex items-center justify-center gap-3 rounded-md border border-input bg-background py-2 text-foreground transition-colors hover:bg-muted">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-17.4-1.6-34.2-4.7-50.4H272v95.4h146.9c-6.3 34.1-25.6 62.9-54.6 82.2v68h88.3c51.6-47.5 80.9-117.6 80.9-195.2z"
                    fill="#4285F4"
                  />
                  <path
                    d="M272 544.3c73.7 0 135.6-24.5 180.8-66.6l-88.3-68c-24.6 16.5-56 26.3-92.5 26.3-71 0-131.1-47.9-152.6-112.2H30.2v70.6C75.3 477.9 168 544.3 272 544.3z"
                    fill="#34A853"
                  />
                  <path
                    d="M119.4 320.2c-8.9-26.6-8.9-55.3 0-81.9V167.7H30.2c-39.1 76.9-39.1 169.7 0 246.6l89.2-94.1z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M272 108.1c39.9 0 75.9 13.7 104.2 40.6l78.1-78.1C408 24.5 346.1 0 272 0 168 0 75.3 66.4 30.2 167.7l89.2 70.6C140.9 155.9 201 108.1 272 108.1z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Continue with Google
                </span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
