import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function CopyURLButton({ url }: { url: string }) {
  return (
    <Button variant="outline" size="sm" className="self-start">
      {url} <Copy size={16} />
    </Button>
  );
}
