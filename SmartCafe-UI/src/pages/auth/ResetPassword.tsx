import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "@/api/authApi";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await resetPassword(token!, password);

      toast.success(data.message);

      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-2 text-3xl font-bold">Reset Password</h1>

        <p className="mb-6 text-muted-foreground">Enter your new password.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>New Password</Label>

            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
