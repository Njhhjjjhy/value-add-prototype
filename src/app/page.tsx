'use client';

import dynamic from 'next/dynamic';

// Skip SSR entirely for the orchestrator. The orchestrator decides what to
// render based on `window.location.search` (preview vs parent) and
// localStorage (QA chrome preferences), neither of which exist on the
// server. Rendering it server-side produces empty HTML that then
// disagrees with the client's first paint, throwing React hydration
// errors #418 / #423 / #425. Client-only avoids the mismatch.
const Orchestrator = dynamic(() => import('@/components/orchestrator'), {
  ssr: false,
});

export default function Home() {
  return <Orchestrator />;
}
