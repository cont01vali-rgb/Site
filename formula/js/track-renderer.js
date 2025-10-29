/*************************************************
 * FORMULA LEARNING - TRACK RENDERER
 * SVG track visualization and car positioning
 *************************************************/

class TrackRenderer {
    constructor() {
        this.trackPaths = {};
        this.currentTrack = null;
        this.trackSvg = null;
    }

    // Initialize track visualization
    initializeTrack(trackId) {
        console.log(`🏁 Rendering track: ${trackId}`);
        
        this.currentTrack = trackId;
        this.trackSvg = document.getElementById('track-svg');
        
        if (!this.trackSvg) {
            console.error('Track SVG element not found');
            return;
        }

        this.clearTrack();
        this.drawTrack(trackId);
        this.setupProgressBar();
        this.addTrackProblems();
    }

    // Clear existing track
    clearTrack() {
        if (this.trackSvg) {
            this.trackSvg.innerHTML = '';
        }
    }

    // Draw track based on ID
    drawTrack(trackId) {
        switch (trackId) {
            case 'monaco':
                this.drawMonacoTrack();
                break;
            case 'silverstone':
                this.drawSilverstoneTrack();
                break;
            case 'spa':
                this.drawSpaTrack();
                break;
            default:
                this.drawDefaultTrack();
        }
    }

    // Draw Monaco track (simple city circuit)
    drawMonacoTrack() {
        const trackColor = '#404040';
        const trackWidth = 8;
        
        // Monaco-style tight corners and harbor section
        const path = `
            M 50 200 
            Q 50 100 150 100
            L 350 100
            Q 450 100 450 200
            Q 450 300 350 300
            L 250 300
            Q 200 300 200 250
            L 200 200
            Q 200 150 250 150
            L 300 150
            Q 350 150 350 200
            L 350 250
            Q 350 280 320 280
            L 150 280
            Q 100 280 100 230
            L 100 200
            Q 100 170 130 170
            L 170 170
            Q 200 170 200 200
            L 200 220
            Q 180 240 150 220
            Q 120 200 100 180
            Q 80 160 60 180
            Q 50 200 50 200
        `;

        this.addTrackPath(path, trackColor, trackWidth);
        this.addTrackBorders(path, trackWidth);
        
        // Monaco-specific decorations
        this.addMonacoDecorations();
        
        // Store path for position calculations
        this.trackPaths.monaco = this.createPathPoints(path);
    }

    // Draw Silverstone track (flowing curves)
    drawSilverstoneTrack() {
        const trackColor = '#404040';
        const trackWidth = 10;
        
        // Silverstone-style fast flowing curves
        const path = `
            M 100 200
            Q 200 100 400 150
            Q 600 200 700 300
            Q 650 350 550 350
            Q 450 350 400 300
            Q 350 250 300 300
            Q 250 350 200 300
            Q 150 250 100 200
        `;

        this.addTrackPath(path, trackColor, trackWidth);
        this.addTrackBorders(path, trackWidth);
        
        // Silverstone-specific decorations
        this.addSilverstoneDecorations();
        
        this.trackPaths.silverstone = this.createPathPoints(path);
    }

    // Draw Spa track (elevation changes simulation)
    drawSpaTrack() {
        const trackColor = '#404040';
        const trackWidth = 12;
        
        // Spa-style long straights and challenging corners
        const path = `
            M 80 200
            L 300 80
            Q 400 60 500 120
            Q 600 180 720 200
            Q 750 250 700 300
            Q 650 350 580 330
            Q 500 310 450 350
            Q 400 390 350 350
            Q 300 310 250 350
            Q 200 390 150 350
            Q 100 310 80 250
            Q 60 200 80 200
        `;

        this.addTrackPath(path, trackColor, trackWidth);
        this.addTrackBorders(path, trackWidth);
        
        // Spa-specific decorations
        this.addSpaDecorations();
        
        this.trackPaths.spa = this.createPathPoints(path);
    }

