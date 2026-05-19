import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Code2, Sparkles, Trophy, ListChecks, BarChart3, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "DSA Tracker - Master Coding Interviews",
  description: "Track your progress, solve curated problems across 15+ coding topics, and master the concepts needed to clear top tech company interviews.",
};

export default async function Home() {
  const user = await getSessionUser();

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(1200px_800px_at_top,oklch(0.95_0.02_277),transparent)] dark:bg-[radial-gradient(1200px_800px_at_top,oklch(0.2_0.03_277),transparent)]" />
      <div className="absolute top-[20%] left-[-10%] -z-10 h-[350px] w-[350px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
      <div className="absolute top-[40%] right-[-10%] -z-10 h-[350px] w-[350px] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-base font-black text-primary-foreground shadow-md shadow-primary/20">
              D
            </span>
            <span className="font-extrabold tracking-tight text-xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              DSA Tracker
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#topics" className="hover:text-foreground transition-colors">Curated Topics</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline text-xs text-muted-foreground font-medium">
                  Hi, {user.name}
                </span>
                <Link href="/dashboard">
                  <Button variant="default" size="sm" className="shadow-sm">
                    Dashboard <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" className="font-medium shadow-sm shadow-primary/10">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center">
        <section className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8 lg:pt-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary mb-6 animate-pulse">
              <Sparkles className="size-3.5" />
              <span>Next-Gen Coding Practice Tracker</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              A Structurally Curated Path to Master{" "}
              <span className="relative bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                DSA
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Track your progress, solve high-quality curated problems across 15+ essential coding topics, and master the concepts needed to clear top-tier tech company interviews.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              {user ? (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                    Go to Your Dashboard <ArrowRight className="size-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                      Start Practice Free <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-semibold hover:bg-muted/50">
                      Sign In to Account
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Quick Stat Bar */}
            <div id="stats" className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 w-full border border-border/40 rounded-2xl bg-card/50 backdrop-blur-sm p-6 shadow-sm">
              <div className="flex flex-col items-center justify-center p-2 border-r border-border/40">
                <span className="text-3xl font-extrabold text-foreground">15+</span>
                <span className="text-xs text-muted-foreground font-medium mt-1">Core DSA Topics</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 md:border-r md:border-border/40">
                <span className="text-3xl font-extrabold text-foreground">180+</span>
                <span className="text-xs text-muted-foreground font-medium mt-1">Curated Problems</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 border-r border-border/40 md:border-t-0 border-t md:pt-2 pt-6">
                <span className="text-3xl font-extrabold text-primary flex items-center gap-1">
                  100%
                </span>
                <span className="text-xs text-muted-foreground font-medium mt-1">Free to Use</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 border-t md:border-t-0 md:pt-2 pt-6">
                <span className="text-3xl font-extrabold text-foreground flex items-center gap-1">
                  Active
                </span>
                <span className="text-xs text-muted-foreground font-medium mt-1">Visual Progress</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for Focused Learning
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Say goodbye to random question picking. Focus on high-impact coding sheet templates that systematically teach you the key algorithmic patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative flex flex-col p-6 bg-card border border-border/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 group-hover:scale-110 transition-transform">
                <ListChecks className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Interactive Progress Tracking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Check off solved problems, and watch your dashboard's global and topic-level completion stats update instantly. Keep your momentum high.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative flex flex-col p-6 bg-card border border-border/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 mb-5 group-hover:scale-110 transition-transform">
                <Code2 className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Platform Curated Selection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Direct external links to top platforms. All problems are carefully categorized by difficulty (Easy, Medium, Hard) to help you step up progressively.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative flex flex-col p-6 bg-card border border-border/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 mb-5 group-hover:scale-110 transition-transform">
                <BarChart3 className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Visual Dashboard Metrics</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Analyze your progress with intuitive overall status meters. Perfect for daily standups, self-pacing, and technical interview warm-ups.
              </p>
            </div>
          </div>
        </section>

        {/* Curation Topics Preview */}
        <section id="topics" className="w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 border-t border-border/30 bg-muted/20 rounded-3xl mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Trophy className="size-3.5" />
                <span>Topic Coverage</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Comprehensive Roadmaps
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We've organized the coding challenges into structural buckets so you develop intuition for recursive reasoning, pointer operations, memory management, and optimization.
              </p>
              <div className="pt-2">
                {user ? (
                  <Link href="/dashboard">
                    <Button variant="outline" className="font-semibold gap-1.5">
                      Explore All Topics <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button variant="outline" className="font-semibold gap-1.5">
                      Explore All Topics <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Arrays & Hashing", count: "15 problems", desc: "Core collection manipulations, two-pointers, sliding windows." },
                { name: "Recursion & Backtracking", count: "18 problems", desc: "Tree traversals, permutations, subsets, and state decision trees." },
                { name: "Dynamic Programming", count: "25 problems", desc: "Memoization, tabulation, state machines, and knapsack variations." },
                { name: "Trees & Graphs", count: "30 problems", desc: "BFS, DFS, BST validation, union-find, and shortest paths." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-card border border-border/40 rounded-xl shadow-sm hover:border-primary/20 transition-all">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                      {item.name}
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-normal">{item.count}</span>
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/30 bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
              D
            </span>
            <span className="font-bold text-sm text-foreground">DSA Tracker</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DSA Tracker. Built for developers mastering computational problem solving.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
