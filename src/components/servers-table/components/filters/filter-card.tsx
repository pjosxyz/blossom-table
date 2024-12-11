import { PropsWithChildren } from "react";

type FilterCardProps = {
  title: string;
  info: string | number;
};

export default function FilterCard({
  title,
  info,
  children,
}: PropsWithChildren<FilterCardProps>) {
  return (
    <article className="p-4 flex flex-col gap-3 border-b border-slate-200">
      <div className="flex justify-between">
        <p className="text-sm capitalize">{title}</p>
        <p className="text-sm text-slate-500 first-letter:uppercase">{info}</p>
      </div>
      {children}
    </article>
  );
}
