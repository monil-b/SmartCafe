import { useState } from "react";

import { updateUserProfile } from "@/api/authApi";

import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

const Profile = () => {
  const [name, setName] = useState(userInfo.name || "");

  const [email, setEmail] = useState(userInfo.email || "");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await updateUserProfile({
        name,
        email,
        password,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-xl">
        <Card>
          <CardContent className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">My Profile</h1>

              <p className="mt-2 text-muted-foreground">
                Update your account details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>

                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>

                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader /> : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
