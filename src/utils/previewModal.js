/**
 * Interactive Live Preview & Lightbox Modal Engine
 * Supports responsive viewport switching (Desktop/Tablet/Mobile),
 * live application framing, and media lightbox previews.
 */

export function initPreviewModal() {
  const modalContainer = document.getElementById("preview-modal-root");
  if (!modalContainer) return;

  // Global open preview function
  window.openProjectPreview = (projectData) => {
    renderProjectModal(projectData, modalContainer);
  };

  window.openArtLightbox = (artData) => {
    renderArtModal(artData, modalContainer);
  };

  // Keyboard shortcut: ESC to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(modalContainer);
    }
  });
}

function renderProjectModal(project, container) {
  const isInteractive = project.links?.live && project.links.live !== "#";
  
  container.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop-overlay">
      <div class="modal-dialog project-modal-dialog">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-badge">${project.year || "2026"} • ${project.category || "Project"}</span>
            <h3 class="modal-project-title">${project.title}</h3>
          </div>

          <!-- Viewport Mode Switcher (for live apps) -->
          <div class="modal-controls">
            <div class="viewport-toggle" id="viewport-switcher">
              <button class="vp-btn active" data-viewport="desktop" title="Desktop View">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
                <span>Desktop</span>
              </button>
              <button class="vp-btn" data-viewport="tablet" title="Tablet View">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>
                <span>Tablet</span>
              </button>
              <button class="vp-btn" data-viewport="mobile" title="Mobile View">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="12" height="18" x="6" y="3" rx="2"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                <span>Mobile</span>
              </button>
            </div>

            <!-- External Action Links -->
            <div class="modal-actions">
              ${project.links?.live ? `
                <a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="modal-action-btn primary">
                  <span>Open Live App</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </a>
              ` : ''}
              ${project.links?.github ? `
                <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="modal-action-btn secondary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  <span>Repository</span>
                </a>
              ` : ''}
              <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Body / Device Preview -->
        <div class="modal-body">
          <div class="preview-viewport-frame desktop" id="preview-viewport-frame">
            <!-- Simulated Device Header -->
            <div class="frame-bar">
              <div class="frame-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="frame-url-bar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>${project.links?.live || project.links?.github || "https://github.com/aizatfir/" + project.id}</span>
              </div>
            </div>

            <!-- Frame Content (Live Simulator or High-Res Image) -->
            <div class="frame-content">
              ${project.id === "focus-clock" ? getFocusClockInteractiveHTML() : `
                <div class="project-showcase-view">
                  <img src="${project.image}" alt="${project.title}" class="frame-preview-img" />
                  <div class="frame-details-overlay">
                    <h4>About this project</h4>
                    <p class="frame-desc">${project.shortDescription}</p>
                    <div class="frame-narrative">
                      <div class="narrative-box">
                        <strong>Why it exists:</strong>
                        <p>${project.whyItExists}</p>
                      </div>
                      <div class="narrative-box">
                        <strong>Aizat Fahim's contribution:</strong>
                        <p>${project.contributed}</p>
                      </div>
                    </div>
                    <div class="frame-tech-tags">
                      ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                  </div>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  attachModalEvents(container);
}

function getFocusClockInteractiveHTML() {
  return `
    <div class="focus-clock-sim">
      <div class="sim-header">
        <div class="sim-brand">
          <div class="sim-logo-dot"></div>
          <span>Focus Clock</span>
        </div>
        <div class="sim-badge">Interactive Live Demo</div>
      </div>
      <div class="sim-main">
        <div class="sim-dial-wrap">
          <svg class="sim-svg-dial" viewBox="0 0 200 200">
            <circle class="dial-bg" cx="100" cy="100" r="85" />
            <circle class="dial-progress" cx="100" cy="100" r="85" id="sim-dial-progress" />
          </svg>
          <div class="sim-dial-center">
            <div class="sim-time" id="sim-timer-text">25:00</div>
            <div class="sim-state" id="sim-state-text">DEEP WORK</div>
          </div>
        </div>
        <div class="sim-controls">
          <button class="sim-btn play" id="sim-start-btn">Start Flow</button>
          <button class="sim-btn secondary" id="sim-reset-btn">Reset</button>
        </div>
        <div class="sim-tasks">
          <div class="sim-task-item active">
            <span class="sim-task-dot"></span>
            <span>Focus Session: Software Engineering Architecture</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderArtModal(art, container) {
  container.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop-overlay">
      <div class="modal-dialog art-lightbox-dialog">
        <div class="art-modal-header">
          <div>
            <span class="modal-badge">${art.category} • ${art.year}</span>
            <h3 class="modal-project-title">${art.title}</h3>
            <p class="art-medium-sub">${art.medium}</p>
          </div>
          <button class="modal-close-btn" id="modal-close-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="art-modal-body">
          <div class="art-img-wrap">
            <img src="${art.image}" alt="${art.title}" class="art-full-img" />
          </div>
          <div class="art-caption-footer">
            <p>${art.description}</p>
            ${art.instagramUrl ? `
              <a href="${art.instagramUrl}" target="_blank" rel="noopener noreferrer" class="modal-action-btn primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>View on Instagram</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  attachModalEvents(container);
}

function attachModalEvents(container) {
  // Close buttons
  const closeBtn = container.querySelector("#modal-close-btn");
  const overlay = container.querySelector("#modal-backdrop-overlay");
  
  if (closeBtn) closeBtn.onclick = () => closeModal(container);
  if (overlay) {
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal(container);
    };
  }

  // Viewport switcher
  const viewportBtns = container.querySelectorAll(".vp-btn");
  const frame = container.querySelector("#preview-viewport-frame");
  
  viewportBtns.forEach(btn => {
    btn.onclick = () => {
      viewportBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const vp = btn.dataset.viewport;
      if (frame) {
        frame.className = `preview-viewport-frame ${vp}`;
      }
    };
  });

  // Focus clock interactive simulation logic
  const startBtn = container.querySelector("#sim-start-btn");
  const resetBtn = container.querySelector("#sim-reset-btn");
  const timerText = container.querySelector("#sim-timer-text");
  const dialProgress = container.querySelector("#sim-dial-progress");

  if (startBtn && timerText && dialProgress) {
    let timeLeft = 25 * 60;
    let totalTime = 25 * 60;
    let timerInterval = null;

    startBtn.onclick = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.textContent = "Resume";
      } else {
        startBtn.textContent = "Pause";
        timerInterval = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const secs = (timeLeft % 60).toString().padStart(2, '0');
            timerText.textContent = `${mins}:${secs}`;
            const offset = 534 - (534 * (totalTime - timeLeft)) / totalTime;
            dialProgress.style.strokeDashoffset = offset;
          } else {
            clearInterval(timerInterval);
            timerText.textContent = "00:00";
            startBtn.textContent = "Done";
          }
        }, 1000);
      }
    };

    if (resetBtn) {
      resetBtn.onclick = () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 25 * 60;
        timerText.textContent = "25:00";
        dialProgress.style.strokeDashoffset = 0;
        startBtn.textContent = "Start Flow";
      };
    }
  }
}

function closeModal(container) {
  container.innerHTML = "";
}
