/**
 * Live Local Time Indicator
 * Formats real-time clock with timezone for the "Now" / status component.
 */

export function initLiveClock(elementId = "live-time-display") {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      el.textContent = `${timeStr} WIB (UTC+7)`;
    } catch (e) {
      const now = new Date();
      el.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} Local`;
    }
  }

  update();
  setInterval(update, 1000);
}
