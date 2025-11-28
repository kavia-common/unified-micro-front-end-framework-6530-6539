# unified-micro-front-end-framework-6530-6539

This workspace includes an Angular micro front-end app. Environment variables are read at runtime via `window.__env` if provided by hosting. Ensure your deployment injects these keys before loading the app, for example:

```html
<script>
  window.__env = {
    NG_APP_API_BASE: "https://api.example.com",
    NG_APP_BACKEND_URL: "https://backend.example.com",
    NG_APP_FRONTEND_URL: "https://app.example.com",
    NG_APP_WS_URL: "wss://ws.example.com",
    NG_APP_FEATURE_FLAGS: "{\"newNav\":true}",
    NG_APP_EXPERIMENTS_ENABLED: "false"
  };
</script>
```

See frontend_app/README.md for more details.