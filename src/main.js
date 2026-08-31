/**
 * Main Application Entry Point
 * Aizat Fahim Firmansyah's Personal Portfolio
 */

import { siteConfig } from './config/portfolio.config.js';
import { featuredProjects, additionalProjects } from './config/projects.js';
import { writings } from './config/writing.js';
import { creativeShowcase } from './config/creative.js';
import { fetchGitHubRepos } from './utils/githubFetcher.js';
import { initSmoothScroll } from './utils/smoothScroll.js';
import { initScrollReveal } from './utils/scrollReveal.js';
import { initLiveClock } from './utils/liveClock.js';
import { initPreviewModal } from './utils/previewModal.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Weighted Smooth Inertia Scroll
  const lenis = initSmoothScroll();

  // 2. Populate Site Data & Links
  populateSiteMetadata();

  // 3. Render Real Featured Projects with Focus Clock Flagship & Live Embeds
  renderFeaturedProjects();

  // 4. Render Writings
  renderWritings();

  // 5. Render Creative Art Gallery
  renderCreativeGallery();

  // 6. Render Additional Projects & Fetch GitHub
  renderAdditionalProjects();
  loadLiveGitHubRepos();

  // 7. Setup Floating Navigation Scroll-Spy & Smooth Navigation
  initNavigationScrollSpy();

  // 8. Initialize Local Time WIB
  initLiveClock('live-time-display');

  // 9. Initialize Modal & Lightbox
  initPreviewModal();

  // 10. Trigger Slow Graceful Scroll Reveal Observer
  initScrollReveal();
});

/**
 * Populates Dynamic Metadata from Config
 */
function populateSiteMetadata() {
  const brandLogo = document.getElementById('brand-logo');
  const heroStatusText = document.getElementById('hero-status-text');
  const heroBioText = document.getElementById('hero-bio-text');
  const headerEmailBtn = document.getElementById('header-email-btn');
  const aboutTechContainer = document.getElementById('about-tech-container');
  const nowBuilding = document.getElementById('now-building-val');
  const nowLearning = document.getElementById('now-learning-val');
  const nowExploring = document.getElementById('now-exploring-val');

  // Ecosystem Links
  const footerGithub = document.getElementById('footer-github-link');
  const footerVercel = document.getElementById('footer-vercel-link');
  const footerSubstack = document.getElementById('footer-substack-link');
  const footerInsta = document.getElementById('footer-insta-link');
  const footerEmail = document.getElementById('footer-email-link');
  const instaCta = document.getElementById('instagram-external-link');
  const substackCta = document.getElementById('substack-external-link');

  if (brandLogo) brandLogo.textContent = siteConfig.brandLogo || siteConfig.name.toLowerCase();
  if (heroStatusText) heroStatusText.textContent = siteConfig.status;
  if (heroBioText) heroBioText.textContent = siteConfig.heroDescription;
  
  if (headerEmailBtn && siteConfig.links.email) {
    headerEmailBtn.href = `mailto:${siteConfig.links.email}`;
    headerEmailBtn.textContent = siteConfig.links.email;
  }

  // Technologies
  if (aboutTechContainer && siteConfig.about.technologies) {
    aboutTechContainer.innerHTML = siteConfig.about.technologies
      .map(tech => `<span class="about-tech-tag">${tech}</span>`)
      .join('');
  }

  // Now Values
  if (nowBuilding) nowBuilding.textContent = siteConfig.now.building;
  if (nowLearning) nowLearning.textContent = siteConfig.now.learning;
  if (nowExploring) nowExploring.textContent = siteConfig.now.exploring;

  // External Links
  if (footerGithub && siteConfig.links.github) footerGithub.href = siteConfig.links.github;
  if (footerVercel && siteConfig.links.vercel) footerVercel.href = siteConfig.links.vercel;
  if (footerSubstack && siteConfig.links.substack) footerSubstack.href = siteConfig.links.substack;
  if (footerInsta && siteConfig.links.instagram) footerInsta.href = siteConfig.links.instagram;
  if (footerEmail && siteConfig.links.email) footerEmail.href = `mailto:${siteConfig.links.email}`;
  if (instaCta && siteConfig.links.instagram) instaCta.href = siteConfig.links.instagram;
  if (substackCta && siteConfig.links.substack) substackCta.href = siteConfig.links.substack;
}

