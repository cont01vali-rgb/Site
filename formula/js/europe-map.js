/*************************************************
 * EUROPE MAP WITH F1 TRACK MARKERS
 * Interactive map for Formula Learning with Real European Map
 *************************************************/

class EuropeMap {
    constructor() {
        this.mapElement = document.getElementById('europeMap');
        this.selectedCountry = null;
        this.selectedTrack = null;
        
        // Country to track mapping based on real data
        this.countriesData = {
            'FR': {
                name: 'France',
                tracks: ['Monaco']
            },
            'IT': {
                name: 'Italy', 
                tracks: ['Monza', 'Imola']
            },
            'GB': {
                name: 'United Kingdom',
                tracks: ['Silverstone']
            },
            'DE': {
                name: 'Germany',
                tracks: ['Nürburgring']
            },
            'BE': {
                name: 'Belgium',
                tracks: ['Spa']
            }
        };
        
        this.init();
    }

    init() {
        this.setupCountryEventListeners();
        this.setupTrackEventListeners();
        this.highlightCountriesWithTracks();
        console.log('Europe Map initialized successfully');
    }

    setupCountryEventListeners() {
        // Add click listeners to all countries
        const countryElements = this.mapElement.querySelectorAll('.land');
        
        countryElements.forEach(country => {
            const countryId = country.getAttribute('id');
            
            // Only add interactivity to countries with tracks
            if (this.countriesData[countryId]) {
                country.style.cursor = 'pointer';
                
                country.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.selectCountry(countryId);
                });

                country.addEventListener('mouseover', () => {
                    this.showTooltip(country, countryId);
                });

                country.addEventListener('mouseout', () => {
                    this.hideTooltip();
                });
            } else {
                // Countries without tracks are less interactive
                country.style.opacity = '0.6';
                country.style.cursor = 'default';
            }
        });
    }

    setupTrackEventListeners() {
        // Sidebar track clicks
        document.querySelectorAll('.track-card').forEach(item => {
            item.addEventListener('click', (e) => {
                const trackName = item.querySelector('.track-name').textContent;
                this.selectTrackByName(trackName);
            });
        });
    }

    highlightCountriesWithTracks() {
        Object.keys(this.countriesData).forEach(countryId => {
            const countryElement = document.getElementById(countryId);
            if (countryElement) {
                countryElement.classList.add('has-tracks');
                countryElement.style.filter = 'brightness(1.1)';
                countryElement.style.strokeWidth = '1';
            }
        });
    }

    selectCountry(countryId) {
        // Clear previous selection
        this.clearSelection();
        
        const countryData = this.countriesData[countryId];
        if (!countryData) return;

        this.selectedCountry = countryId;
        
        // Highlight selected country
        const countryElement = document.getElementById(countryId);
        if (countryElement) {
            countryElement.classList.add('highlighted');
        }

        // Filter tracks based on selected country
        this.filterTracks(countryData.tracks);
        
        // Show notification
        this.showNotification(`Selected ${countryData.name} - ${countryData.tracks.length} track(s) available`);
        
        console.log(`Selected country: ${countryData.name}, tracks:`, countryData.tracks);
    }

    selectTrackByName(trackName) {
        // Find the country that contains this track
        let trackCountry = null;
        for (const [countryId, data] of Object.entries(this.countriesData)) {
            if (data.tracks.includes(trackName)) {
                trackCountry = countryId;
                break;
            }
        }

        if (trackCountry) {
            this.selectCountry(trackCountry);
            this.selectedTrack = trackName;
            
            // Highlight the specific track card
            const trackCards = document.querySelectorAll('.track-card');
            trackCards.forEach(card => {
                const cardTrackName = card.querySelector('.track-name').textContent;
                if (cardTrackName === trackName) {
                    card.classList.add('selected');
                }
            });

            // Update start button for specific track
            this.updateStartButtonForTrack(trackName);
        }
    }

    clearSelection() {
        // Remove highlighting from all countries
        const highlightedCountries = this.mapElement.querySelectorAll('.highlighted');
        highlightedCountries.forEach(country => {
            country.classList.remove('highlighted');
        });
        
        // Remove track selection
        const selectedTracks = document.querySelectorAll('.track-card.selected');
        selectedTracks.forEach(track => {
            track.classList.remove('selected');
        });
        
        this.selectedCountry = null;
        this.selectedTrack = null;
        
        // Show all tracks again
        this.showAllTracks();
    }

    filterTracks(allowedTracks) {
        const trackCards = document.querySelectorAll('.track-card');
        let visibleCount = 0;
        
        trackCards.forEach(card => {
            const trackName = card.querySelector('.track-name').textContent;
            
            if (allowedTracks.includes(trackName)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('filtered-visible');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('filtered-visible');
            }
        });

        // Update start button
        this.updateStartButton(visibleCount > 0);
    }

    showAllTracks() {
        const trackCards = document.querySelectorAll('.track-card');
        
        trackCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.remove('filtered-visible');
        });

        this.updateStartButton(true);
    }

    updateStartButton(hasVisibleTracks) {
        const startButtonContainer = document.getElementById('startButtonContainer');
        const startButton = document.getElementById('dynamicStartBtn');
        
        if (hasVisibleTracks) {
            startButtonContainer.style.display = 'block';
            startButtonContainer.classList.add('visible');
            
            if (this.selectedTrack) {
                startButton.innerHTML = `
                    <span class="btn-icon">🏁</span>
                    <span class="btn-text">Start ${this.selectedTrack} Race</span>
                `;
                startButton.setAttribute('data-track', this.selectedTrack);
            } else if (this.selectedCountry) {
                const countryData = this.countriesData[this.selectedCountry];
                startButton.innerHTML = `
                    <span class="btn-icon">🏁</span>
                    <span class="btn-text">Start Racing in ${countryData.name}</span>
                `;
            } else {
                startButton.innerHTML = `
                    <span class="btn-icon">🏁</span>
                    <span class="btn-text">Start Formula Learning</span>
                `;
            }
        } else {
            startButtonContainer.style.display = 'none';
            startButtonContainer.classList.remove('visible');
        }
    }

    updateStartButtonForTrack(trackName) {
        const startButtonContainer = document.getElementById('startButtonContainer');
        const startButton = document.getElementById('dynamicStartBtn');
        
        startButtonContainer.style.display = 'block';
        startButtonContainer.classList.add('visible');
        
        startButton.innerHTML = `
            <span class="btn-icon">🏁</span>
            <span class="btn-text">Start ${trackName} Race</span>
        `;
        startButton.setAttribute('data-track', trackName);
    }

    showTooltip(element, countryId) {
        const countryData = this.countriesData[countryId];
        if (!countryData) return;

        // Remove existing tooltip
        this.hideTooltip();

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        tooltip.innerHTML = `
            <strong>${countryData.name}</strong><br>
            ${countryData.tracks.length} track(s): ${countryData.tracks.join(', ')}
        `;

        // Position tooltip
        const rect = element.getBoundingClientRect();
        const mapRect = this.mapElement.getBoundingClientRect();
        
        tooltip.style.position = 'absolute';
        tooltip.style.left = (rect.left - mapRect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - mapRect.top - 10) + 'px';
        tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '6px';
        tooltip.style.fontSize = '12px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';

        // Add to map container
        const mapContainer = this.mapElement.parentElement;
        mapContainer.style.position = 'relative';
        mapContainer.appendChild(tooltip);
    }

    hideTooltip() {
        const existingTooltip = document.querySelector('.map-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }

    showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.map-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'map-notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#007bff';
        notification.style.color = 'white';
        notification.style.padding = '12px 16px';
        notification.style.borderRadius = '6px';
        notification.style.zIndex = '2000';
        notification.style.fontSize = '14px';
        notification.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
        notification.style.animation = 'slideInRight 0.3s ease-out';

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    // Method to reset map to initial state
    resetMap() {
        this.clearSelection();
        this.hideTooltip();
        
        const notification = document.querySelector('.map-notification');
        if (notification) {
            notification.remove();
        }
        
        console.log('Map reset to initial state');
    }
}

// Initialize the map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the page to fully render
    setTimeout(() => {
        window.europeMap = new EuropeMap();
        
        // Start button functionality
        const startBtn = document.getElementById('dynamicStartBtn');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                const trackName = e.currentTarget.getAttribute('data-track');
                if (trackName) {
                    // Simulate starting a race (will be implemented later)
                    alert(`Starting race at ${trackName}! 🏁\n\nThis will redirect to the race interface.`);
                }
            });
        }
    }, 100);
});

// Add double-click to reset functionality
document.addEventListener('dblclick', (event) => {
    if (event.target.closest('.europe-map')) {
        if (window.europeMap) {
            window.europeMap.resetMap();
        }
    }
});