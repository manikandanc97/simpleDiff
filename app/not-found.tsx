import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">404 &mdash; Page Not <span className="text-primary">Found</span></h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The requested page doesn&apos;t exist. Let&apos;s get you back home.
        </p>
      </div>
      <Link href="/" className={buttonVariants({ variant: "default", size: "lg" })}>
        Back to Home &rarr;
      </Link>
    </div>
  );
}
