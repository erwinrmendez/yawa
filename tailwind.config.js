module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wgreen: "#538D4E",
        wyellow: "#B59F3B",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        shake: {
          "0%": { transform: "translateX(3px)" },
          "20%": { transform: "translateX(-3px)" },
          "40%": { transform: "translateX(3px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
          "100%": { transform: "translateX(0px)" },
        },
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(-90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
      animation: {
        bounce: "bounce 0.1s linear 1",
        shake: "shake 0.5s linear 1",
        flip: "flip 1s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
