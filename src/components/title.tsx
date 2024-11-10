import React from "react";

const Title: React.FC = () => {
  return (
    <div className="flex items-center justify-center relative">
      <div className="relative w-4/5 mt-20">
        <span
          className="absolute text-4xl"
          style={{ top: "0%", left: "2%", zIndex: 3 }}
        >
          👩🏻‍🔧
        </span>
        <span
          className="absolute text-4xl"
          style={{ top: "5%", right: "20%", zIndex: 0 }}
        >
          🌼
        </span>
        <h1
          className="text-center text-7xl font-bold relative z-10"
          style={{ zIndex: 1 }}
        >
          Fields of Her
        </h1>
        <span
          className="absolute text-4xl"
          style={{ bottom: "-5%", left: "28%", zIndex: 0 }}
        >
          🌺
        </span>
        {/* <span
                className="absolute text-4xl"
                style={{ bottom: "5%", right: "15%", zIndex: 0 }}
              >
                🌻
              </span> */}
        <span
          className="absolute text-4xl"
          style={{ top: "55%", left: "-10%", zIndex: 5 }}
        >
          👩🏾‍🏫
        </span>
        <span
          className="absolute text-4xl"
          style={{ top: "42%", right: "-6%", zIndex: 0 }}
        >
          👩‍💻
        </span>
        <span
          className="absolute text-4xl"
          style={{ top: "90%", right: "20%", zIndex: 0 }}
        >
          👩🏼‍⚕️
        </span>
      </div>
    </div>
  );
};

export default Title;
