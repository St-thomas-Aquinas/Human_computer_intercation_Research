let currentIndex = 0;

// 1. Identify current channel from URL
function findCurrentChannel() {
    const currentURL = window.location.href;
    for (let i = 0; i < shows.length; i++) {
        try {
            const videoId = new URL(shows[i].url).searchParams.get("v");
            if (videoId && currentURL.includes(videoId)) {
                currentIndex = i;
                return;
            }
        } catch (e) {
            console.error("Grandma TV: Invalid URL in shows.js", shows[i].url);
        }
    }
    currentIndex = 0; // Safe fallback
}

// 2. Handle channel navigation
function changeChannel(index) {
    if (index < 0) index = shows.length - 1;
    if (index >= shows.length) index = 0;
    
    currentIndex = index;
    console.log(`Grandma TV: Switching to ${shows[currentIndex].name}`);
    window.location.href = shows[currentIndex].url;
}

// 3. Create and manage the click-capturing overlay
function createOverlay() {
    if (document.getElementById("grandma-tv-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "grandma-tv-overlay";
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

    // Handle left (0) and right (2) clicks
    overlay.addEventListener("mousedown", (e) => {
        if (e.button !== 0 && e.button !== 2) return;

        const isRightClick = e.button === 2;
        const targetIndex = currentIndex + (isRightClick ? 1 : -1);

        e.preventDefault();
        changeChannel(targetIndex);
    });

    document.body.appendChild(overlay);
}

// 4. Initialize safely when document.body exists
function init() {
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

// 5. Monitor for YouTube SPA (Single Page Application) URL changes
let currentUrl = window.location.href;
new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        findCurrentChannel();
        
        // Reinforce z-index in case YouTube DOM manipulation pushed it down
        const overlay = document.getElementById("grandma-tv-overlay");
        if (overlay) overlay.style.zIndex = "2147483647";
    }
}).observe(document, { subtree: true, childList: true });
