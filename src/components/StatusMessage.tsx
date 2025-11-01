interface StatusMessageProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
}) => {
  const colors = {
    success: "bg-[#daffeb] text-[#33b576] border-[#adffce]",
    error: "bg-[#ffe0e3] text-[#ff3656] border-[#ff3656]",
    warning: "bg-[#fefff2] text-[#9d9500] border-[#efe925]",
    info: "bg-[#dafffd] text-[#11c9bb] border-[#8bffe8]",
  };

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "🏏",
  };

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg border ${colors[type]}`}
    >
      <span className="text-lg">{icons[type]}</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
