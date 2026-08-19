# x-biosignal.github.io

Documentation portal for the 28-package
[x-biosignal](https://github.com/x-biosignal) R ecosystem. It connects package
selection, installation, function references, support, governance, and citation
information from one bilingual entry point.

The portal also exposes crawler and machine-readable discovery assets:
`robots.txt`, `sitemap.xml`, `llms.txt`, an OpenSearch descriptor, CodeMeta,
SoftwareApplication structured data, and a direct link to the x-biosignal MCP
package catalog.

**Live:** https://x-biosignal.github.io

## Development

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

The development server listens on `http://localhost:3000`. The production build
is written to `dist/` and deployed by GitHub Pages after changes reach `main`.

## Content rules

- R is the released implementation and currently includes 28 packages.
- Python and Nextflow extensions remain marked as in development until their
  own verified releases.
- Package descriptions and links must match the public repositories and
  r-universe references.
- `llms.txt`, structured data, and the MCP section must retain all 28 released
  package links and must not mark the Python or Nextflow extensions as released.
- Update the sitemap `lastmod` date whenever the production content changes.
- Public authorship is Yusuke Matsui only.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide Icons

## License

MIT (c) Yusuke Matsui
