chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ enabled: true });
});

chrome.tabs.onUpdated.addListener(async () => {
  const { enabled } = await chrome.storage.local.get(["enabled"]);
  void toggleStyles(enabled);
});

chrome.runtime.onMessage.addListener((request) => {
  const { enabled } = request;
  void toggleStyles(enabled);
});

async function toggleStyles(enabled) {
  const tabs = await chrome.tabs.query({});
  await Promise.allSettled(
    tabs.map((t) =>
      chrome.scripting.executeScript({
        target: { tabId: t.id },
        func: enabled ? createCss : removeCss,
      })
    )
  );
  await chrome.storage.local.set({ enabled });
}

function createCss() {
  const exists = document.querySelector("#remove-chromecast-ext");
  if (exists) return;

  const css = document.createElement("style");
  css.id = "remove-chromecast-ext";
  css.innerHTML = `
    .ytp-remote-button,
    [aria-label="Start Casting"],
    [is="google-cast-button"] {
      display: none !important;
    }

    div {
      background-color: purple;
    }
  `;
  document.head.appendChild(css);
}

function removeCss() {
  const css = document.querySelector("#remove-chromecast-ext");
  if (css) css.remove();
}
