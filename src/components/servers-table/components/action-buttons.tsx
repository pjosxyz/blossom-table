import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

export default function ActionButtons() {
  return (
    <>
      <Button variant="link">
        Open <SquareArrowOutUpRight />
      </Button>
      <Button>Add review</Button>
    </>
  );
}
