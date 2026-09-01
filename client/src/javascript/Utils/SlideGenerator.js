import * as THREE from 'three'

export function generateSlide(projectId, slideIndex) {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 680
    const ctx = canvas.getContext('2d')

    // 1. Background
    ctx.fillStyle = '#0a0f1e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 2. Tech Grid Lines
    ctx.strokeStyle = 'rgba(148, 176, 160, 0.08)'
    ctx.lineWidth = 1
    const gridSize = 40
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
    }

    // 3. Inner border and brackets
    ctx.strokeStyle = '#ffb3c6'
    ctx.lineWidth = 2
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)
    ctx.strokeStyle = '#94b0a0'
    ctx.lineWidth = 1
    ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70)

    // Corner crosshairs
    const drawCross = (cx, cy) => {
        ctx.strokeStyle = '#ebd9cc'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(cx - 15, cy)
        ctx.lineTo(cx + 15, cy)
        ctx.moveTo(cx, cy - 15)
        ctx.lineTo(cx, cy + 15)
        ctx.stroke()
    }
    drawCross(50, 50)
    drawCross(canvas.width - 50, 50)
    drawCross(50, canvas.height - 50)
    drawCross(canvas.width - 50, canvas.height - 50)

    // 4. Header Stamp
    ctx.fillStyle = '#94b0a0'
    ctx.font = 'bold 16px monospace'
    ctx.fillText(`[PROJECT EXH REFERENCE: ${projectId.toUpperCase()}-${slideIndex + 1}]`, 60, 80)

    // Render based on project
    if (projectId === 'f1_strategy') {
        if (slideIndex === 0) {
            // Overview Slide
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 44px monospace'
            ctx.fillText('F1 STRATEGY ENGINEER TOOLKIT', 80, 150)

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '24px monospace'
            ctx.fillText('Tactile Stopwatch & Decision-Support Framework', 80, 200)

            ctx.fillStyle = '#ffffff'
            ctx.font = '20px monospace'
            ctx.fillText('• Combines FastF1 telemetry and Monte Carlo simulation', 80, 280)
            ctx.fillText('• Models pit-stop window dynamics under race traffic', 80, 330)
            ctx.fillText('• Integrates game-theoretic optimal tyre degradation', 80, 380)
            ctx.fillText('• Implements reinforcement learning strategy solvers', 80, 430)

            // Draw mini race track vector
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(800, 300, 70, 0, Math.PI, true)
            ctx.arc(680, 300, 50, 0, Math.PI, false)
            ctx.closePath()
            ctx.stroke()
        } else if (slideIndex === 1) {
            // Tyre degradation graph
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('TYRE DEGRADATION & PACE LOSS MODEL', 80, 140)

            // Draw Graph Axes
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(100, 450)
            ctx.lineTo(800, 450) // X axis
            ctx.moveTo(100, 450)
            ctx.lineTo(100, 200) // Y axis
            ctx.stroke()

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '14px monospace'
            ctx.fillText('LAP DURATION (Seconds) ->', 110, 190)
            ctx.fillText('STINT LENGTH (Laps) ->', 780, 470)

            // Draw soft/medium/hard decay curves
            const drawCurve = (color, label, baseOffset, factor) => {
                ctx.strokeStyle = color
                ctx.lineWidth = 3
                ctx.beginPath()
                for (let x = 0; x <= 650; x += 10) {
                    const laps = x / 20
                    const val = baseOffset + Math.pow(laps, factor) * 0.15 + Math.sin(laps * 0.5) * 1.5
                    const screenY = 450 - val * 2.5
                    if (x === 0) ctx.moveTo(100 + x, screenY)
                    else ctx.lineTo(100 + x, screenY)
                }
                ctx.stroke()
                ctx.fillStyle = color
                ctx.font = 'bold 16px monospace'
                ctx.fillText(label, 760, 450 - (baseOffset + Math.pow(650/20, factor) * 0.15) * 2.5)
            }

            drawCurve('#ff8080', 'SOFT', 10, 1.6)
            drawCurve('#ffd080', 'MEDIUM', 30, 1.3)
            drawCurve('#80ff80', 'HARD', 55, 1.05)
        } else if (slideIndex === 2) {
            // Monte Carlo Pit Stop Window
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('MONTE CARLO PIT-STOP WINDOW SIMULATOR', 80, 140)

            ctx.fillStyle = '#ffffff'
            ctx.font = '18px monospace'
            ctx.fillText('Stint Optimization under Traffic Uncertainty (10,000 Iterations)', 80, 180)

            // Draw Bell Curves
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(100, 480)
            ctx.lineTo(900, 480)
            ctx.stroke()

            const drawBell = (cx, width, height, color, label) => {
                ctx.strokeStyle = color
                ctx.fillStyle = color + '22'
                ctx.lineWidth = 3
                ctx.beginPath()
                ctx.moveTo(cx - width, 480)
                for (let x = cx - width; x <= cx + width; x += 5) {
                    const t = (x - cx) / (width / 3)
                    const y = height * Math.exp(-0.5 * t * t)
                    ctx.lineTo(x, 480 - y)
                }
                ctx.lineTo(cx + width, 480)
                ctx.closePath()
                ctx.fill()
                ctx.stroke()

                ctx.fillStyle = color
                ctx.font = 'bold 16px monospace'
                ctx.fillText(label, cx - 40, 480 - height - 15)
            }

            drawBell(300, 150, 200, '#94b0a0', 'LAP 18 PIT')
            drawBell(550, 180, 150, '#d68c45', 'LAP 24 PIT')
            drawBell(750, 120, 240, '#ffb3c6', 'LAP 31 PIT')
        } else {
            // RL policy
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('REINFORCEMENT LEARNING Q-VALUE POLICY MAP', 80, 140)

            // Draw Grid representing Q-Table matrix
            for (let r = 0; r < 5; r++) {
                for (let c = 0; c < 5; c++) {
                    const qValue = Math.sin(r + c * 2) * 0.5 + 0.5
                    const alpha = Math.floor(qValue * 150 + 50).toString(16).padStart(2, '0')
                    ctx.fillStyle = `#ebd9cc${alpha}`
                    ctx.fillRect(150 + c * 80, 200 + r * 60, 75, 55)
                    ctx.strokeStyle = '#ebd9cc'
                    ctx.lineWidth = 1
                    ctx.strokeRect(150 + c * 80, 200 + r * 60, 75, 55)

                    ctx.fillStyle = '#0a0f1e'
                    ctx.font = '12px monospace'
                    ctx.fillText((qValue * 2 - 1).toFixed(2), 170 + c * 80, 235 + r * 60)
                }
            }

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '18px monospace'
            ctx.fillText('State Vectors (Tyre Wear % vs Lap Delta)', 600, 250)
            ctx.fillText('Action space: [Pit / Stay Out]', 600, 290)
            ctx.fillText('Policy convergence: 8,400 epochs', 600, 330)
            ctx.fillText('Model framework: Stable-Baselines3 Q-Net', 600, 370)
        }
    } else if (projectId === 'evoquant') {
        if (slideIndex === 0) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 44px monospace'
            ctx.fillText('EVOQUANT STRATEGY OPTIMIZER', 80, 150)

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '24px monospace'
            ctx.fillText('Quantitative strategy backtesting and optimization', 80, 200)

            ctx.fillStyle = '#ffffff'
            ctx.font = '20px monospace'
            ctx.fillText('• High-fidelity backtester with dividend and corporate actions', 80, 280)
            ctx.fillText('• Benchmarks Grid Search vs Genetic Algorithm vs PSO', 80, 330)
            ctx.fillText('• Enforces strict out-of-sample parameter validation', 80, 380)
            ctx.fillText('• Mitigates look-ahead bias and accounting leakage', 80, 430)
        } else if (slideIndex === 1) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('BACKTEST METRICS & EQUITY CURVE', 80, 140)

            // Draw Equity curve
            ctx.strokeStyle = '#94b0a0'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(100, 450)
            for (let x = 0; x <= 500; x += 10) {
                const val = Math.log(x + 10) * 45 + Math.sin(x * 0.1) * 15 + (x > 300 ? (x - 300) * 0.4 : 0)
                ctx.lineTo(100 + x, 450 - val)
            }
            ctx.stroke()

            // Draw Benchmark curve
            ctx.strokeStyle = 'rgba(235, 217, 204, 0.4)'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(100, 450)
            for (let x = 0; x <= 500; x += 10) {
                const val = Math.log(x + 10) * 35 + Math.cos(x * 0.05) * 20
                ctx.lineTo(100 + x, 450 - val)
            }
            ctx.stroke()

            // Draw metrics box
            ctx.fillStyle = '#ebd9cc'
            ctx.font = 'bold 20px monospace'
            ctx.fillText('METRICS READOUT:', 650, 200)
            ctx.font = '16px monospace'
            ctx.fillStyle = '#ffffff'
            ctx.fillText('Sharpe Ratio:  2.41', 650, 240)
            ctx.fillText('Max Drawdown: -8.12%', 650, 280)
            ctx.fillText('Win Rate:      64.5%', 650, 320)
            ctx.fillText('Beta vs SPY:   0.32', 650, 360)
        } else {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('OPTIMIZER CONVERGENCE BENCHMARK', 80, 140)

            // Draw convergence curve
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(150, 450)
            ctx.lineTo(750, 450) // X
            ctx.moveTo(150, 450)
            ctx.lineTo(150, 200) // Y
            ctx.stroke()

            // GA Convergence (Green)
            ctx.strokeStyle = '#80ff80'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(150, 220)
            for (let x = 0; x <= 600; x += 10) {
                const gen = x / 6
                const fit = 450 - 230 * (1 - Math.exp(-gen * 0.08)) - Math.sin(gen) * 5
                ctx.lineTo(150 + x, fit)
            }
            ctx.stroke()

            // Grid Search (Pink)
            ctx.strokeStyle = '#ff80c0'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(150, 340)
            ctx.lineTo(750, 340)
            ctx.stroke()

            ctx.fillStyle = '#80ff80'
            ctx.font = 'bold 14px monospace'
            ctx.fillText('GENETIC ALGORITHM', 400, 210)

            ctx.fillStyle = '#ff80c0'
            ctx.font = 'bold 14px monospace'
            ctx.fillText('GRID SEARCH', 400, 325)
        }
    } else if (projectId === 'cyber_shield') {
        if (slideIndex === 0) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 44px monospace'
            ctx.fillText('CYBERATTACK DQN SHIELD', 80, 150)

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '24px monospace'
            ctx.fillText('Real-Time Threat Detection & DQN Firewall Defense', 80, 200)

            ctx.fillStyle = '#ffffff'
            ctx.font = '20px monospace'
            ctx.fillText('• Classifies network packet patterns via high-throughput XGBoost', 80, 280)
            ctx.fillText('• Uses reinforcement learning DQN agent to pick mitigation actions', 80, 330)
            ctx.fillText('• Blocks packet injection attacks on simulated CAN telemetry logs', 80, 380)
            ctx.fillText('• Evaluates alert classification accuracy under heavy stress', 80, 430)
        } else if (slideIndex === 1) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('XGBOOST PACKET CLASSIFIER FEATURE IMPORTANCE', 80, 140)

            // Draw Bar Chart of features
            const features = [
                { label: 'PACKET_FREQUENCY', val: 0.88, color: '#ffb3c6' },
                { label: 'ALERT_INTEGRITY', val: 0.65, color: '#94b0a0' },
                { label: 'CAN_SOURCE_NODE', val: 0.42, color: '#ebd9cc' },
                { label: 'PAYLOAD_ENTROPY', val: 0.28, color: '#daeaf6' }
            ]

            features.forEach((f, idx) => {
                const y = 200 + idx * 70
                ctx.fillStyle = '#ffffff'
                ctx.font = '16px monospace'
                ctx.fillText(f.label, 80, y + 25)

                ctx.fillStyle = f.color
                ctx.fillRect(320, y, f.val * 500, 35)

                ctx.fillStyle = '#ffffff'
                ctx.fillText((f.val * 100).toFixed(0) + '%', 330 + f.val * 500, y + 25)
            })
        } else if (slideIndex === 2) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('DQN MITIGATION POLICY LEARNING CURVE', 80, 140)

            // Draw Learning Curve graph
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(150, 450)
            ctx.lineTo(850, 450)
            ctx.moveTo(150, 450)
            ctx.lineTo(150, 200)
            ctx.stroke()

            // DQN Reward (Yellow-Pink)
            ctx.strokeStyle = '#ffb3c6'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(150, 440)
            for (let x = 0; x <= 700; x += 10) {
                const ep = x / 700
                const reward = 450 - 240 * (1 - Math.exp(-ep * 3.5)) - Math.sin(x * 0.1) * 8 * (1 - ep)
                ctx.lineTo(150 + x, reward)
            }
            ctx.stroke()

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '18px monospace'
            ctx.fillText('Mean Cumulative Reward ->', 165, 230)
            ctx.fillText('Training Epochs ->', 680, 480)
        } else {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('CAN BUS INTRUSION GATEWAY TOPOLOGY', 80, 140)

            // Draw Block Diagram
            const drawBox = (x, y, w, h, label, bg) => {
                ctx.fillStyle = bg
                ctx.fillRect(x, y, w, h)
                ctx.strokeStyle = '#2d2621'
                ctx.lineWidth = 2
                ctx.strokeRect(x, y, w, h)

                ctx.fillStyle = '#0a0f1e'
                ctx.font = 'bold 14px monospace'
                ctx.fillText(label, x + w / 2 - ctx.measureText(label).width / 2, y + h / 2 + 5)
            }

            drawBox(100, 280, 160, 60, 'SENSORS / NODES', '#ebd9cc')
            drawBox(340, 280, 160, 60, 'XGBOOST CLASSIFIER', '#daeaf6')
            drawBox(580, 280, 160, 60, 'DQN SHIELD AGENT', '#ffb3c6')
            drawBox(820, 280, 120, 60, 'BLOCK / PASS', '#e2f0cb')

            // Draw Connective arrows
            const drawArrow = (x1, y1, x2, y2) => {
                ctx.strokeStyle = '#ebd9cc'
                ctx.lineWidth = 3
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()
            }
            drawArrow(260, 310, 340, 310)
            drawArrow(500, 310, 580, 310)
            drawArrow(740, 310, 820, 310)
        }
    } else if (projectId === 'image_forensics') {
        if (slideIndex === 0) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 44px monospace'
            ctx.fillText('COMPRESSION-AWARE IMAGE FORENSICS', 80, 150)

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '24px monospace'
            ctx.fillText('RGB-N Dual-Stream CNN Network (ResNet18)', 80, 200)

            ctx.fillStyle = '#ffffff'
            ctx.font = '20px monospace'
            ctx.fillText('• 6-channel input: combines RGB camera data with SRM noise maps', 80, 280)
            ctx.fillText('• Source-aware training prevents cross-contamination leaks', 80, 330)
            ctx.fillText('• Incorporates JPEG compression-aware learning models', 80, 380)
            ctx.fillText('• Generates weak localization heatmaps via Grad-CAM maps', 80, 430)
        } else if (slideIndex === 1) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('RGB-N DUAL-STREAM DENSE ARCHITECTURE', 80, 140)

            // Draw visual representation of architecture
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 2
            
            // RGB stream box
            ctx.fillStyle = 'rgba(255, 128, 128, 0.15)'
            ctx.fillRect(100, 200, 200, 80)
            ctx.strokeRect(100, 200, 200, 80)
            ctx.fillStyle = '#ff8080'
            ctx.font = 'bold 16px monospace'
            ctx.fillText('RGB INPUT STREAM', 120, 245)

            // SRM stream box
            ctx.fillStyle = 'rgba(128, 255, 255, 0.15)'
            ctx.fillRect(100, 340, 200, 80)
            ctx.strokeRect(100, 340, 200, 80)
            ctx.fillStyle = '#80ffff'
            ctx.fillText('SRM NOISE STREAM', 120, 385)

            // Mid Fusion box
            ctx.fillStyle = 'rgba(235, 217, 204, 0.2)'
            ctx.fillRect(420, 260, 220, 100)
            ctx.strokeRect(420, 260, 220, 100)
            ctx.fillStyle = '#ebd9cc'
            ctx.fillText('BILINEAR POOLING', 450, 305)
            ctx.fillText('& RESNET18 BACKBONE', 440, 330)

            // Softmax Box
            ctx.fillStyle = 'rgba(148, 176, 160, 0.2)'
            ctx.fillRect(740, 280, 180, 60)
            ctx.strokeRect(740, 280, 180, 60)
            ctx.fillStyle = '#94b0a0'
            ctx.fillText('TAMPERED PROB', 760, 315)

            // Connecting lines
            ctx.beginPath()
            ctx.moveTo(300, 240)
            ctx.lineTo(420, 300)
            ctx.moveTo(300, 380)
            ctx.lineTo(420, 320)
            ctx.moveTo(640, 310)
            ctx.lineTo(740, 310)
            ctx.stroke()
        } else if (slideIndex === 2) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('GRAD-CAM WEAK LOCALIZATION ANALYSIS', 80, 140)

            // Draw a fake tampered image outline and Grad-CAM heatmap circles
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
            ctx.fillRect(150, 200, 400, 260)
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 2
            ctx.strokeRect(150, 200, 400, 260)

            // A drawing inside of a tree/house
            ctx.beginPath()
            ctx.moveTo(250, 400)
            ctx.lineTo(350, 300)
            ctx.lineTo(450, 400)
            ctx.stroke()

            // Grad-CAM Hotspot
            ctx.fillStyle = 'rgba(255, 80, 80, 0.5)'
            ctx.beginPath()
            ctx.arc(350, 320, 60, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = 'rgba(255, 200, 80, 0.4)'
            ctx.beginPath()
            ctx.arc(350, 320, 100, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '18px monospace'
            ctx.fillText('Forensic Heatmap Overlay (CASIA 2.0)', 600, 240)
            ctx.fillText('Tampered region localized with high', 600, 280)
            ctx.fillText('high-frequency residue gradients.', 600, 310)
            ctx.fillText('AUC Score: 0.941', 600, 360)
            ctx.fillText('F1 Score:  0.923', 600, 400)
        } else {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('JPEG COMPRESSION ROBUSTNESS SCALING', 80, 140)

            // Draw curve showing accuracy vs compression rate
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(150, 450)
            ctx.lineTo(850, 450)
            ctx.moveTo(150, 450)
            ctx.lineTo(150, 200)
            ctx.stroke()

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '14px monospace'
            ctx.fillText('Accuracy (%) ->', 165, 230)
            ctx.fillText('JPEG Compression Quality Factor ->', 550, 480)

            // Robust Model (Green)
            ctx.strokeStyle = '#80ff80'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(150, 220)
            for (let x = 0; x <= 700; x += 10) {
                const q = x / 7
                const acc = 220 + (x * 0.1) * (1 - Math.exp(-x * 0.005))
                ctx.lineTo(150 + x, acc)
            }
            ctx.stroke()
            ctx.fillStyle = '#80ff80'
            ctx.font = 'bold 16px monospace'
            ctx.fillText('RGB-N (Robust)', 600, 310)

            // Baseline model (Pink - decays fast)
            ctx.strokeStyle = '#ff80c0'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(150, 220)
            for (let x = 0; x <= 700; x += 10) {
                const acc = 220 + (x * 0.3)
                ctx.lineTo(150 + x, Math.min(450, acc))
            }
            ctx.stroke()
            ctx.fillStyle = '#ff80c0'
            ctx.fillText('RGB Standard', 400, 400)
        }
    } else if (projectId === 'fateh_hub') {
        if (slideIndex === 0) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 44px monospace'
            ctx.fillText('TEAM FATEH TELEMETRY HUB', 80, 150)

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '24px monospace'
            ctx.fillText('Formula Student Electric Race Dashboard', 80, 200)

            ctx.fillStyle = '#ffffff'
            ctx.font = '20px monospace'
            ctx.fillText('• Connects custom STM32 acquisition boards to dashboard logs', 80, 280)
            ctx.fillText('• Monitors high-frequency 500Hz CAN bus telemetry', 80, 330)
            ctx.fillText('• Visualizes sensor metrics: cell voltage, temperature, speed', 80, 380)
            ctx.fillText('• Implements Next.js framework for historical analytics logging', 80, 430)
        } else if (slideIndex === 1) {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('CAN BUS TELEMETRY FEED LOGS', 80, 140)

            // Draw fake serial feed lines
            const hexLogs = [
                '10:43:22.105 [CAN] ID: 0x0A2  DATA: 00 24 A2 FF 48 C9 00 00',
                '10:43:22.107 [CAN] ID: 0x0B5  DATA: A3 B1 22 14 F0 EE B9 A0',
                '10:43:22.109 [CAN] ID: 0x1C1  DATA: 45 4E 47 49 4E 45 5f 4f',
                '10:43:22.111 [CAN] ID: 0x2A1  DATA: FF FF A8 12 F8 90 28 B1',
                '10:43:22.113 [CAN] ID: 0x0A2  DATA: 00 24 A2 FF 48 C9 00 01',
                '10:43:22.115 [CAN] ID: 0x0B5  DATA: A3 B1 22 14 F0 EE B9 A2'
            ]

            ctx.fillStyle = '#0f172a'
            ctx.fillRect(80, 180, 860, 260)
            ctx.strokeStyle = '#ebd9cc'
            ctx.lineWidth = 1.5
            ctx.strokeRect(80, 180, 860, 260)

            ctx.fillStyle = '#80ff80'
            ctx.font = '16px monospace'
            hexLogs.forEach((log, idx) => {
                ctx.fillText(log, 100, 220 + idx * 35)
            })

            ctx.fillStyle = '#ebd9cc'
            ctx.font = '18px monospace'
            ctx.fillText('Status: CONNECTED // BAUD RATE: 500Kbps // NODES: 6', 80, 480)
        } else {
            ctx.fillStyle = '#ffb3c6'
            ctx.font = 'bold 32px monospace'
            ctx.fillText('ACCUMULATOR PACK CELL SENSORS MONITOR', 80, 140)

            // Draw circular dial gauges
            const drawDial = (cx, cy, r, val, maxVal, label, color) => {
                ctx.strokeStyle = '#2d2621'
                ctx.lineWidth = 4
                ctx.beginPath()
                ctx.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 2.2)
                ctx.stroke()

                // Filled arc
                ctx.strokeStyle = color
                ctx.lineWidth = 6
                ctx.beginPath()
                const angle = Math.PI * 0.8 + (Math.PI * 1.4) * (val / maxVal)
                ctx.arc(cx, cy, r, Math.PI * 0.8, angle)
                ctx.stroke()

                // Dial label
                ctx.fillStyle = '#ffffff'
                ctx.font = 'bold 22px monospace'
                ctx.fillText(val.toString(), cx - 18, cy + 8)

                ctx.fillStyle = '#ebd9cc'
                ctx.font = '12px monospace'
                ctx.fillText(label, cx - ctx.measureText(label).width / 2, cy + r + 25)
            }

            drawDial(250, 300, 70, 78.4, 100, 'CELL TEMP (°C)', '#ff8080')
            drawDial(510, 300, 70, 4.12, 5, 'CELL VOLTAGE (V)', '#80ff80')
            drawDial(770, 300, 70, 89.2, 100, 'PACK SOC (%)', '#80ffff')
        }
    }

    return canvas.toDataURL('image/webp')
}

