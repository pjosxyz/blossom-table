import { Button } from "@/components/ui/button"

function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3">
      <img src="/logo.svg" width={180} alt="Blossom Servers Review Site" />
      <Button>Add Server</Button>
    </header>
  );
}

export default Header;
