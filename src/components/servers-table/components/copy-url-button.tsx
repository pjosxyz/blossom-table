import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export default function CopyURLButton({ url }: { url: string }) {
  const { toast } = useToast();

  function handleCopy() {
    navigator.clipboard.writeText(url);
    toast({
      description: "URL copied to clipboard",
      duration: 2500,
    });
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
