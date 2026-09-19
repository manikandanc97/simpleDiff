import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About SimpleDiff — A digital product studio built on the belief that digital products and software should be simple, focused, and different.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="max-w-none">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">About.</h1>
        
        <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
          SimpleDiff is a digital product studio built on the belief that digital products and websites have become unnecessarily complex. We design and build clean, focused software that delivers results without the bloat.
        </p>

        {/* Who we are */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">Who we are</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We are a hands-on design and engineering studio working directly with founders, business owners, and teams who need a dedicated partner to turn ideas into polished products.
          </p>
          {/* TODO(owner): add a real founder/team paragraph. */}
          {SITE.location && (
            <p className="text-sm font-medium text-foreground">
              {SITE.location}
            </p>
          )}
        </section>

        {/* Core Principles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Core Principles</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">1. Clarity over cleverness</h3>
              <p className="text-muted-foreground leading-relaxed">
                Code should be easy to read. Interfaces should be easy to use. We don&apos;t build things to show off; we build them to solve problems efficiently. If it&apos;s hard to explain, it&apos;s too complex.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">2. Purpose-driven scope</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every feature must justify its existence. If it doesn&apos;t serve the core purpose of the product, it gets cut. This approach saves time, money, and future maintenance headaches.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">3. The difference is in the details</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simplicity doesn&apos;t mean boring. By removing the noise, we create room for thoughtful micro-interactions, robust performance, and a distinctive aesthetic that feels premium.
              </p>
            </div>
          </div>
        </section>

        {/* How to reach us */}
        {(SITE.email || SITE.whatsapp || SITE.responseTime) && (
          <section className="pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">How to reach us</h2>
            {SITE.responseTime && (
              <p className="text-muted-foreground mb-4">
                Typical response time: {SITE.responseTime}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              {SITE.email && (
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-primary hover:underline"
                >
                  {SITE.email}
                </a>
              )}
              {SITE.whatsapp && (
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
