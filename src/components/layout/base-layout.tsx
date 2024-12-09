import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-[100dvh] sm:container sm:mx-auto max-w-6xl">
      <Header />
      <div className="mt-10">{children}</div>
    </main>
  );
}

export default BaseLayout;
