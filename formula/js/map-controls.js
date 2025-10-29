// SVG Map Zoom and Pan Controls for Formula Learning
// Adds zoom in/out buttons and drag functionality to the Europe map

class SVGMapControls {
    constructor() {
        this.svgElement = null;
        this.viewBox = { x: 0, y: 0, width: 680, height: 730 };
        this.originalViewBox = { x: 0, y: 0, width: 680, height: 730 };
        this.zoomLevel = 1;
        this.maxZoom = 5;
        this.minZoom = 0.5;
        this.zoomStep = 0.3;
        
        // Pan variables
        this.isPanning = false;
        this.startPoint = { x: 0, y: 0 };
        this.lastPanPoint = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        // Wait for map to load
        window.addEventListener('europeMapLoaded', (event) => {
            this.svgElement = event.detail.svgElement;
            this.setupControls();
            this.setupPanEvents();
        });
    }

    setupControls() {
        // Create control container
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'map-controls';
        controlsContainer.innerHTML = `
            <div class="zoom-controls">
                <button class="zoom-btn zoom-in" id="zoomIn" title="Zoom In">
                    <span>+</span>
                </button>
                <div class="zoom-level-display" id="zoomDisplay">100%</div>
                <button class="zoom-btn zoom-out" id="zoomOut" title="Zoom Out">
                    <span>−</span>
                </button>
            </div>
            <div class="pan-controls">
                <button class="control-btn reset-view" id="resetView" title="Reset View">
                    <span>⌂</span>
                </button>
            </div>
            <div class="control-info">
                <small>Drag to pan • Scroll to zoom</small>
            </div>
        `;

        // Insert controls into map container
        const mapContainer = document.querySelector('.europe-map');
        mapContainer.appendChild(controlsContainer);

        // Add event listeners
        document.getElementById('zoomIn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOut').addEventListener('click', () => this.zoomOut());
        document.getElementById('resetView').addEventListener('click', () => this.resetView());

        // Add scroll zoom
        this.svgElement.addEventListener('wheel', (e) => this.handleScroll(e));
    }

    setupPanEvents() {
        // Mouse events for panning
        this.svgElement.addEventListener('mousedown', (e) => this.startPan(e));
        this.svgElement.addEventListener('mousemove', (e) => this.doPan(e));
        this.svgElement.addEventListener('mouseup', () => this.endPan());
        this.svgElement.addEventListener('mouseleave', () => this.endPan());

        // Touch events for mobile
        this.svgElement.addEventListener('touchstart', (e) => this.startPan(e));
        this.svgElement.addEventListener('touchmove', (e) => this.doPan(e));
        this.svgElement.addEventListener('touchend', () => this.endPan());

        // Change cursor style
        this.svgElement.style.cursor = 'grab';
    }

    zoomIn() {
        if (this.zoomLevel < this.maxZoom) {
            this.zoomLevel += this.zoomStep;
            this.applyZoom();
        }
    }

    zoomOut() {
        if (this.zoomLevel > this.minZoom) {
            this.zoomLevel -= this.zoomStep;
            this.applyZoom();
        }
    }

    applyZoom() {
        const newWidth = this.originalViewBox.width / this.zoomLevel;
        const newHeight = this.originalViewBox.height / this.zoomLevel;
        
        // Keep zoom centered
        this.viewBox.width = newWidth;
        this.viewBox.height = newHeight;
        
        // Ensure we don't pan outside bounds
        this.constrainViewBox();
        this.updateViewBox();
        this.updateZoomDisplay();
    }

    handleScroll(event) {
        event.preventDefault();
        
        const delta = event.deltaY > 0 ? -this.zoomStep : this.zoomStep;
        const newZoomLevel = this.zoomLevel + delta;
        
        if (newZoomLevel >= this.minZoom && newZoomLevel <= this.maxZoom) {
            // Get mouse position for zoom center
            const rect = this.svgElement.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            
            // Convert to SVG coordinates
            const svgX = (mouseX / rect.width) * this.viewBox.width + this.viewBox.x;
            const svgY = (mouseY / rect.height) * this.viewBox.height + this.viewBox.y;
            
            this.zoomLevel = newZoomLevel;
            
            // Zoom towards mouse position
            const newWidth = this.originalViewBox.width / this.zoomLevel;
            const newHeight = this.originalViewBox.height / this.zoomLevel;
            
            this.viewBox.x = svgX - (mouseX / rect.width) * newWidth;
            this.viewBox.y = svgY - (mouseY / rect.height) * newHeight;
            this.viewBox.width = newWidth;
            this.viewBox.height = newHeight;
            
            this.constrainViewBox();
            this.updateViewBox();
            this.updateZoomDisplay();
        }
    }

    startPan(event) {
        this.isPanning = true;
        this.svgElement.style.cursor = 'grabbing';
        
        const point = this.getEventPoint(event);
        this.startPoint = point;
        this.lastPanPoint = point;
        
        event.preventDefault();
    }

    doPan(event) {
        if (!this.isPanning) return;
        
        const point = this.getEventPoint(event);
        const dx = point.x - this.lastPanPoint.x;
        const dy = point.y - this.lastPanPoint.y;
        
        // Convert screen movement to SVG coordinates
        const rect = this.svgElement.getBoundingClientRect();
        const svgDx = (dx / rect.width) * this.viewBox.width;
        const svgDy = (dy / rect.height) * this.viewBox.height;
        
        this.viewBox.x -= svgDx;
        this.viewBox.y -= svgDy;
        
        this.constrainViewBox();
        this.updateViewBox();
        
        this.lastPanPoint = point;
        event.preventDefault();
    }

    endPan() {
        this.isPanning = false;
        this.svgElement.style.cursor = 'grab';
    }

    resetView() {
        this.viewBox = { ...this.originalViewBox };
        this.zoomLevel = 1;
        this.updateViewBox();
        this.updateZoomDisplay();
    }

    constrainViewBox() {
        // Prevent panning outside the original bounds
        const maxX = this.originalViewBox.width - this.viewBox.width;
        const maxY = this.originalViewBox.height - this.viewBox.height;
        
        this.viewBox.x = Math.max(0, Math.min(maxX, this.viewBox.x));
        this.viewBox.y = Math.max(0, Math.min(maxY, this.viewBox.y));
    }

    updateViewBox() {
        const viewBoxString = `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`;
        this.svgElement.setAttribute('viewBox', viewBoxString);
    }

    updateZoomDisplay() {
        const zoomDisplay = document.getElementById('zoomDisplay');
        if (zoomDisplay) {
            zoomDisplay.textContent = `${Math.round(this.zoomLevel * 100)}%`;
        }
        
        // Update button states
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        
        if (zoomInBtn) zoomInBtn.disabled = this.zoomLevel >= this.maxZoom;
        if (zoomOutBtn) zoomOutBtn.disabled = this.zoomLevel <= this.minZoom;
    }

    getEventPoint(event) {
        if (event.touches && event.touches.length > 0) {
            return { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
        return { x: event.clientX, y: event.clientY };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SVGMapControls();
});

// Export for other modules
window.SVGMapControls = SVGMapControls;