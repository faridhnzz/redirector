# 👷 Redirector

A simple redirect tool built with Netlify functions.

## 💻 Usage

1. Edit file on `data/redirect.json` for configure redirect
2. Edit file on `data/fallback_url.json` for configure fallback url

These are the available config options for `data/redirect.json`

```json
{
  "name": "github",
  "href": "https://github.com/faridhnzz",
  "aliases": "gh", // optional
  "statusCode": 302; // optional
}
```

## 📄 License

This Project is Under [MIT license](LICENSE) &copy; 2023 Farid Nizam
