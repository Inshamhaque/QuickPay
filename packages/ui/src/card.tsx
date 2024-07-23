export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="m-2 border p-5 rounded-md border-black bg-white">
      <h1 className="text-xl md-2 border-b border-gray-400 pb-2">{title}</h1>
      {children}
    </div>
  );
}
