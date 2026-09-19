export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
  );
}
