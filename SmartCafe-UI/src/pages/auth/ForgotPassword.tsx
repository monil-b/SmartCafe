import { useState } from "react";

import { forgotPassword } from "@/api/authApi";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await forgotPassword(email);

      toast.success(data.message);

      setEmail("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-2 text-3xl font-bold">Forgot Password</h1>

        <p className="mb-6 text-muted-foreground">
          Enter your email to receive reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
