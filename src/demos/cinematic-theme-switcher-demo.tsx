import { ThemeProvider, useTheme } from "next-themes";
import { CinematicThemeSwitcher } from "../../components/toggles";

function PreviewSurface() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <div className={`flex min-h-96 w-full items-center justify-center p-6 transition-colors duration-700 ease-in-out ${dark ? "bg-[#1d1e1f]" : "bg-white"}`}>
      <CinematicThemeSwitcher />
    </div>
  );
}

export function CinematicThemeSwitcherDemo() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <PreviewSurface />
    </ThemeProvider>
  );
}
