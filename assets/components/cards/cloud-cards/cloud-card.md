# CLOUD CARD HTML TEMPLATE LAYOUT 

```html
<a class="cloud-card" href="/pages/PAGE-FOLDER/PAGE.html">

    <!-- Cloud Shape -->
    <span class="cloud-card__bump cloud-card__bump--1"></span>
    <span class="cloud-card__bump cloud-card__bump--2"></span>
    <span class="cloud-card__bump cloud-card__bump--3"></span>
    <span class="cloud-card__bump cloud-card__bump--4"></span>


    <!-- Card Content -->
    <section class="cloud-card__content">

        <!-- Icon + Page Path -->
        <div class="cloud-card__path-row">

            <span class="item-circle-icon">
                <img
                    src="/assets/images/general/test-icon.png"
                    alt="Test Page Icon"
                >
            </span>

            <span class="cloud-card__path">
                allisonnguyen.portfolio &gt; test-page
            </span>

        </div>


        <!-- Page Title -->
        <h1 class="cloud-card__title">
            Test Page Title
        </h1>


        <!-- Subtitle -->
        <h2 class="cloud-card__subtitle">
            This Is a Test Subtitle
        </h2>


        <!-- Description -->
        <p class="cloud-card__description">
            This is dummy text for the cloud card description.
            Replace this with a short description explaining what
            someone can discover by visiting this page.
        </p>


        <!-- Tags -->
        <p class="cloud-card__tags">
            Test One • Test Two • Test Three • Test Four
        </p>

    </section>


    <!-- Thumbnail -->
    <img
        class="cloud-card__thumbnail"
        src="/assets/images/thumbnails/test/test-thumbnail.gif"
        alt="Test Page Thumbnail"
    >


    <!-- Arrow -->
    <span class="cloud-card__arrow" aria-hidden="true"> → </span>
</a>
```
_______________________________________________________________________________________

## Attributes

### Card Link

- `href`: The page URL opened when the card is clicked.
- `class="cloud-card"`: The base card class. Keep this on every cloud card.

### Thumbnail Image

- `src`: The thumbnail image path.
- `alt`: A useful description of the thumbnail for accessibility.

### Card Content

- `cloud-card__path`: The page path or category label.
- `cloud-card__title`: The main card title.
- `cloud-card__subtitle`: The supporting title or short descriptor.
- `cloud-card__description`: The card description.
- `cloud-card__tags`: Related tags or keywords.
- `cloud-card__arrow`: The decorative link arrow. Keep `aria-hidden="true"` 
                        when the card itself is the link.

_________________________________________________________________________________________

## Cloud Bumps

Every card uses four decorative bump elements:

```html
<span class="cloud-card__bump cloud-card__bump--1"></span>
<span class="cloud-card__bump cloud-card__bump--2"></span>
<span class="cloud-card__bump cloud-card__bump--3"></span>
<span class="cloud-card__bump cloud-card__bump--4"></span>
```

The shared `cloud-card__bump` class provides the base bump styling. The numbered modifier 
classes identify the individual bumps. Keep all four elements in the card so the cloud 
shape remains complete.

_________________________________________________________________________________________

## General Variants

### Compact

Add `cloud-card--compact` to the card element:

```html
<a class="cloud-card cloud-card--compact" href="/pages/PAGE-FOLDER/PAGE.html">
```

The compact variant changes the card layout so the path, title, subtitle, thumbnail, 
description, tags, and arrow stack vertically. Its bump styling is controlled by the 
`.cloud-card--compact` selectors in the cloud-card stylesheet.

### Style 2

Add `cloud-card--style-2` alongside `cloud-card--compact`:

```html
<a class="cloud-card cloud-card--compact cloud-card--style-2" href="/pages/PAGE-FOLDER/PAGE.html">
```

Style 2 changes the size and placement of the four cloud bumps. It is currently intended for 
the middle compact card, but it can be applied to any compact card.

The variant rules target each bump independently:

```css
.cloud-card--compact.cloud-card--style-2 .cloud-card__bump--1 { }
.cloud-card--compact.cloud-card--style-2 .cloud-card__bump--2 { }
.cloud-card--compact.cloud-card--style-2 .cloud-card__bump--3 { }
.cloud-card--compact.cloud-card--style-2 .cloud-card__bump--4 { }
```

Change `width`, `height`, `left`, `right`, `top`, or `bottom` inside these rules to adjust each bump.

_________________________________________________________________________________________

## Specific Variants 

### Projects Page 



### Additional Searches/Extras  Card