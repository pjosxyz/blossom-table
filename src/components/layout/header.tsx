import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="flex justify-between items-center px-2 sm:px-4 lg:px-0 py-3">
      <img src="/logo.svg" width={180} alt="Blossom Servers Review Site" />
      <Button variant="primary" size="lg">
        Add Server
      </Button>
    </header>
  );
}

export default Header;
