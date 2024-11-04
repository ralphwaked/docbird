"use client";

import { usePostHog } from "posthog-js/react";

export const useAnalytics = () => {
  const analytics = usePostHog();
  return analytics;
};
