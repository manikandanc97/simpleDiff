"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ColorPicker } from "@/components/theme/color-picker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const pathname = usePathname();
  
  // Format breadcrumb: /work -> ~/simplediff/work
  const breadcrumb = pathname === "/" 
    ? "~/simplediff/workbench" 
    : `~/simplediff${pathname}`;

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4 md:pl-20">
      <div className="font-mono text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-none">
        <Link href="/" className="hover:text-foreground transition-colors">
          {breadcrumb}
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger render={<Button variant="ghost" size="icon" className="rounded-full" title="Theme Settings" />}>
            <Palette className="h-4 w-4" />
            <span className="sr-only">Theme Settings</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-center">Appearance</h2>
              <ColorPicker />
            </div>
          </DialogContent>
        </Dialog>
        <ThemeToggle />
      </div>
    </div>
  );
}
