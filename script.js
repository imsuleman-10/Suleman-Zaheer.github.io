document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Mobile Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- 2. Sticky Header on Scroll ---
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- 3. Hero Text Cycling Animation ---
    const textCycleSpan = document.querySelector(".text-cycle");
    const roles = ["Computer Science Student", "Beginner Web Developer", "Programming Enthusiast"];
    let roleIndex = 0;

    function cycleText() {
        textCycleSpan.classList.add('fading-out');
        
        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            textCycleSpan.textContent = roles[roleIndex];
            textCycleSpan.classList.remove('fading-out');
        }, 500); // Must match CSS transition duration
    }
    setInterval(cycleText, 3000); // Change text every 3 seconds

    // --- 4. Vanilla JS Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll(
        ".reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-pop"
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // We can unobserve if we only want the animation once
                // revealObserver.unobserve(entry.target); 
            } else {
                 // Add this if you want animations to repeat when scrolling up
                 entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Skill Bar Animation on Scroll ---
    const skillLevels = document.querySelectorAll(".skill-level");

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                skill.style.width = skill.dataset.level;
                skillObserver.unobserve(skill); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the bar is visible

    skillLevels.forEach(skill => {
        skillObserver.observe(skill);
    });

    // --- 6. Project Card 3D Tilt Effect ---
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -20; // Max 10deg rotation
            const rotateY = (x / width - 0.5) * 20;  // Max 10deg rotation

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.zIndex = "10";
        });

        

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
            card.style.zIndex = "1";
        });
    });

});