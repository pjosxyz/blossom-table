import { ServerDetailProps } from "@/components/servers-table/types"

export default function ServerDetail({ serverDetail }: ServerDetailProps) {
  return (
    <div className="flex items-center lg:flex-col lg:items-start gap-2">
      
      <span className="break-words">{serverDetail.serverName}</span>
      {serverDetail.isPaidServer && (
        <span className="inline-flex self-start items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          Paid
        </span>
      )}
    </div>
  );
}
