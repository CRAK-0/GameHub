import { Gamepad2 } from "lucide-react";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-bold tracking-tight"
    >
      <Gamepad2 className="text-purple-500" size={48} />

      <span>
        <span className="text-white">Game</span>
        <span className="text-purple-500">Hub</span>
      </span>
    </Link>
  );
}

export default Logo;
