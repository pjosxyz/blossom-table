import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function CopyURLButton({ url }: { url: string }) {
  function handleCopy() {
    navigator.clipboard.writeText(url);
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="self-start active:bg-white transition-colors"
      onClick={handleCopy}
    >
      {url} <Copy size={16} />
    </Button>
  );
}
