export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">README.md</h1>
        
        <p className="text-xl text-muted-foreground mb-12 font-medium">
          SimpleDiff is a digital product studio built on the belief that software has become too complex.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4 border-b border-border pb-2">## Core Principles</h2>
        
        <div className="space-y-8 mt-8">
          <div>
            <h3 className="text-xl font-bold mb-2">### 1. Clarity over Cleverness</h3>
            <p className="text-muted-foreground leading-relaxed">
              Code should be easy to read. Interfaces should be easy to use. We don&apos;t build things to show off; we build them to solve problems efficiently. If it&apos;s hard to explain, it&apos;s too complex.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">### 2. Purpose-Driven Scope</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every feature must justify its existence. If it doesn&apos;t serve the core purpose of the product, it gets cut. This approach saves time, money, and future maintenance headaches.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">### 3. The Difference is in the Details</h3>
            <p className="text-muted-foreground leading-relaxed">
              Simplicity doesn&apos;t mean boring. By removing the noise, we create room for thoughtful micro-interactions, robust performance, and a distinctive aesthetic that feels premium.
            </p>
          </div>
        </div>
        
        <hr className="my-12 border-border" />
        
        <div className="bg-muted/10 p-6 rounded-lg border border-border">
          <code className="text-sm font-mono text-muted-foreground block">
            $ npx simplediff init<br/>
            &gt; Initializing minimal core...<br/>
            &gt; Cutting bloat...<br/>
            &gt; Ready to build.
          </code>
        </div>
      </div>
    </div>
  );
}
