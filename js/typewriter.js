// TYPEWRITER EFFECT
export function initTypewriter() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    const originalText = subtitle.textContent;
    subtitle.textContent = '';

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80);
        }
    }

    setTimeout(typeWriter, 800);
}
