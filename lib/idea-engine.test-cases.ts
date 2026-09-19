import { generateBlueprint, type CategoryId } from "./idea-engine";

export interface IdeaTestCase {
  input: string;
  expectedCategory: CategoryId;
  notes?: string;
}

export const IDEA_TEST_CASES: IdeaTestCase[] = [
  {
    input: "A modern e-commerce store with headless Shopify",
    expectedCategory: "ecommerce",
    notes: "Handles e-commerce and Shopify",
  },
  {
    input: "An online store selling handmade ceramics",
    expectedCategory: "ecommerce",
    notes: "Handles online store",
  },
  {
    input: "A web shop for vintage vinyl records",
    expectedCategory: "ecommerce",
    notes: "Handles web shop",
  },
  {
    input: "A woodworking workshop portfolio site",
    expectedCategory: "website",
    notes: "Workshop must NOT trigger shop/e-commerce",
  },
  {
    input: "Carpentry workshop brochure website",
    expectedCategory: "website",
    notes: "Must match website, not shop",
  },
  {
    input: "Internal management tool for a medical clinic",
    expectedCategory: "web-app",
    notes: "Bare 'tool' must not match SaaS; clinic/internal tool matches web-app",
  },
  {
    input: "A SaaS platform for subscription billing management",
    expectedCategory: "saas",
    notes: "Matches SaaS and subscription",
  },
  {
    input: "Native iOS mobile app for daily workout tracking",
    expectedCategory: "mobile-app",
    notes: "Matches iOS and mobile app",
  },
  {
    input: "Android app for food truck route discovery",
    expectedCategory: "mobile-app",
    notes: "Matches Android",
  },
  {
    input: "Complete brand identity and logo redesign for a coffee roastery",
    expectedCategory: "branding",
    notes: "Matches brand identity and logo",
  },
  {
    input: "AI chatbot to automate customer support replies",
    expectedCategory: "automation",
    notes: "Matches AI and automate and chatbot",
  },
  {
    input: "Doctor appointment booking portal for private clinic",
    expectedCategory: "web-app",
    notes: "Matches booking and appointment and clinic",
  },
  {
    input: "Simple landing page for an independent accounting firm",
    expectedCategory: "website",
    notes: "Matches landing page",
  },
  {
    input: "Factory inventory tracking dashboard and report generator",
    expectedCategory: "web-app",
    notes: "Matches factory and dashboard",
  },
];

/**
 * Dev-only test runner to verify classification accuracy.
 * Returns true if all test cases pass.
 */
export function runIdeaEngineTests(): boolean {
  let passed = 0;
  const failures: { input: string; expected: CategoryId; actual: CategoryId }[] = [];

  for (const testCase of IDEA_TEST_CASES) {
    const result = generateBlueprint(testCase.input);
    if (result.category === testCase.expectedCategory) {
      passed++;
    } else {
      failures.push({
        input: testCase.input,
        expected: testCase.expectedCategory,
        actual: result.category,
      });
    }
  }

  if (failures.length > 0) {
    console.error(`[IdeaEngine Tests] ${failures.length} test(s) failed:`, failures);
    return false;
  }

  return passed === IDEA_TEST_CASES.length;
}

if (process.argv[1]?.includes("idea-engine.test-cases")) {
  const ok = runIdeaEngineTests();
  if (ok) {
    console.log(`✓ All ${IDEA_TEST_CASES.length} IdeaEngine test cases passed successfully.`);
  } else {
    process.exit(1);
  }
}
