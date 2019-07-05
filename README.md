# pupil-docs

User and Developer Docs for [Pupil](https://github.com/pupil-labs/pupil).

This repository is markdown source only! View the docs at [docs.pupil-labs.com](https://docs.pupil-labs.com)

## Contributing

We welcome all contributions! To edit content:

1. Fork this repository
1. Edit content
1. Commit and push to your fork
1. Make a Pull Request

## Style Guide

We aim for the docs to be concise and readable.

All content is written in Markdown. If you're new to Markdown see [this guide](https://guides.github.com/features/mastering-markdown/ "Github - Mastering Markdown"). HTML markup is also parsed, but discouraged unless absolutely needed.

The [pupil-docs-website](https://github.com/pupil-labs/pupil-docs-website "pupil-docs-website") automatically generates the table of contents based on the headings you use in the Markdown file. Special styles are applied for blockquotes `>` and code blocks ` ``` `.

Images and videos should be wrapped with a blockquote `>`.

We also have a few shortcodes that can be used in Markdown that apply custom html markup.

### Content organization, hierarchy, and front matter

We divide content into *sections* and *pages*. Each section should be within its own directory. Each section should only have one `H1` heading. There can be any number of Markdown files or "pages". All "pages" must use `H2` headings or less.

Content is sorted by front matter parameters at the top of each Markdown file.

`section_weight` sorts the top level sections. `page_weight` sorts pages within each section. Weights are zero based and should be integers (but floats are also accepted up to first decimal place). Here is an example:


```markdown
+++
section_weight = 2
page_weight = 0
+++

# Section 2

Top level page within section 2. Note that it contains an `H1` heading. This heading will be used for the section in the TOC.

## Section 2 - H2

H2 heading within section 2. This heading will be used as the first sub-heading within this example section.

```


```markdown
+++
section_weight = 2
page_weight = 1
+++

## Section 2 - Page 1

H2 heading within section 2, page 1. This heading will be used as the second sub-heading within this example section.
```


### Headings

All H1, H2, H3 headers will be automatically added to the table of contents. Please only use H1-H4 headings (e.g. don't use H5).

### Codeblocks

Code blocks should be formatted with triple backticks. Code blocks will be moved into the right most column of the website. Here is an example:

````markdown
```python
print("welcome to pupil docs")
```
````

### Block Quotes

All block quotes will be automatically moved to the right most column of the website. You can wrap almost any content within a block quote.

Almost all images should be formatted within a blockquote `>` so that they are moved to the right hand side. Check docs for examples.

### Aside Tags

You can add highlighted notes with a little HTML embedded in your markdown document:

```html
<aside class="notice">
  This blue tag is for notice notes.
</aside>

<aside class="warning">
  This red tag is for warning notes.
</aside>

<aside class="success">
  This green tag is for success notes.
</aside>

<aside class="faq">
   This blue grey tag is for frequently asked questions or troubleshooting notes.
</aside>
```

### Shortcodes

Shortcodes are like little html templates that you can use to format content. Shortcodes have been made for frequently used markup in order to reduce the amount of html within the markdown files. Shortcodes syntax is declared like so - `{{< shortcode-name attr >}}`.

Here is an example of the `webp-img` shortcode within a blockquote:

```markdown
<img src="/images/pupil-player/recording/export_folder.webp" alt="Export folder" >}}
```
Here is an example of the `video-webm` shortcode within a blockquote:

```markdown
<video src="/videos/calibration/pupil-detection/pd.webm" >}}
```

Shortcodes are defined in the [docuapi repo](https://github.com/pupil-labs/docuapi/tree/master/layouts/shortcodes "pupil-labs/docuapi shortcodes")

**`figure-img`**

This shortcode is only used for `.svg` images only.

  - `src` - required string
  - `alt` - required string
  - `class` - optional string
  - `width` - optional string
  - `height` - optional string

Example:
```markdown
<img src="/image/dir/img-name.jpg" img-class="class-name" width="100%" alt="short image description" >}}
```

**`webp-img`**

This shortcode is used for all raster images as `.webp` images with `.jpg` as the fallback image.

	- `src` - required string
	- `alt` - required string
	- `figure-class` - optional string

Example:
```markdown
<img src="/image/dir/img-name.webp" figure-class="class-name" alt="short image description" >}}
```

**`video-youtube`**

Youtube videos are lazyloaded meaning requests are made only when the user wants to play the video. Make sure that the provided `embed-url` are embedded links only - e.g. `https://www.youtube.com/embed/wVOqJWel0K0`.

  - `embed-url` - required embed url string

Example:
```markdown
<video embed-url="/youtube/video/embed/url" >}}
```

**`video-webm`**

All videos and animations are `.webm` videos with `.mp4` as the fallback video, and formatted to `1280 x 720p`

	- `src` - required string

Example:
```markdown
<video src="/videos/dir/video-name.webm" >}}
```

You can contribute a shortcode as a PR to the Pupil Labs [docuapi repo](https://github.com/pupil-labs/docuapi "pupil-labs/docuapi")

## Images & media

All images must be within the `content/images` directory.

- Raster graphics should be `.webp` and `.jpg`.
- Vector graphics should be `.svg`.

All videos/animations must be within the `content/videos` directory.

- Videos/animations should have both `.webm` and `.mp4` versions.
- Including image posters in `.webp` and `.jpg` versions.

Webp images can be created with `webp:make:img` and `webp:make:vid` gulp tasks specified in the `gulpfile.js` located in the [pupil docs website repo](https://github.com/pupiil-labs/pupl-docs-website "pupil-docs-website")

## Webhook

Any commit to the master branch of `pupil-docs` triggers a build of [`pupil-docs-website`](https://github.com/pupil-labs/pupil-docs-website "pupil-docs-website"). `scripts/webhook.sh` calls the travis api via `curl` request using an ecrypted token to trigger the build.
