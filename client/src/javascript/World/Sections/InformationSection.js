import * as THREE from 'three'

export default class InformationSection
{
    constructor(_options)
    {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setStatic()
        this.setLinks()
        this.setActivities()
        this.setTiles()
    }

    setStatic()
    {
        this.objects.add({
            base: this.resources.items.informationStaticBase.scene,
            collision: this.resources.items.informationStaticCollision.scene,
            floorShadowTexture: this.resources.items.informationStaticFloorShadowTexture,
            offset: new THREE.Vector3(this.x, this.y, 0),
            mass: 0
        })
    }

    createActivitiesTexture()
    {
        const canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 512
        const ctx = canvas.getContext('2d')

        // Fill background with black (transparent mask base)
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw title
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 30px monospace'
        ctx.fillText('MANNAT GOYAL - SYSTEMS, AI & MOTORSPORTS TELEMETRY', 40, 50)

        // Draw a separator line
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(40, 68)
        ctx.lineTo(984, 68)
        ctx.stroke()

        // Column 1 (Left): Education & Team Fateh EV Experience
        ctx.font = 'bold 20px monospace'
        ctx.fillText('ACADEMICS & FORMULA STUDENT', 40, 105)

        ctx.font = '15px monospace'
        ctx.fillText('• B.E. Computer Engineering - Thapar Inst. (2023-27)', 40, 138)
        ctx.fillText('• B.Sc.(Hons) Data Science & AI - IIT Guwahati (2023-27)', 40, 163)
        
        ctx.fillText('• Team Manager & DAQ Engineer - Team Fateh (2023-Pres.)', 40, 200)
        ctx.fillText('  Team Manager (Jan 2026-): Leads 40-50 member org,', 40, 222)
        ctx.fillText('  priorities & roadmap against Rs.45L budget.', 40, 244)
        ctx.fillText('  Industry 4.0 digital thread (SolidWorks, Infor, MES, AWS).', 40, 266)
        ctx.fillText('  DAQ: STM32F446 & ESP32 500Hz CAN bus acquisition.', 40, 288)

        ctx.font = 'bold 18px monospace'
        ctx.fillText('COMPETITION AWARDS', 40, 335)
        ctx.font = '14px monospace'
        ctx.fillText('• SUPRA SAE 2025: 2nd Runner-Up Overall, 1st Design', 40, 362)
        ctx.fillText('• Formula Bharat 2025: Top 10 Overall, Design Finalist', 40, 385)
        ctx.fillText('• Pi-EV 2024: Procurement Event Winner', 40, 408)

        // Column 2 (Right): Core Projects & Technical Stack
        ctx.font = 'bold 20px monospace'
        ctx.fillText('FEATURED PROJECTS & ML SYSTEMS', 530, 105)

        ctx.font = '15px monospace'
        ctx.fillText('• VoltNet: Battery State & Thermal Modeling', 530, 138)
        ctx.fillText('  Physics-informed ML for electrified powertrains.', 530, 160)

        ctx.fillText('• HQML-BMS: Quantum Hybrid Battery Safety', 530, 195)
        ctx.fillText('  Variational quantum circuits for runaway prediction.', 530, 217)

        ctx.fillText('• Trust Strategy Motorsports: F1 RL Strategy', 530, 252)
        ctx.fillText('  Monte Carlo tyre degradation & game theory solver.', 530, 274)

        ctx.fillText('• Cyberattack Detection DQN & Image Forensics', 530, 309)
        ctx.fillText('  XGBoost-DQN firewall & ResNet18 RGB-N dual stream.', 530, 331)

        ctx.font = 'bold 18px monospace'
        ctx.fillText('TECHNICAL ARSENAL', 530, 372)
        ctx.font = '14px monospace'
        ctx.fillText('• Languages: Python, C/C++, MATLAB, TypeScript', 530, 398)
        ctx.fillText('• ML & Systems: PyTorch, scikit-learn, STM32, CAN Bus', 530, 421)
        ctx.fillText('• Tools & Web: Next.js, React, Three.js, Linux, Git', 530, 444)

        const texture = new THREE.CanvasTexture(canvas)
        return texture
    }

