# Security Policy

JARVIS Admin Dashboard is a set of static front-end templates. They have no back end, store no secrets and make no network requests except loading web fonts (Aurora uses Google Fonts). Security issues are still possible, for example XSS once you wire the templates to real data.

## Supported versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

1. Go to the [Security tab](https://github.com/fls-dev/JARVIS_Admin_Dashboard/security) and choose **Report a vulnerability** to open a private advisory.
2. If that is not available, contact the maintainer through the [fls-dev GitHub profile](https://github.com/fls-dev).

Include the template, the page, steps to reproduce and the impact you expect. You can expect a first reply within 7 days. Fixes are released as a patch version and credited in the changelog, unless you prefer to stay anonymous.

## When you connect real data

The demo renders content from `assets/js/data.js`, which is trusted and fictional. Several renderers build markup with template strings and `innerHTML`. Before you feed them API responses or user input, escape or sanitize the values (for example with `textContent` or a sanitizer such as DOMPurify).
