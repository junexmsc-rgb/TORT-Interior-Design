// app.js - TORT Interaction Logic

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Architectural Custom Cursor
    const cursor = document.querySelector('.arch-cursor');
    const magneticElements = document.querySelectorAll('.magnetic-el');

    if (window.innerWidth > 1024 && cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
        });

        magneticElements.forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
            });
        });
    }

    // 2. The Hero Masking Reveal (Cinematic Unveiling)
    const heroTl = gsap.timeline();
    
    heroTl.to(".image-mask-reveal", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.8,
        stagger: 0.2,
        ease: "power4.inOut"
    })
    .from(".hero-text-up", {
        y: "120%",
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=1");

    // 3. Subtle Hero Parallax
    gsap.to(".hero-parallax", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 4. Staggered Text & Element Fades
    gsap.utils.toArray('.reveal-fade').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            y: 40, opacity: 0, duration: 1.2, ease: "power2.out"
        });
    });

    // 5. Image Reveals in the Asymmetrical Grid
    gsap.utils.toArray('.reveal-img').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            y: 60, opacity: 0, scale: 0.95, duration: 1.2, ease: "power3.out"
        });
    });
});
