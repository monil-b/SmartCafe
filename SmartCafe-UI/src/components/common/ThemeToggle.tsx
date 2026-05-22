import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="rounded-2xl bg-background/80 shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5"
    >
      {isDark ? (
        <SunMedium className="size-4" />
      ) : (
        <MoonStar className="size-4" />
      )}
    </Button>
  );
};

export { ThemeToggle };
