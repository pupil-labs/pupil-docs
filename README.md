# Pupil Docs
Pupil Docs website built with Vuepress.

User and Developer Docs for [Pupil](https://github.com/pupil-labs/pupil).

View the docs at [docs.pupil-labs.com](https://docs.pupil-labs.com)

## Contributing
We welcome all contributions! To edit content:

1. Fork this repository
1. Install dependencies
1. Edit content
1. Test local changes
1. Commit and push to your fork
1. Make a Pull Request

## Download
For this project we use Yarn for dependency management.

Download and install [Yarn](https://yarnpkg.com/en/docs/install).

## Install
Fork or clone this repository and run the following command to install the dependencies.

```bash
yarn
```

## Development

Start local development with:
```bash
yarn dev
```

To generate static assets, run:
```basg
yarn build
```

## Directory Struture

```markdown
.
├── src
│   ├── .vuepress
│   │   ├── components
│   │   ├── theme
│   │   │   └── layouts
│   │   ├── public
│   │   │   └── imgs/videos
│   │   ├── config.js
│   │   └── enhanceApp.js
│   │
│   ├── core
│   │   ├── user-guide.md
│   │   └── README.md
│   │
│   └── README.md
│
└── package.json
```

## Page routing
In the root dir are where all the page routes are located.

| Relative Path | Page Routing |
|---|---|
| `/README.md` | `/` |
| `/core/README.md` | `/core/` |

## Images & media
All images/videos/animations must be within the `src/.vuepress/public` directory.

- Raster graphics should be `.webp` and `.jpg`.
- Vector graphics should be `.svg`.
- Videos/animations should have both `.webm` and `.mp4` versions.
- Including image posters in `.webp` and `.jpg` versions.

## Style Guide
We aim for the docs to be concise and readable.

All content is written in Markdown. If you're new to Markdown see [this guide](https://guides.github.com/features/mastering-markdown/ "Github - Mastering Markdown"). HTML markup is also parsed, but discouraged unless absolutely needed.

### Table of contents
All H1, H2, H3 headers will be automatically added to the table of contents.

Please only use H1-H4 headings (e.g. don't use H5).

### Code blocks
VuePress uses Prism to highlight language syntax in Markdown code blocks, using coloured text.
Prism supports a wide variety of programming languages.
All you need to do is append a valid language alias to the beginning backticks for the code block:

````markdown
```python
print("welcome to pupil docs")
```
````

### Custom container
You can add highlighted notes with a little HTML embedded in your markdown document:

#### Text only
```markdown
::: tip
Text.
:::
```

#### Text with title
```markdown
::: warning Title
Text.
:::
```

#### Text with icon
`v-icon` is a vuetify tag, so you could change the color property and also replace the icon by changing the `error_outline` to any Material Icons.
```markdown
::: danger
<v-icon large color="warning">error_outline</v-icon>
Text.
:::
```