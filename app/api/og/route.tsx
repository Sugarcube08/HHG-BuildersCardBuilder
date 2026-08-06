import { ImageResponse } from 'next/og';
import { decodeBase64ToPayload } from '../../../src/engine/qr/decodeBuilder';
import { validateBuilderPayload } from '../../../src/engine/qr/validation';
import { getCardTheme } from '../../../src/engine/theme/cardComposer';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const builderParam = searchParams.get('builder');
    
    let name = 'VERIFIED BUILDER';
    let role = 'Full Stack Developer';
    let tagline = '"Building the Future in Public"';
    let builderId = 'HH26-BUILDER';

    if (builderParam) {
      const raw = decodeBase64ToPayload(builderParam);
      const payload = validateBuilderPayload(raw);
      if (payload) {
        name = payload.name || name;
        role = payload.role || role;
        tagline = payload.tagline || tagline;
        builderId = payload.id || builderId;
      }
    }

    const theme = getCardTheme(role);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.bgColor,
            color: '#FFFFFF',
            padding: '48px',
            fontFamily: 'sans-serif',
            border: '12px solid #0F172A',
          }}
        >
          {/* Header */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '4px solid #10B981',
              paddingBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '36px', fontWeight: '900', color: '#FFFFFF' }}>
                HACKER HOUSE GOA 2026
              </span>
            </div>
            <span
              style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#FFB800',
                backgroundColor: '#0F172A',
                padding: '8px 24px',
                borderRadius: '999px',
                border: '2px solid #FFB800',
              }}
            >
              GOA 2026
            </span>
          </div>

          {/* Identity Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontSize: '56px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '-1px',
                color: '#FFFFFF',
              }}
            >
              {name}
            </span>

            <span
              style={{
                fontSize: '28px',
                fontWeight: '800',
                backgroundColor: theme.roleBadgeBg,
                color: theme.roleBadgeText,
                padding: '10px 32px',
                borderRadius: '999px',
                border: '3px solid #0F172A',
                textTransform: 'uppercase',
              }}
            >
              {role}
            </span>

            <span
              style={{
                fontSize: '26px',
                fontStyle: 'italic',
                color: '#A7F3D0',
                maxWidth: '800px',
              }}
            >
              {tagline}
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#07281E',
                padding: '12px 28px',
                borderRadius: '16px',
                border: '2px solid #10B981',
                marginTop: '8px',
              }}
            >
              <span style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'monospace', color: '#FFFFFF' }}>
                BUILDER PASSPORT: {builderId}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid #12543E',
              paddingTop: '20px',
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'monospace',
              color: '#6EE7B7',
            }}
          >
            <span>✓ VERIFIED DIGITAL PASSPORT</span>
            <span style={{ color: '#FFFFFF' }}>GOA, INDIA • MARCH 2026</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: corsHeaders,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate Open Graph image`, {
      status: 500,
      headers: corsHeaders,
    });
  }
}
