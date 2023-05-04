# Hide chromecast button ![icon](assets/images/icon-32.png)

It's a Chrome extension that hides the Chromecast button, so you won't panic about accidentally clicking it. It should work with popular sites (YouTube, Twitch, etc.).

---

## How to install

1. Download the [archive](https://github.com/yura4ka/hide-chromecast-button/releases/download/v0.1.1/hide-chromecast-button.zip)
2. Go to `chrome://extensions/`
3. Turn on the developer mode
4. Drag and drop downloaded archive on the page

---

## How it works

It creates a `style` tag that adds the property `display: none` to necessary selectors.

> Note that different sites have different selectors for the button, so the extension wouldn't work on some of them.
