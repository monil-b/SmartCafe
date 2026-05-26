import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { verifyOTP, resendOTP } from "@/api/authApi";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await verifyOTP(email, otp);

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("Login successful");

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP(email);

      toast.success("OTP resent");

      setTimer(60);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-2 text-3xl font-bold">Verify OTP</h1>

        <p className="mb-6 text-muted-foreground">
          Enter OTP sent to your email.
        </p>

        <form onSubmit={handleVerifyOTP} className="space-y-5">
          <div className="space-y-2">
            <Label>OTP</Label>

            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (!value) return;

                    const otpArray = otp.split("").concat(Array(6).fill(""));

                    otpArray[index] = value;

                    const newOtp = otpArray.slice(0, 6).join("");

                    setOtp(newOtp);

                    const nextInput = document.getElementById(
                      `otp-${index + 1}`,
                    );

                    if (nextInput) {
                      (nextInput as HTMLInputElement).focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" || e.key === "Delete") {
                      e.preventDefault();

                      const otpArray = otp.split("").concat(Array(6).fill(""));

                      if (otpArray[index]) {
                        otpArray[index] = "";

                        setOtp(otpArray.join(""));
                      } else if (index > 0) {
                        otpArray[index - 1] = "";

                        setOtp(otpArray.join(""));

                        const prevInput = document.getElementById(
                          `otp-${index - 1}`,
                        );

                        if (prevInput) {
                          (prevInput as HTMLInputElement).focus();
                        }
                      }
                    }
                  }}
                  className="h-12 w-12 text-center text-lg font-semibold"
                />
              ))}
            </div>
          </div>

          <div className="text-center text-sm">
            {timer > 0 ? (
              <p className="text-muted-foreground">Resend OTP in {timer}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="font-medium text-orange-500 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default VerifyOTP;
