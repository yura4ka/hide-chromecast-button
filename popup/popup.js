document.addEventListener("DOMContentLoaded", async () => {
  const toggle = document.querySelector("#toggle");
  const status = document.querySelector("#status");

  const setStatus = (enabled) =>
    (status.textContent = enabled ? "enabled" : "disabled");

  toggle.addEventListener("change", async () => {
    const enabled = toggle.checked;
    await chrome.runtime.sendMessage(undefined, { enabled });
    setStatus(enabled);
  });

  const { enabled } = await chrome.storage.local.get(["enabled"]);
  await chrome.runtime.sendMessage(undefined, { enabled });
  toggle.checked = enabled;
  setStatus(enabled);
});
