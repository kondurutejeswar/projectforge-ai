import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ProjectForge AI — Ready-to-Deploy IEEE Final Year Projects';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#080B14',
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(62,123,250,0.25), transparent 42%), radial-gradient(circle at 85% 0%, rgba(139,107,250,0.22), transparent 42%), radial-gradient(circle at 50% 100%, rgba(34,211,166,0.18), transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* top: logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(34,211,166,0.12)',
              border: '2px solid rgba(34,211,166,0.5)',
              color: '#22D3A6',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {'>'}
          </div>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#F4F6FB' }}>
            ProjectForge<span style={{ color: '#22D3A6' }}>.AI</span>
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980 }}>
          <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, color: '#F4F6FB', lineHeight: 1.15 }}>
            Ready-to-Deploy <span style={{ color: '#22D3A6', marginLeft: 16 }}>IEEE</span>
          </div>
          <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, color: '#F4F6FB', lineHeight: 1.15 }}>
            Final Year Projects
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#8892A8' }}>
            Live Demos + Full Kits — Source Code, Report, PPT, Video &amp; Support
          </div>
        </div>

        {/* bottom: stat chips */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['60+ Projects', '500+ Students Helped', '7 Domains'].map((s) => (
            <div
              key={s}
              style={{
                display: 'flex',
                fontSize: 20,
                color: '#C7CEDE',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 999,
                padding: '10px 24px',
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
