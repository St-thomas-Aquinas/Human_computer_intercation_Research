let currentIndex = 0;

// ============================================================
// 1. CLUTTER REDUCTION: Hide YouTube UI and force video to fill screen
// ============================================================
function injectClutterHidingCSS() {
    const style = document.createElement("style");
    style.id = "claritytv-clutter-css";
    style.textContent = `
        /* Hide YouTube header, search, and top navigation */
        #header, #masthead, ytd-masthead, #guide-button,
        #voice-search-button, #container #buttons,
        ytd-topbar-menu-button-renderer, #logo,
        ytd-topbar-logo-renderer, #bell,
        ytd-notification-topbar-button-renderer,
        #avatar-btn, ytd-active-account-header-renderer {
            display: none !important;
            visibility: hidden !important;
        }

        /* Hide video metadata (title, description, actions) */
        #above-the-fold, #below, #info-contents, #info, #meta,
        ytd-video-primary-info-renderer,
        ytd-video-secondary-info-renderer,
        #description, #actions, ytd-menu-renderer,
        #top-level-buttons-computed, #owner,
        ytd-engagement-panel-section-list-renderer {
            display: none !important;
            visibility: hidden !important;
        }

        /* Hide comments section */
        #comments, ytd-comments, ytd-item-section-renderer {
            display: none !important;
            visibility: hidden !important;
        }

        /* Hide recommended videos sidebar */
        #secondary, #related, ytd-compact-video-renderer,
        #secondary-inner {
            display: none !important;
            visibility: hidden !important;
        }

        /* Hide end-screen cards and overlays */
        .ytp-endscreen-content, .ytp-ce-element,
        .ytp-ce-covering-overlay, .ytp-ce-expanding-image,
        .ytp-ce-element-show {
            display: none !important;
        }

        /* Hide ad overlays */
        .ytp-ad-overlay-container, .ytp-ad-text-overlay {
            display: none !important;
        }

        /* Make the video player fill the entire viewport */
        #movie_player {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 1 !important;
            background: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .html5-video-container {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            background: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
        }

        /* Remove all padding and margins from containers */
        #content, #primary, #primary-inner, ytd-watch-flexy,
        #player, #player-container, #theater-background,
        #ytd-player {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            height: 100vh !important;
        }

        /* Prevent scrolling */
        html, body {
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #000 !important;
        }

        /* Fade out player controls (only visible on hover) */
        .ytp-chrome-top, .ytp-chrome-bottom,
        .ytp-gradient-top, .ytp-gradient-bottom,
        .ytp-progress-bar-container, .ytp-time-display,
        .ytp-button, .ytp-chrome-controls {
            opacity: 0 !important;
            transition: opacity 0.5s !important;
        }

        .html5-video-player:hover .ytp-chrome-top,
        .html5-video-player:hover .ytp-chrome-bottom,
        .html5-video-player:hover .ytp-chrome-controls {
            opacity: 0.4 !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// 2. CHANNEL DETECTION: Identify current channel from URL
// ============================================================
function findCurrentChannel() {
    const currentURL = window.location.href;
    for (let i = 0; i < shows.length; i++) {
        try {
            const videoId = new URL(shows[i].url).searchParams.get("v");
            if (videoId && currentURL.includes(videoId)) {
                currentIndex = i;
                console.log(`ClarityTV: Current channel is ${shows[i].name}`);
                return;
            }
        } catch (e) {
            console.error("ClarityTV: Invalid URL in shows.js", shows[i].url);
        }
    }
    currentIndex = 0;
    console.log("ClarityTV: Unknown URL, defaulting to first channel.");
}

// ============================================================
// 3. TELEMETRY: Google Sheets Integration (Real-Time)
// ============================================================

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzpDuWPhlDySTkmRQY5nsqj14otsl6hArs-y5czGrnCLMhn7dOVTVFaDKtUPaIeM4OnDw/exec";

let telemetryBuffer = [];
const MAX_BUFFER_SIZE = 1; // CHANGED TO 1 FOR REAL-TIME UPDATES

function logEvent(action, details = "") {
    const event = {
        timestamp: new Date().toLocaleString(),
        action: action,
        details: typeof details === 'object' ? JSON.stringify(details) : details,
        channel: shows[currentIndex]?.name || "Unknown"
    };
    
    telemetryBuffer.push(event);
    console.log(`ClarityTV Log: ${action}`);

    // Send immediately since buffer size is 1
    if (telemetryBuffer.length >= MAX_BUFFER_SIZE) {
        flushToGoogleSheets();
    }
}

function flushToGoogleSheets() {
    if (telemetryBuffer.length === 0) return;

    telemetryBuffer.forEach(event => {
        fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            mode: "no-cors", 
            body: JSON.stringify(event)
        }).catch(err => console.error("ClarityTV: Failed to send to Sheets", err));
    });

    telemetryBuffer = [];
}

// Save remaining data when the user closes the tab
window.addEventListener("beforeunload", () => {
    flushToGoogleSheets();
});

// ============================================================
// 4. CHANNEL NAVIGATION: Change to specified channel index
// ============================================================
function changeChannel(index) {
    if (index < 0) index = shows.length - 1;
    if (index >= shows.length) index = 0;

    const previousName = shows[currentIndex]?.name || "Unknown";
    const nextName = shows[index].name;
    const direction = index > currentIndex ? "next" : "previous";

    // LOG THE CHANGE
    logEvent("channel_change", {
        from: previousName,
        to: nextName,
        direction: direction
    });

    currentIndex = index;
    const show = shows[currentIndex];
    console.log(`ClarityTV: Switching to ${show.name}`);
    window.location.href = show.url;
}

// ============================================================
// 5. OVERLAY: Invisible full-screen click capture layer
// ============================================================
function createOverlay() {
    if (document.getElementById("claritytv-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "claritytv-overlay";
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "2147483647",
        background: "transparent",
        pointerEvents: "auto"
    });

    // Disable right-click context menu
    overlay.addEventListener("contextmenu", (e) => e.preventDefault());

    // Handle left (previous) and right (next) clicks
    overlay.addEventListener("mousedown", (e) => {
        if (e.button !== 0 && e.button !== 2) return;

        const isRightClick = e.button === 2;
        const targetIndex = currentIndex + (isRightClick ? 1 : -1);

        e.preventDefault();
        changeChannel(targetIndex);
    });

    document.body.appendChild(overlay);
    console.log("ClarityTV: Overlay initialized.");
    
    // LOG SESSION START
    logEvent("session_start");
}

// ============================================================
// 6. INITIALIZATION: Safe startup waiting for document.body
// ============================================================
function init() {
    injectClutterHidingCSS();
    findCurrentChannel();
    createOverlay();
}

if (document.body) {
    init();
} else {
    const observer = new MutationObserver((mutations, obs) => {
        if (document.body) {
            obs.disconnect();
            init();
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

// ============================================================
// 7. SPA MONITOR: Re-evaluate state on YouTube URL changes
// ============================================================
let currentUrl = window.location.href;
new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        console.log("ClarityTV: SPA navigation detected, re-evaluating...");
        findCurrentChannel();

        const overlay = document.getElementById("claritytv-overlay");
        if (overlay) overlay.style.zIndex = "2147483647";
    }
}).observe(document, { subtree: true, childList: true });
