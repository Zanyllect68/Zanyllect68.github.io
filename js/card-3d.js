// CARD 3D EFFECT
export function initCard3D() {
    document.querySelectorAll('.project-card, .article-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            card.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 10}deg) rotateY(${(centerX - x) / 10}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}
