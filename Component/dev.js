
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".parallax-section");
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (position < screenHeight / 1.5) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});
