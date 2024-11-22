// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_KEY || undefined, // 발급받은 DSN키

  // environment: "dev",

  // Add optional integrations for additional features
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: true,
    }),
  ],

  tracePropagationTargets: ["localhost"],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  // 0에서 1 사이의 숫자로 주어진 트랜잭션이 Sentry로 전송 될 확률을 제어
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  //Sentry SDK에서 세션 리플레이 기능의 샘플링 비율을 제어
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  //오류가 발생한 세션 중 어느 정도의 비율로 리플레이 데이터를 수집할지 결정
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
