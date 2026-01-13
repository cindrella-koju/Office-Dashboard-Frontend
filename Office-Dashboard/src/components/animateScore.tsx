import { useEffect, useRef, useState } from "react";
type AnimatedScoreProps = {
  value: number;
};

const AnimatedScore: React.FC<AnimatedScoreProps> = ({ value }) => {
  const prev = useRef<number>(value);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (value > prev.current) setDirection("up");
    else if (value < prev.current) setDirection("down");
    prev.current = value;
  }, [value]);

  return (
    <span
      key={value}
      className={`inline-block text-[22rem] font-extrabold text-gray-600 leading-none ${
        direction === "up"
          ? "animate-up"
          : direction === "down"
          ? "animate-down"
          : ""
      }`}
    >
      {value}
    </span>
  );
};

export default AnimatedScore