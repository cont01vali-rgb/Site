// SVG Map Loader for Formula Learning
// Loads Europe map SVG data from external file to keep index.html clean

class EuropeSVGLoader {
    constructor() {
        this.mapContainer = document.querySelector('.europe-map');
        this.loader = document.getElementById('mapLoader');
    }

    async loadSVGMap() {
        try {
            // Show loading message
            this.showLoader();

            // Fetch SVG content from external file
            const response = await fetch('svg/europe-map.html');
            if (!response.ok) {
                throw new Error(`Failed to load map: ${response.status}`);
            }

            const htmlContent = await response.text();
            
            // Parse the HTML and extract the SVG
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const svgElement = doc.getElementById('europeMapSVG');

            if (!svgElement) {
                throw new Error('SVG element not found in europe-map.html');
            }

            // Set the correct ID for compatibility with existing scripts
            svgElement.id = 'europeMap';
            
            // Replace loader with SVG content
            this.hideLoader();
            this.mapContainer.appendChild(svgElement);

            // Dispatch event to notify other scripts that map is loaded
            window.dispatchEvent(new CustomEvent('europeMapLoaded', {
                detail: { svgElement: svgElement }
            }));

            console.log('✅ Europe SVG map loaded successfully');

        } catch (error) {
            console.error('❌ Error loading SVG map:', error);
            this.showError(error.message);
        }
    }

    showLoader() {
        if (this.loader) {
            this.loader.style.display = 'block';
            this.loader.textContent = '🗺️ Loading Europe map...';
            this.loader.style.textAlign = 'center';
            this.loader.style.padding = '50px';
            this.loader.style.color = '#c9c9c9';
        }
    }

    hideLoader() {
        if (this.loader) {
            this.loader.style.display = 'none';
        }
    }

    showError(message) {
        if (this.loader) {
            this.loader.textContent = `❌ Error: ${message}`;
            this.loader.style.color = '#ff6b6b';
        }
    }
}

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const svgLoader = new EuropeSVGLoader();
    svgLoader.loadSVGMap();
});

// Export for other modules if needed
window.EuropeSVGLoader = EuropeSVGLoader;