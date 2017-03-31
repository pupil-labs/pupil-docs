# pupil-docs

User and Developer Docs for [Pupil](https://github.com/pupil-labs/pupil)

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

### Shortcodes

Shortcodes are like little html templates that you can use to format content. Shortcodes have been made for frequently used markup in order to reduce the amount of html within the markdown files. Shortcodes syntax is declared like so - `{{< shortcode-name attr >}}`. Here is an example of the `figure-img` shortcode within a blockquote:

```markdown 
> {{< figure-img src="/images/pupil-hardware/pupil_w120_e120.jpg" img-class="feature-center padBottom--2" width="75%" >}}
```

Shortcodes are defined in the [docuapi repo](https://github.com/pupil-labs/docuapi/tree/master/layouts/shortcodes "pupil-labs/docuapi shortcodes")

**`figure-img`**
  - `src` - required string
  - `class` - optional string
  - `width` - optional string
  - `height` - optional string


**`video-youtube`**
  - `embed-url` - required embed url string

You can contribute a shortcode as a PR to the Pupil Labs [docuapi repo](https://github.com/pupil-labs/docuapi "pupil-labs/docuapi")

## Images & media

All media must be within the `content/images` directory. 

- Raster graphics should be `.jpg`.
- Vector graphics should be `.svg`.
- Videos/animations should have both `.webm` and `.mp4` versions.  

## Webhook

Any commit to the master branch of `pupil-docs` triggers a build of [`pupil-docs-website`](https://github.com/pupil-labs/pupil-docs-website "pupil-docs-website"). `scripts/webhook.sh` calls the travis api via `curl` request using an ecrypted token to trigger the build.
