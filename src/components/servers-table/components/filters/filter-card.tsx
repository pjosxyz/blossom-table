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
    <div className="bg-slate-100 p-3 flex flex-col gap-3 rounded">
      <div className="flex justify-between">
        <p className="text-sm capitalize">{title}</p>
        <p className="text-sm text-slate-500 first-letter:uppercase">{info}</p>
      </div>
      {children}
    </div>
  );
}
