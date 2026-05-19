/*
  Step 10 — Section 5 pain points (content)
  v0 placeholder — locked data in src/data/painPoints.ts (8 entries, physical + mental).
  Phase 2 will provide 3 prototype variants with GSAP staggered reveal
  per docs/gktk-value-add-prototype-pain-points.md.
*/

export default function Step10SectionFivePainPointsPlaceholder() {
  return (
    <div
      style={{
        width: 1366,
        height: 1024,
        background: '#1A1A1E',
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 1366 - 16,
          height: 1024 - 16,
          background: '#F9F9F9',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Noto Sans JP", system-ui, sans-serif',
          fontSize: 15,
          color: '#5B616E',
        }}
      >
        Step 10 · Pain points · placeholder
      </div>
    </div>
  );
}
