// Europe SVG Map Data for Formula Learning
// Contains all SVG path coordinates for European countries

const EuropeMapData = {
    // SVG Configuration
    viewBox: "0 0 680 730",
    
    // Countries with SVG path data
    countries: {
        RU: {
            title: "Russia",
            class: "land",
            path: "...coordonatele..." // Aici pui coordonatele SVG reale din tag-ul <path>
        }
        

    },
    
    // Method to generate SVG paths - NU MODIFICA ACEASTA FUNCTIE
    generateSVGPaths: function() {
        let pathsHTML = '';
        
        for (const [countryCode, countryData] of Object.entries(this.countries)) {
            pathsHTML += `<path id="${countryCode}" title="${countryData.title}" class="${countryData.class}" d="${countryData.path}"/>\n        `;
        }
        
        return pathsHTML;
    }
};

// Export for use in other modules
window.EuropeMapData = EuropeMapData;