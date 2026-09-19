import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">404 - Not Found</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The requested resource was not found. Let&apos;s get you back to the workbench.
        </p>
      </div>
      <Button render={<Link href="/" />}>
        Back to Workbench
      </Button>
    </div>
  );
}