    createContactLabelTexture(service, handle)
    {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 128
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 4
        ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 24px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(service.toUpperCase(), canvas.width / 2, 48)

        ctx.font = '18px monospace'
        ctx.fillText(handle, canvas.width / 2, 88)

        const texture = new THREE.CanvasTexture(canvas)
        return texture
    }

    setLinks()
    {
        // Set up
        this.links = {}
        this.links.x = 1.95
        this.links.y = - 1.5
        this.links.halfExtents = {}
        this.links.halfExtents.x = 1
        this.links.halfExtents.y = 1
        this.links.distanceBetween = 2.4
        this.links.labelWidth = this.links.halfExtents.x * 2 + 1
        this.links.labelGeometry = new THREE.PlaneGeometry(this.links.labelWidth, this.links.labelWidth * 0.25, 1, 1)
        this.links.labelOffset = - 1.6
        this.links.items = []

        this.links.container = new THREE.Object3D()
        this.links.container.matrixAutoUpdate = false
        this.container.add(this.links.container)

        // Options
        this.links.options = [
            {
                href: 'https://github.com/mannatgoyal',
                labelTexture: this.createContactLabelTexture('GitHub', '@mannatgoyal')
            },
            {
                href: 'https://www.linkedin.com/in/mannat-goyal28/',
                labelTexture: this.createContactLabelTexture('LinkedIn', 'in/mannat-goyal28')
            },
            {
                href: 'mailto:gmannat793@gmail.com',
                labelTexture: this.createContactLabelTexture('Email', 'gmannat793@gmail.com')
            }
        ]

        // Create each link
        let i = 0
        for(const _option of this.links.options)
        {
            // Set up
            const item = {}
            item.x = this.x + this.links.x + this.links.distanceBetween * i
            item.y = this.y + this.links.y
            item.href = _option.href

            // Create area
            item.area = this.areas.add({
                position: new THREE.Vector2(item.x, item.y),
                halfExtents: new THREE.Vector2(this.links.halfExtents.x, this.links.halfExtents.y)
            })
            item.area.on('interact', () =>
            {
                window.open(_option.href, '_blank')
            })

            // Texture
            item.texture = _option.labelTexture
            item.texture.magFilter = THREE.NearestFilter
            item.texture.minFilter = THREE.LinearFilter

            // Create label
            item.labelMesh = new THREE.Mesh(this.links.labelGeometry, new THREE.MeshBasicMaterial({ wireframe: false, color: 0xffffff, alphaMap: _option.labelTexture, depthTest: true, depthWrite: false, transparent: true }))
            item.labelMesh.position.x = item.x + this.links.labelWidth * 0.5 - this.links.halfExtents.x
            item.labelMesh.position.y = item.y + this.links.labelOffset
            item.labelMesh.matrixAutoUpdate = false
            item.labelMesh.updateMatrix()
            this.links.container.add(item.labelMesh)

            // Save
            this.links.items.push(item)

            i++
        }
    }

    setActivities()
    {
        // Set up
        this.activities = {}
        this.activities.x = this.x + 0
        this.activities.y = this.y - 10
        this.activities.multiplier = 5.5

        // Geometry
        this.activities.geometry = new THREE.PlaneGeometry(2 * this.activities.multiplier, 1 * this.activities.multiplier, 1, 1)

        // Texture
        this.activities.texture = this.createActivitiesTexture()
        this.activities.texture.magFilter = THREE.NearestFilter
        this.activities.texture.minFilter = THREE.LinearFilter

        // Material
        this.activities.material = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xffffff, alphaMap: this.activities.texture, transparent: true })

        // Mesh
        this.activities.mesh = new THREE.Mesh(this.activities.geometry, this.activities.material)
        this.activities.mesh.position.x = this.activities.x
        this.activities.mesh.position.y = this.activities.y
        this.activities.mesh.matrixAutoUpdate = false
        this.activities.mesh.updateMatrix()
        this.container.add(this.activities.mesh)
    }

    setTiles()
    {
        this.tiles.add({
            start: new THREE.Vector2(this.x - 1.2, this.y + 13),
            delta: new THREE.Vector2(0, - 20)
        })
    }
}