/**
 * Renders all Real Featured Projects with Focus Clock at top + Rich Multi-Image Gallery
 */
function renderFeaturedProjects() {
  const container = document.getElementById('featured-projects-container');
  if (!container) return;

  container.innerHTML = featuredProjects.map((project, index) => {
    const isFirst = index === 0;
    const isFlagship = project.id === 'focus-clock';
    const embedSrc = project.links.embedUrl || project.links.live;

    return `
      <article class="featured-project-card reveal-slow ${isFlagship ? 'flagship-project-card' : ''}" id="project-${project.id}">
        <div class="project-top-meta">
          <span class="project-tagline-badge">${isFlagship ? '★ ' + project.badge + ' · ' : ''}${project.tagline}</span>
          <span class="project-year">${project.year}</span>
        </div>

        <h3 class="project-heading-title">${project.title}</h3>

        <!-- Interactive Frame Showcase Container -->
        <div class="project-preview-container" id="preview-box-${project.id}">
          <div class="preview-bar">
            <div class="preview-dots">
              <span class="preview-dot dot-red"></span>
              <span class="preview-dot dot-yellow"></span>
              <span class="preview-dot dot-green"></span>
            </div>

            ${project.links.hasNativePreview ? `
              <div class="preview-mode-switch">
                <button class="mode-btn active" data-project-id="${project.id}" data-mode="embed">Live Web App ↗</button>
                <button class="mode-btn" data-project-id="${project.id}" data-mode="simulator">Native Simulator</button>
              </div>
            ` : ''}

            <!-- Viewport Switcher Controls -->
            <div class="preview-viewport-controls" data-project-id="${project.id}">
              <button class="device-btn active" data-vp="desktop" data-project-id="${project.id}" title="Desktop (Full Width)">Desktop</button>
              <button class="device-btn" data-vp="tablet" data-project-id="${project.id}" title="Tablet (768px)">Tablet</button>
              <button class="device-btn" data-vp="mobile" data-project-id="${project.id}" title="Mobile (375px)">Mobile</button>
            </div>

            <div class="preview-badge-status" id="status-badge-${project.id}">
              ${isFlagship ? 'Flagship Live Experience' : 'Live Interactive App'}
            </div>
          </div>

          <!-- Live Iframe View -->
          <div class="live-iframe-wrapper" id="embed-view-${project.id}">
            <div class="iframe-device-frame desktop" id="frame-${project.id}">
              <div class="iframe-browser-header">
                <div class="iframe-url-display">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span>${embedSrc}</span>
                </div>
                <div class="iframe-actions">
                  <button class="iframe-action-btn iframe-reload-action" data-project-id="${project.id}" title="Reload Application">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
                  </button>
                  <a href="${embedSrc}" target="_blank" rel="noopener noreferrer" class="iframe-action-btn" title="Open in New Tab">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </a>
                </div>
              </div>
              <iframe 
                id="iframe-${project.id}"
                src="${isFirst ? embedSrc : 'about:blank'}"
                data-src="${embedSrc}"
                title="${project.title} Live Application"
                class="live-embed-iframe"
                loading="lazy"
                allow="camera; microphone; fullscreen; clipboard-read; clipboard-write; autoplay;"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              ></iframe>
            </div>
          </div>

          ${project.links.hasNativePreview ? `
            <!-- In-Page Simulator View (Initially Hidden) -->
            <div class="focus-clock-experience" id="simulator-view-${project.id}" style="display: none;">
              <div class="timer-dial-wrapper">
                <svg class="timer-svg" viewBox="0 0 200 200">
                  <circle class="dial-track" cx="100" cy="100" r="85" />
                  <circle class="dial-value" id="main-dial-progress" cx="100" cy="100" r="85" />
                </svg>
                <div class="timer-center-info">
                  <div class="timer-digits" id="main-timer-digits">25:00</div>
                  <div class="timer-state-label" id="main-timer-state">FLOW STATE</div>
                </div>
              </div>

              <div class="timer-actions">
                <button class="timer-btn primary" id="timer-toggle-btn">Start Flow</button>
                <button class="timer-btn secondary" id="timer-reset-btn">Reset</button>
              </div>

              <p class="timer-note">Interactive cognitive flow simulator</p>
            </div>
          ` : ''}
        </div>

        ${project.readme ? `
          <!-- GitHub README Viewer Component (Specifically for Focus Clock) -->
          <div class="project-readme-showcase">
            <div class="readme-header-bar">
              <div class="readme-file-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>README.md</span>
                <span style="color: var(--color-secondary-text); font-weight: normal;">(${project.readme.branch})</span>
              </div>
              <div class="readme-meta-actions">
                <a href="${project.readme.githubUrl}" target="_blank" rel="noopener noreferrer" class="readme-repo-link">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  <span>${project.readme.repoName} ↗</span>
                </a>
              </div>
            </div>

            <div class="readme-body">
              <div class="readme-repo-title-row">
                <h4 class="readme-repo-title">Focus Clock</h4>
              </div>
              <p class="readme-subtitle">${project.readme.description}</p>

              ${project.readme.sections.map(sec => `
                <div class="readme-section-block">
                  <h5 class="readme-section-heading">${sec.title}</h5>
                  <ul class="readme-points-list">
                    ${sec.points.map(pt => `
                      <li class="readme-point-item">${pt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}

              <div class="readme-shell-box">
                <div class="readme-shell-header">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                  <span>Build From Source</span>
                </div>
                <code>${project.readme.buildSnippet}</code>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- 3 Core Narrative Questions -->
        <div class="project-narrative-grid">
          <div class="narrative-item">
            <div class="narrative-title">What It Is</div>
            <p class="narrative-text">${project.whatItIs}</p>
          </div>

          <div class="narrative-item">
            <div class="narrative-title">Why It Exists</div>
            <p class="narrative-text">${project.whyItExists}</p>
          </div>

          <div class="narrative-item">
            <div class="narrative-title">What Aizat Built</div>
            <p class="narrative-text">${project.whatAizatBuilt || project.whatFahimBuilt}</p>
          </div>
        </div>

        <!-- Technologies -->
        <div class="project-tech-stack">
          ${project.technologies.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
        </div>

        <!-- Live & GitHub Links -->
        <div class="project-links-row">
          <a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="btn-project btn-live">
            <span>TRY LIVE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
          </a>
          <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn-project btn-github">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span>GITHUB</span>
          </a>
        </div>
      </article>
    `;
  }).join('');

  // Attach Device Switcher & Iframe Event Listeners
  attachProjectIframeEvents();

  // Attach Mode Switchers (Live Embed vs Simulator)
  attachModeSwitchEvents();

  // Attach Gallery Shot Click to Lightbox
  attachGalleryLightboxEvents();

  // Initialize Simulator Timer Logic
  initSimulatorTimer();
}

/**
 * Attaches Device Viewport Switching & Reload Actions to Project Iframes
 */
function attachProjectIframeEvents() {
  const deviceBtns = document.querySelectorAll('.device-btn');
  const reloadBtns = document.querySelectorAll('.iframe-reload-action');

  deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.dataset.projectId;
      const vp = btn.dataset.vp;
      
      // Update active state among siblings
      const siblingBtns = document.querySelectorAll(`.device-btn[data-project-id="${projectId}"]`);
      siblingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const frame = document.getElementById(`frame-${projectId}`);
      if (frame) {
        frame.className = `iframe-device-frame ${vp}`;
      }
    });
  });

  reloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.dataset.projectId;
      const iframe = document.getElementById(`iframe-${projectId}`);
      if (iframe && iframe.src && iframe.src !== 'about:blank') {
        iframe.src = iframe.src;
      }
    });
  });

  // Lazy-load iframes as they come into view
  if ('IntersectionObserver' in window) {
    const iframeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          if (iframe.src === 'about:blank' && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
          }
          observer.unobserve(iframe);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('.live-embed-iframe').forEach(iframe => {
      iframeObserver.observe(iframe);
    });
  }
}

/**
 * Attaches Mode Switchers (Live Web App vs Native Simulator)
 */
function attachModeSwitchEvents() {
  const modeBtns = document.querySelectorAll('.mode-btn');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.dataset.projectId;
      const mode = btn.dataset.mode;
      const siblingBtns = document.querySelectorAll(`.mode-btn[data-project-id="${projectId}"]`);
      siblingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const embedView = document.getElementById(`embed-view-${projectId}`);
      const simView = document.getElementById(`simulator-view-${projectId}`);
      const vpControls = document.querySelector(`.preview-viewport-controls[data-project-id="${projectId}"]`);
      const statusBadge = document.getElementById(`status-badge-${projectId}`);

      if (mode === 'simulator') {
        if (embedView) embedView.style.display = 'none';
        if (simView) simView.style.display = 'flex';
        if (vpControls) vpControls.style.display = 'none';
        if (statusBadge) statusBadge.textContent = 'Native Simulator';
      } else {
        if (embedView) embedView.style.display = 'flex';
        if (simView) simView.style.display = 'none';
        if (vpControls) vpControls.style.display = 'inline-flex';
        if (statusBadge) statusBadge.textContent = 'Live Web App';

        const iframe = document.getElementById(`iframe-${projectId}`);
        if (iframe && iframe.src === 'about:blank' && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
      }
    });
  });
}

/**
 * In-Page Simulator Timer Logic
 */
function initSimulatorTimer() {
  const toggleBtn = document.getElementById('timer-toggle-btn');
  const resetBtn = document.getElementById('timer-reset-btn');
  const digitsEl = document.getElementById('main-timer-digits');
  const stateEl = document.getElementById('main-timer-state');
  const dialProgress = document.getElementById('main-dial-progress');

  if (!toggleBtn || !digitsEl || !dialProgress) return;

  const TOTAL_SECONDS = 25 * 60;
  let remainingSeconds = TOTAL_SECONDS;
  let timerInterval = null;
  const CIRCLE_CIRCUMFERENCE = 534;

  function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
    const secs = (remainingSeconds % 60).toString().padStart(2, '0');
    digitsEl.textContent = `${mins}:${secs}`;
    
    const elapsed = TOTAL_SECONDS - remainingSeconds;
    const progressOffset = (elapsed / TOTAL_SECONDS) * CIRCLE_CIRCUMFERENCE;
    dialProgress.style.strokeDashoffset = progressOffset;
  }

  toggleBtn.addEventListener('click', () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      toggleBtn.textContent = 'Resume Flow';
      if (stateEl) stateEl.textContent = 'PAUSED';
    } else {
      toggleBtn.textContent = 'Pause';
      if (stateEl) stateEl.textContent = 'FLOW STATE';

      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          updateDisplay();
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
          toggleBtn.textContent = 'Session Complete';
          if (stateEl) stateEl.textContent = 'COMPLETED';
        }
      }, 1000);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingSeconds = TOTAL_SECONDS;
    updateDisplay();
    toggleBtn.textContent = 'Start Flow';
    if (stateEl) stateEl.textContent = 'FLOW STATE';
  });

  updateDisplay();
}

/**
 * Gallery Cards Lightbox Attachment
 */
function attachGalleryLightboxEvents() {
  const cards = document.querySelectorAll('.gallery-shot-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const art = {
        title: card.dataset.shotTitle || 'Focus Clock View',
        image: card.dataset.shotImg,
        category: 'Interface View',
        year: '2026',
        description: card.dataset.shotDesc || 'Focus Clock flow state interface view.'
      };
      if (window.openArtLightbox) {
        window.openArtLightbox(art);
      }
    });
  });
}

/**
 * Renders the Editorial Writing Section
 */
function renderWritings() {
  const container = document.getElementById('writing-list-container');
  if (!container) return;

  container.innerHTML = writings.map(item => `
    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="writing-item">
      <div class="writing-meta-top">
        <span>${item.date} · ${item.readTime}</span>
        <span class="writing-platform-tag">${item.platform} ↗</span>
      </div>
      <div class="writing-title-row">
        <h3 class="writing-title">${item.title}</h3>
        <span class="writing-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </span>
      </div>
      <p class="writing-excerpt">${item.excerpt}</p>
    </a>
  `).join('');
}

/**
 * Renders the Creative Work Gallery & Lightbox Triggers
 */
function renderCreativeGallery() {
  const container = document.getElementById('creative-gallery-grid');
  if (!container) return;

  container.innerHTML = creativeShowcase.items.map(item => `
    <div class="creative-item" data-art-id="${item.id}">
      <div class="creative-thumb-wrap">
        <img src="${item.image}" alt="${item.title}" class="creative-thumb" loading="lazy" />
      </div>
      <div class="creative-caption">
        <div class="creative-meta-row">
          <span class="creative-category-tag">${item.category}</span>
          <span>${item.year}</span>
        </div>
        <h4 class="creative-item-title">${item.title}</h4>
      </div>
    </div>
  `).join('');

  // Attach Lightbox click
  const items = container.querySelectorAll('.creative-item');
  items.forEach(el => {
    el.addEventListener('click', () => {
      const artId = el.dataset.artId;
      const art = creativeShowcase.items.find(a => a.id === artId);
      if (art && window.openArtLightbox) {
        window.openArtLightbox(art);
      }
    });
  });
}

/**
 * Renders Additional Real Projects & Repositories
 */
function renderAdditionalProjects() {
  const container = document.getElementById('additional-repos-grid');
  if (!container) return;

  container.innerHTML = additionalProjects.map(repo => `
    <div class="repo-card">
      <div class="repo-header">
        <h4 class="repo-name">${repo.title}</h4>
      </div>
      <p class="repo-desc">${repo.description}</p>
      <div class="repo-footer">
        <span>${repo.technology}</span>
        <div class="repo-links-mini">
          ${repo.live ? `<a href="${repo.live}" target="_blank" rel="noopener noreferrer">Live ↗</a>` : ''}
          ${repo.github ? `<a href="${repo.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Dynamic GitHub Repos Loader (Graceful & Non-blocking)
 */
async function loadLiveGitHubRepos() {
  if (!siteConfig.links.githubUsername) return;
  const repos = await fetchGitHubRepos(siteConfig.links.githubUsername);
  
  const container = document.getElementById('additional-repos-grid');
  if (!container || !repos || repos.length === 0) return;

  // Filter out repos already displayed
  const newRepos = repos.filter(r => 
    !featuredProjects.some(fp => fp.id.toLowerCase() === r.name.toLowerCase()) &&
    r.name.toLowerCase() !== 'firtoporio'
  ).slice(0, 4);

  if (newRepos.length > 0) {
    const existingHTML = container.innerHTML;
    const dynamicHTML = newRepos.map(repo => `
      <div class="repo-card">
        <div class="repo-header">
          <h4 class="repo-name">${repo.name}</h4>
        </div>
        <p class="repo-desc">${repo.description}</p>
        <div class="repo-footer">
          <span>${repo.language}</span>
          <div class="repo-links-mini">
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">Live ↗</a>` : ''}
            <a href="${repo.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = existingHTML + dynamicHTML;
  }
}

/**
 * Floating Navigation Scroll-Spy & Smooth Navigation
 */
function initNavigationScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['intro', 'works', 'writing', 'creative', 'about', 'now'];

  // Smooth Scroll Click Handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (window.scrollToSection) {
        window.scrollToSection(targetId);
      } else {
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ScrollSpy with IntersectionObserver
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          if (link.dataset.nav === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(secId => {
    const el = document.getElementById(secId);
    if (el) sectionObserver.observe(el);
  });
}