export function generateFloorTexture(projectId) {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    // Fill background transparent mask
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Outer boundary glow mask
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 6
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

    // Center text drawing (White on Black mask for alphaMap)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 36px monospace'
    ctx.textAlign = 'center'
    
    let title = 'PROJECT'
    let subtitle = 'TAP TO INTERACT'
    if (projectId === 'f1_strategy') {
        title = 'F1 STRATEGY ENGINEER'
        subtitle = 'REINFORCEMENT LEARNING SIMULATOR'
    } else if (projectId === 'evoquant') {
        title = 'EVOQUANT OPTIMIZER'
        subtitle = 'TRADING BACKTEST GENETIC OPT'
    } else if (projectId === 'cyber_shield') {
        title = 'CYBERATTACK DQN SHIELD'
        subtitle = 'XGBOOST CLASSIFIER & DQN MITIGATION'
    } else if (projectId === 'image_forensics') {
        title = 'IMAGE FORENSICS RGB-N'
        subtitle = 'RESNET18 DUAL-STREAM FORENSIC LENS'
    } else if (projectId === 'fateh_hub') {
        title = 'TEAM FATEH TELEMETRY'
        subtitle = 'CAN BUS LOGGING DASHBOARD'
    }

    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = 'bold 18px monospace'
    ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 35)

    const texture = new THREE.CanvasTexture(canvas)
    return texture
}
