import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#000000",
          900: "#050505",
          850: "#0a0a0a",
          800: "#111111",
          700: "#1a1a1a"
        },
        abyssal: {
          void: "#000000",
          obsidian: "#050505",
          hellfire: {
            magma: "#ff4d00",
            crimson: "#990000",
            charcoal: "#1a0f0f",
          },
          nature: {
            emerald: "#10b981",
            cyan: "#06b6d4",
            yellow: "#facc15",
          }
        },
        signal: {
          green: "#22c55e",
          cyan: "#00f2ff",
          amber: "#e9d7b6",
          red: "#ff5871",
          violet: "#c4a0ff"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
        brutal: ["Oswald", "sans-serif"],
      },
      boxShadow: {
        cinematic: "0 28px 90px rgba(0, 0, 0, 0.48)",
        neon: "0 0 48px rgba(0, 242, 255, 0.16)",
        magma: "0 0 60px rgba(255, 77, 0, 0.3)",
      },
      backgroundImage: {
        "fine-grid":
          "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)"
      },
      keyframes: {
        "magma-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "beam": {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { top: "100%", opacity: "0" }
        }
      },
      animation: {
        "magma-pulse": "magma-pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "beam": "beam 2.5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

