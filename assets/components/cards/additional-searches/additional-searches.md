
# ADDITIONAL SEARCHES CARD HTML 

- Make sure to have the class "additional-searches" 
- CSS in global.css

html```

<section id="ADD ID HERE" class="additional-searches">
    <h1> Visitors also looked for: </h1>
    
    <a href="LINK HERE">
        <svg class="search-icon">  ADD SVG HERE </svg>
        
        SEARCH QUERY TEXT HERE
    </a>
    <a href="LINK HERE">
        <svg class="search-icon">  ADD SVG HERE </svg>
        
        SEARCH QUERY TEXT HERE
    </a>
    <a href="LINK HERE">
        <svg class="search-icon">  ADD SVG HERE </svg>
        
        SEARCH QUERY TEXT HERE
    </a>
 </section> 
```

## CLOUD DECORATION 

- This is a style where there is a cloud backing to the search card
- Has a div wrapper with class "cloud-card--additional-searches" and the cloud shapes 
- CSS in global.css

html ```
 <div class="cloud-card--additional-searches">
    <!-- Cloud Shape -->
    <span class="cloud-card__bump cloud-card__bump--1"></span>
    <span class="cloud-card__bump cloud-card__bump--2"></span>
    <span class="cloud-card__bump cloud-card__bump--3"></span>
    <span class="cloud-card__bump cloud-card__bump--4"></span>


    <!-- Card Content -->
    <section class="additional-searches">

        <h1> Visitors also looked for: </h1>

        <a href="LINK HERE">
            <svg class="search-icon">  ADD SVG HERE </svg>
        
            SEARCH QUERY TEXT HERE
        </a>

        <a href="LINK HERE">
            <svg class="search-icon">  ADD SVG HERE </svg>
        
            SEARCH QUERY TEXT HERE
        </a>

        <a href="LINK HERE">
            <svg class="search-icon">  ADD SVG HERE </svg>
        
            SEARCH QUERY TEXT HERE
        </a>
    </section>

</div>
```