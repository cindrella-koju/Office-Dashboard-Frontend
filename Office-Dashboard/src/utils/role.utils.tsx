export function TickGreen({ label = "" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="text-green-600 text-xl font-bold">✔</span>
      {label && <span className="text-gray-600 text-xs">{label}</span>}
    </div>
  );
}

export function Cross(){
    return(
        <div className="flex items-center justify-center gap-1.5">
            <span className="text-red-600 text-xl font-bold">✘</span>
        </div>
    )
}

export const extractPageInsert = (pagename: string) => {
  const str = pagename.replace(/ /g, "_");
  return `${str}_page`;
};
