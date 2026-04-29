// CLICK EFFECT
export function initClickEffect() {
    document.addEventListener('click', (e) => {
        const effect = document.getElementById('click-effect');
        if (!effect) return;

        effect.style.left = e.clientX + 'px';
        effect.style.top = e.clientY + 'px';
        effect.style.animation = 'clickPulse 0.5s ease';
        setTimeout(() => {
            effect.style.animation = '';
        }, 500);
    });
}
