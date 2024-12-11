import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-[100dvh] lg:mx-auto lg:px-4 xl:container max-w-6xl">
      <Header />
      <div className="mt-10">{children}</div>
    </main>
  );
}

export default BaseLayout;
