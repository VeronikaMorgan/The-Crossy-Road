import { FaHeart, FaHeartBroken } from "react-icons/fa";

type Heart = "full" | "empty";

export const Heart = ({ type }: { type: Heart }) => {
  return type === "full" ? (
    <FaHeart className="text-red-500" size={32} />
  ) : (
    <FaHeartBroken className="text-gray-500" size={32} />
  );
};