    // Draw default track
    drawDefaultTrack() {
        const path = `
            M 100 200
            Q 200 100 400 100
            Q 600 100 700 200
            Q 700 300 600 350
            Q 400 350 200 350
            Q 100 300 100 200
        `;
        
        this.addTrackPath(path, '#404040', 8);
        this.trackPaths.default = this.createPathPoints(path);
    }

    // Add track path to SVG
    addTrackPath(pathData, color, width) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', width);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        
        this.trackSvg.appendChild(path);
    }

    // Add track borders
    addTrackBorders(pathData, trackWidth) {
        // Outer border
        const outerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        outerPath.setAttribute('d', pathData);
        outerPath.setAttribute('stroke', '#ffffff');
        outerPath.setAttribute('stroke-width', trackWidth + 4);
        outerPath.setAttribute('fill', 'none');
        outerPath.setAttribute('opacity', '0.8');
        
        // Inner border
        const innerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        innerPath.setAttribute('d', pathData);
        innerPath.setAttribute('stroke', '#ffffff');
        innerPath.setAttribute('stroke-width', trackWidth - 2);
        innerPath.setAttribute('fill', 'none');
        innerPath.setAttribute('opacity', '0.6');
        
        this.trackSvg.insertBefore(outerPath, this.trackSvg.firstChild);
        this.trackSvg.appendChild(innerPath);
    }

    // Add Monaco-specific decorations
    addMonacoDecorations() {
        // Harbor/yacht symbols
        this.addDecorationText('⛵', 500, 120, '#4fb3f9');
        this.addDecorationText('🏰', 200, 80, '#8b5a3c');
        this.addDecorationText('🏙️', 400, 80, '#64748b');
    }

    // Add Silverstone-specific decorations
    addSilverstoneDecorations() {
        // British countryside elements
        this.addDecorationText('🌳', 150, 150, '#22c55e');
        this.addDecorationText('🌳', 550, 250, '#22c55e');
        this.addDecorationText('🇬🇧', 400, 50, '#1e40af');
    }

    // Add Spa-specific decorations
    addSpaDecorations() {
        // Forest and elevation indicators
        this.addDecorationText('🌲', 100, 100, '#15803d');
        this.addDecorationText('🌲', 600, 100, '#15803d');
        this.addDecorationText('⛰️', 500, 50, '#78716c');
        this.addDecorationText('🌲', 300, 380, '#15803d');
    }

    // Add decoration text to SVG
    addDecorationText(text, x, y, color = '#64748b') {
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', x);
        textElement.setAttribute('y', y);
        textElement.setAttribute('fill', color);
        textElement.setAttribute('font-size', '20');
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('opacity', '0.7');
        textElement.textContent = text;
        
        this.trackSvg.appendChild(textElement);
    }

    // Create path points for position calculation
    createPathPoints(pathData) {
        // Simple approximation - in reality you'd parse the SVG path more precisely
        const points = [];
        const numPoints = 100;
        
        // For demo purposes, create circular points
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI;
            const centerX = 400;
            const centerY = 200;
            const radiusX = 250;
            const radiusY = 120;
            
            points.push({
                x: centerX + Math.cos(angle) * radiusX,
                y: centerY + Math.sin(angle) * radiusY
            });
        }
        
        return points;
    }

    // Get position on track based on progress percentage
    getPositionOnTrack(progressPercent) {
        const trackPoints = this.trackPaths[this.currentTrack] || this.trackPaths.default;
        if (!trackPoints || trackPoints.length === 0) return { x: 400, y: 200 };
        
        const normalizedProgress = Math.max(0, Math.min(100, progressPercent));
        const pointIndex = Math.floor((normalizedProgress / 100) * (trackPoints.length - 1));
        
        return trackPoints[pointIndex] || { x: 400, y: 200 };
    }

    // Setup progress bar instead of track checkpoints
    setupProgressBar() {
        const progressCheckpoints = document.getElementById('progress-checkpoints');
        if (!progressCheckpoints) return;
        
        progressCheckpoints.innerHTML = '';
        
        const track = window.raceEngine?.gameState?.track;
        if (!track) return;
        
        const questionCount = track.config.questions;
        
        for (let i = 0; i < questionCount; i++) {
            const progress = ((i + 1) / questionCount) * 100;
            
            const checkpoint = document.createElement('div');
            checkpoint.className = 'progress-checkpoint';
            checkpoint.id = `progress-checkpoint-${i + 1}`;
            checkpoint.style.left = `${progress}%`;
            checkpoint.textContent = i + 1;
            
            progressCheckpoints.appendChild(checkpoint);
        }
    }

    // Update progress bar display
    updateProgressBar(completedQuestions, totalQuestions, currentProgress) {
        const progressBar = document.getElementById('progress-bar');
        const progressPlayer = document.getElementById('progress-player');
        const currentQuestionInfo = document.getElementById('current-question-info');
        
        if (progressBar) {
            const progressPercent = (currentProgress / 100) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
        
        if (progressPlayer) {
            progressPlayer.style.left = `${currentProgress}%`;
        }
        
        if (currentQuestionInfo) {
            currentQuestionInfo.textContent = `Question ${completedQuestions + 1} of ${totalQuestions}`;
        }
        
        // Update checkpoint states
        for (let i = 1; i <= totalQuestions; i++) {
            const checkpoint = document.getElementById(`progress-checkpoint-${i}`);
            if (checkpoint) {
                checkpoint.classList.remove('completed', 'current');
                
                if (i <= completedQuestions) {
                    checkpoint.classList.add('completed');
                } else if (i === completedQuestions + 1) {
                    checkpoint.classList.add('current');
                }
            }
        }
    }

    // Add random track problems (bonus questions)
    addTrackProblems() {
        const problemsContainer = document.getElementById('track-problems');
        if (!problemsContainer) return;
        
        problemsContainer.innerHTML = '';
        
        // Add 2-3 random problems along the track
        const problemCount = Math.floor(Math.random() * 2) + 2; // 2-3 problems
        
        for (let i = 0; i < problemCount; i++) {
            const randomProgress = Math.random() * 90 + 5; // 5% to 95%
            const position = this.getPositionOnTrack(randomProgress);
            
            const problem = document.createElement('div');
            problem.className = 'track-problem';
            problem.style.left = (position.x - 15) + 'px';
            problem.style.top = (position.y - 15) + 'px';
            problem.textContent = '!';
            problem.title = 'Bonus Question Available!';
            
            // Add click handler for bonus questions
            problem.addEventListener('click', () => {
                this.handleBonusQuestion(problem);
            });
            
            problemsContainer.appendChild(problem);
        }
    }

    // Handle bonus question click
    handleBonusQuestion(problemElement) {
        if (!window.raceEngine?.gameState?.isRaceActive) return;
        
        // Remove the problem from track
        problemElement.remove();
        
        // Show bonus question (simplified for demo)
        alert('🎁 Bonus question clicked! +5 points!');
        
        if (window.raceEngine) {
            window.raceEngine.gameState.score += 5;
            window.raceEngine.updateUI();
        }
    }

    // Update checkpoint status
    updateCheckpointStatus(completedCount) {
        for (let i = 1; i <= completedCount; i++) {
            const checkpoint = document.getElementById(`checkpoint-${i}`);
            if (checkpoint) {
                checkpoint.classList.add('completed');
            }
        }
        
        // Highlight current checkpoint
        const currentCheckpoint = document.getElementById(`checkpoint-${completedCount + 1}`);
        if (currentCheckpoint) {
            currentCheckpoint.classList.add('current');
        }
    }

    // Get track info for current track
    getTrackInfo() {
        return {
            id: this.currentTrack,
            pathPoints: this.trackPaths[this.currentTrack] || [],
            totalLength: this.trackPaths[this.currentTrack]?.length || 0
        };
    }
}

// Global track renderer instance
window.TrackRenderer = new TrackRenderer();