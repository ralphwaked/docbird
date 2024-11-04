import { PostHog } from "posthog-node";

if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  throw new Error("NEXT_PUBLIC_POSTHOG_KEY is not set");
}

export const analytics = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: "https://eu.i.posthog.com",

  // Don't batch events and flush immediately - we're running in a serverless environment
  flushAt: 1,
  flushInterval: 0,
});
