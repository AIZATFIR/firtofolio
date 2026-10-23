import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'github-profile-proxy',
      configureServer(server) {
        let cachedHtml = null;
        let lastFetch = 0;
        const CACHE_TTL = 1000 * 60 * 60; // 1 hr

        const fetchProfile = async () => {
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

          let html = await profileRes.text();
          const fragHtml = fragRes.ok ? await fragRes.text() : '';

          if (fragHtml) {
            html = html.replace(/<include-fragment\s+src="\/AIZATFIR\?action=show[^>]*>[\s\S]*?<\/include-fragment>/i, fragHtml);
          }

          const customStyles = `
            <base href="https://github.com/" target="_blank">
            <style>
              html, body {
                overflow-x: hidden !important;
                max-width: 100vw !important;
                background-color: #0d1117 !important;
                color: #e6edf3 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif !important;
              }
              .header, .Header, header.Header, .AppHeader, .footer, footer, #js-global-screen-reader-notice {
                display: none !important;
              }
              .application-main {
                padding-top: 1rem !important;
              }
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
            </style>
          `;

          html = html.replace('<head>', `<head>${customStyles}`);
          cachedHtml = html;
          lastFetch = Date.now();
          return html;
        };

        // Eager prefetch on server start
        fetchProfile().catch(e => console.error('[github-proxy] prefetch error:', e));

        server.middlewares.use('/api/github-profile', async (req, res) => {
          try {
            if (cachedHtml && (Date.now() - lastFetch < CACHE_TTL)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.setHeader('X-Frame-Options', 'ALLOWALL');
              res.setHeader('Content-Security-Policy', "frame-ancestors *");
              res.statusCode = 200;
              return res.end(cachedHtml);
            }

            const html = await fetchProfile();
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('X-Frame-Options', 'ALLOWALL');
            res.setHeader('Content-Security-Policy', "frame-ancestors *");
            res.statusCode = 200;
            res.end(html);
          } catch (err) {
            console.error('Error serving local github-profile proxy:', err);
            res.statusCode = 500;
            res.end('Error loading GitHub profile');
          }
        });
      }
    }
  ],
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
});
