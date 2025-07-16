
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Highlight active navigation link on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active-nav');
                }
            });
        });

        // Initialize GSAP animations
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        });

        // Animate skill cards
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.5,
                delay: i * 0.1,
                ease: "power2.out"
            });
        });

        // Three.js 3D Laptop
        const laptopContainer = document.getElementById('laptop-container');
        
        // Only initialize Three.js if container exists
        if (laptopContainer) {
            // Scene setup
            const scene = new THREE.Scene();
            scene.background = null; // Transparent background
            
            // Camera
            const camera = new THREE.PerspectiveCamera(
                75, 
                laptopContainer.clientWidth / laptopContainer.clientHeight, 
                0.1, 
                1000
            );
            camera.position.z = 5;
            
            // Renderer
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(laptopContainer.clientWidth, laptopContainer.clientHeight);
            renderer.setClearColor(0x000000, 0); // Transparent background
            laptopContainer.appendChild(renderer.domElement);
            
            // Lights
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);
            
            const directionalLight1 = new THREE.DirectionalLight(0x3da9fc, 1);
            directionalLight1.position.set(1, 1, 1);
            scene.add(directionalLight1);
            
            const directionalLight2 = new THREE.DirectionalLight(0x9370db, 1);
            directionalLight2.position.set(-1, -1, -1);
            scene.add(directionalLight2);
            
            // Add glowing effect
            const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0x3da9fc,
                transparent: true,
                opacity: 0.2
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            scene.add(glow);
            
            // Laptop model (simplified)
            const createLaptop = () => {
                const group = new THREE.Group();
                
                // Base (keyboard part)
                const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
                const baseMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x111111,
                    specular: 0x555555,
                    shininess: 30
                });
                const base = new THREE.Mesh(baseGeometry, baseMaterial);
                base.position.y = -0.1;
                group.add(base);
                
                // Screen
                const screenGeometry = new THREE.BoxGeometry(2.8, 1.8, 0.05);
                const screenMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x000000,
                    emissive: 0x3da9fc,
                    emissiveIntensity: 0.3,
                    specular: 0x111111,
                    shininess: 10
                });
                const screen = new THREE.Mesh(screenGeometry, screenMaterial);
                screen.position.set(0, 1, -0.1);
                screen.rotation.x = -0.3;
                group.add(screen);
                
                // Screen content (simulated)
                const screenContentGeometry = new THREE.PlaneGeometry(2.7, 1.7);
                const screenContentMaterial = new THREE.MeshBasicMaterial({ 
                    color: 0x3da9fc,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.8
                });
                const screenContent = new THREE.Mesh(screenContentGeometry, screenContentMaterial);
                screenContent.position.set(0, 1, -0.125);
                screenContent.rotation.x = -0.3;
                group.add(screenContent);
                
                // Add some code-like lines to screen
                const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
                
                for (let i = 0; i < 10; i++) {
                    const points = [];
                    points.push(new THREE.Vector3(-1.2, 0.8 - i * 0.15, 0));
                    points.push(new THREE.Vector3(1.2 - Math.random() * 0.5, 0.8 - i * 0.15, 0));
                    
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    line.position.set(0, 1, -0.126);
                    line.rotation.x = -0.3;
                    group.add(line);
                }
                
                // Trackpad
                const trackpadGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.8);
                const trackpadMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x222222,
                    specular: 0x888888,
                    shininess: 50
                });
                const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
                trackpad.position.set(0, -0.025, 0.5);
                group.add(trackpad);
                
                return group;
            };
            
            const laptop = createLaptop();
            scene.add(laptop);
            
            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                
                // Rotate laptop
                laptop.rotation.y += 0.005;
                
                // Pulsing glow effect
                glow.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.1;
                glow.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.1;
                glow.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.1;
                
                renderer.render(scene, camera);
            };
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = laptopContainer.clientWidth / laptopContainer.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(laptopContainer.clientWidth, laptopContainer.clientHeight);
            });
            
            animate();
        }
   