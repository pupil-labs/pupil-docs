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
For this project, we use Yarn for dependency management.

Download and install [Yarn](https://yarnpkg.com/en/docs/install).

## Install
Fork or clone this repository and run the following command to install the dependencies.

```bash
yarn
```

## Development

To generate markdown files from Jupyter notebooks install nbconvert via
```
pip install nbconvert
```
and run the following command
```
jupyter-nbconvert --to markdown **/*.ipynb --ExtractOutputPreprocessor.enabled=False
```
on a Windows machine, you can achieve the same output by running the following command using PowerShell
``` 
ls *.ipynb -Recurse | foreach{jupyter-nbconvert --to markdown $_ --ExtractOutputPreprocessor.enabled=False}
```

Start local development with:
```bash
yarn dev
```

To generate static assets, run:
```basg
yarn build
```

## Directory Structure

```markdown
.
├── src
│   ├── .vuepress
│   │   ├── components
│   │   ├── theme
│   │   │   └── layouts
│   │   ├── public (static)
│   │   │   └── imgs/videos
│   │   ├── config.js
│   │   └── enhanceApp.js
│   │
│   ├── media (processed by webpack)
│   │   └── imgs/videos
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

| Relative Path     | Page Routing |
| ----------------- | ------------ |
| `/README.md`      | `/`          |
| `/core/README.md` | `/core/`     |

For pages that are _not_ README.md, please add frontmatter with a permalink. This enables us to have "clean" URLs without `.html` and makes linking within docs easier. Example for /core/software/pupil-capture.md - add the below front-matter:

```md
---
permalink: /core/software/pupil-capture
---
```


## Images & media
- `src/media` - This is where most people will be adding images, videos, etc. For all assets that will be used in .md files.
- `src/.vuepress/public` - Primarily for those who are developing the theme. For assets that are used in .vue files.

#### Relative URLs
All Markdown files are compiled into Vue components and processed by webpack, so you can and should prefer referencing any asset using relative URLs:

```markdown
![An image](./image.png)
```

#### Public files
Sometimes you may need to provide static assets that are not directly referenced in any of your Markdown or theme components - for example, favicons and PWA icons. In such cases, you can put them inside `src/.vuepress/public` and they will be copied to the root of the generated directory.

#### Asset formats

- Raster graphics should be and `.jpg`.
- Vector graphics should be `.svg`.
- Videos/animations should be `.mp4` versions.
- Including image posters as `.jpg` versions.

Note - `webm` and `webp` will be implemented in future iterations.

## Style Guide
We aim for the docs to be concise and readable.

All content is written in Markdown. If you're new to Markdown see [this guide](https://guides.github.com/features/mastering-markdown/ "Github - Mastering Markdown"). HTML markup is also parsed but discouraged unless absolutely needed.

### Table of contents
All H1, H2, H3 headers will be automatically added to the table of contents.

Please only use H1-H4 headings. If you find yourself needing more nesting, you should re-think your content. _Don't use H5_.

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

### Youtube videos
Use Youtube component to quickly add videos to markdown files.

Just copy and paste the unique video ID to the src prop of the component like so.

```
https://www.youtube.com/watch?v=HGMjJLnK2_4
```

```md
<Youtube src="HGMjJLnK2_4"/>
```


### Videos
Use Videos component to quickly add local videos to markdown files.

Just add the relative path of the video to the src prop of the component like so.
Note that you need to use `require` in order for Webpack to correctly resolve the path.

```md
<Videos :src="require(`../../media/core/videos/worldcam-focus.mp4`)">
```

The default video type is `video/mp4` which is automatically added but in case you are using a different type of video, just update the type prop.


```md
<Videos :src="require(`../../media/core/videos/worldcam-focus.webm`)" type="video/webm">
```
