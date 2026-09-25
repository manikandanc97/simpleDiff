import {
  Activity,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  FolderOpen,
  Map,
  RefreshCw,
  ShieldCheck,
  ThumbsUp,
  Timer,
  Unlock,
  UserCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { FAQItem } from "@/types/faq";

export const FAQS: FAQItem[] = [
  {
    id: "faq-pricing",
    num: "01",
    category: "PROJECT & SCOPE",
    icon: FolderOpen,
    question: "How do you scope and price a project?",
    answer:
      "We scope every project individually based on your technical complexity, deliverable milestones, and dedicated team or part-time model. You'll receive a clear, transparent quote and timeline before we begin, along with a detailed proposal.",
    highlights: [
      { text: "Clear Milestones", icon: CheckCircle2 },
      { text: "Transparent Pricing", icon: Calendar },
      { text: "Detailed Proposal", icon: FileText },
    ],
  },
  {
    id: "faq-timeline",
    num: "02",
    category: "DELIVERY & TIMELINE",
    icon: Clock,
    question: "How long does a typical build take from kickoff to launch?",
    answer:
      "A focused, production-ready MVP typically ships in 6–10 weeks. Comprehensive platforms or complex multi-tenant systems take 3–5 months. We set realistic sprint roadmaps during discovery and ship testable preview builds every single week so you see continuous progress.",
    highlights: [
      { text: "6–10 Week MVP", icon: Zap },
      { text: "Weekly Previews", icon: RefreshCw },
      { text: "Agile Sprints", icon: Activity },
    ],
  },
  {
    id: "faq-ownership",
    num: "03",
    category: "CODE & IP OWNERSHIP",
    icon: Code2,
    question: "Will we own 100% of the code and intellectual property?",
    answer:
      "Absolutely. Every line of clean code, architecture diagram, design system token, cloud infrastructure script, and asset belongs entirely to your company upon milestone completion. We retain zero rights, zero royalties, and zero proprietary lock-in.",
    highlights: [
      { text: "100% Ownership", icon: ShieldCheck },
      { text: "Full Source Code", icon: Code2 },
      { text: "No Vendor Lock-in", icon: Unlock },
    ],
  },
  {
    id: "faq-support",
    num: "04",
    category: "SUPPORT & MAINTENANCE",
    icon: Wrench,
    question: "What happens after launch? Do you provide ongoing maintenance?",
    answer:
      "Every project includes a 30-day post-launch warranty with dedicated bug fixing and telemetry monitoring at zero extra cost. Following that, we offer flexible retainers for continuous feature iterations, DevOps scaling, and guaranteed SLA response times.",
    highlights: [
      { text: "30-Day Warranty", icon: Award },
      { text: "Proactive Monitoring", icon: Activity },
      { text: "Guaranteed SLA", icon: ThumbsUp },
    ],
  },
  {
    id: "faq-kickoff",
    num: "05",
    category: "TEAM & COLLABORATION",
    icon: Users,
    question: "How closely can we get started, and what does onboarding look like?",
    answer:
      "Click 'Start a project' or brief us with your vision. Within 48 hours, our technical architects schedule a discovery call to understand your business goals, evaluate feasibility, and deliver a comprehensive technical roadmap and proposal.",
    highlights: [
      { text: "48-Hour Kickoff", icon: Timer },
      { text: "Expert Architects", icon: UserCheck },
      { text: "Technical Roadmap", icon: Map },
    ],
  },
];
