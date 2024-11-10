import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, any>,
        options?: Partial<{ respectPrefix: boolean; respectImportant: boolean }>
      ) => void;
    }) {
      const newUtilities = {
        ".box-glow": {
          "box-shadow":
            "0 5px 15px rgba(255, 255, 0, 0.2), 0 10px 30px rgba(255, 255, 0, 0.2), 0 5px 20px rgba(255, 255, 0, 0.2)",
        },
        ".text-justify": {
          "text-align": "justify",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
