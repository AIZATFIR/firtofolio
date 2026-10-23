/**
 * Vercel Serverless Function & Edge Handler
 * Fetches and embeds the real, authentic GitHub profile of @AIZATFIR
 * without X-Frame-Options: deny blocking, and with full contributions + pinned repos.
 */

let cachedResponse = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour memory cache

export default async function handler(req, res) {
  const now = Date.now();
  if (cachedResponse && now - lastFetchTime < CACHE_TTL) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    return res.status(200).send(cachedResponse);
  }

  try {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

    const [profileRes, fragRes] = await Promise.all([
      fetch('https://github.com/AIZATFIR', {
        headers: {
          'User-Agent': userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      }),
      fetch('https://github.com/AIZATFIR?action=show&controller=profiles&tab=contributions&user_id=AIZATFIR', {
        headers: {
          'User-Agent': userAgent,
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'text/html,*/*',
        }
      })
    ]);

    if (!profileRes.ok) {
      return res.status(profileRes.status).send('Unable to load GitHub profile at this time.');
    }

    let html = await profileRes.text();
    const fragHtml = fragRes.ok ? await fragRes.text() : '';

    // Inline the contribution calendar and pinned repositories
    if (fragHtml) {
      html = html.replace(/<include-fragment\s+src="\/AIZATFIR\?action=show[^>]*>[\s\S]*?<\/include-fragment>/i, fragHtml);
    }

    // Custom CSS to seamlessly fit GitHub inside the portfolio iframe shell
    const customStyles = `
      <base href="https://github.com/" target="_blank">
      <style>
        /* Modern Dark Mode Canvas for GitHub Profile Embed */
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          background-color: #0d1117 !important;
          color: #e6edf3 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif !important;
        }
        /* Hide global header & sticky clutter to focus purely on developer profile */
        .header, .Header, header.Header, .AppHeader, .footer, footer, #js-global-screen-reader-notice {
          display: none !important;
        }
        .application-main {
          padding-top: 1rem !important;
        }
        /* Custom sleek scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0d1117;
        }
        ::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ff6f1e;
        }
        /* Ensure links open in new tab */
        a {
          cursor: pointer !important;
        }
      </style>
    `;

    html = html.replace('<head>', `<head>${customStyles}`);

    cachedResponse = html;
    lastFetchTime = now;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error proxying GitHub profile:', error);
    if (cachedResponse) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(cachedResponse);
    }
    return res.status(500).send('Error loading GitHub profile');
  }
}
