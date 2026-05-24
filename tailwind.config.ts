import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          50: "#eaeef5",
          100: "#c8d3e3",
          200: "#94a6c2",
          300: "#5f7aa1",
          400: "#2f4d7a",
          500: "#1a3258",
          600: "#102544",
          700: "#081E3B", // secondary navy
          800: "#051838",
          900: "#02132C", // deep navy (primary brand)
          950: "#010a1a",
        },
        gold: {
          50: "#fdf8ea",
          100: "#fbeec5",
          200: "#F7DC94", // light gold
          300: "#E8C26B",
          400: "#D7A84F",
          500: "#C8903B", // main gold
          600: "#B27F31",
          700: "#9D6C27", // dark gold
          800: "#7c531e",
          900: "#5d3e17",
        },
        ivory: {
          DEFAULT: "#FAFAF8",
          50: "#FAFAF8",
          100: "#F5F1EE", // warm pearl
        },
        pearl: "#F5F1EE",
        beige: {
          border: "#DDD2C8",
          DEFAULT: "#DDD2C8",
        },
        ink: {
          DEFAULT: "#10223B", // dark text
          muted: "#333F54", // muted text
          charcoal: "#110D0E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        premium: "0 1px 2px rgba(2,19,44,0.04), 0 8px 24px rgba(2,19,44,0.06)",
        "premium-lg":
          "0 4px 8px rgba(2,19,44,0.06), 0 24px 48px -12px rgba(2,19,44,0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
