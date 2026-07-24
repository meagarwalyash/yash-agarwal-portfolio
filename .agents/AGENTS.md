# Workspace Project Rules

## Google Analytics Tag (gtag.js)
Every single new HTML page created in this codebase MUST include the Google Tag (`gtag.js` ID: `G-DRCV1573GQ`) immediately after the opening `<head>` element:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DRCV1573GQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DRCV1573GQ');
</script>
```

Do NOT omit this tag from any newly created HTML files in this repository.
