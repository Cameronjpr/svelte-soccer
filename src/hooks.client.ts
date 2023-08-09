import * as Sentry from "@sentry/sveltekit";

// If you don't want to use Session Replay, remove the `Replay` integration, 
// `replaysSessionSampleRate` and `replaysOnErrorSampleRate` options.
Sentry.init({
    dsn: "https://39d6598b1f4633ea39cb73c4a753c585@o4505675782946816.ingest.sentry.io/4505675785175040",
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [new Sentry.Replay()]
})

export const handleError = Sentry.handleErrorWithSentry();