import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center px-8 py-5">
        <Logo />
      </div>
    </nav>
  );
}
