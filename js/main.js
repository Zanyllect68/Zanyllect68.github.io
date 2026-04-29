// MAIN.JS - Inicializador del blog
import { initTypewriter } from './typewriter.js';
import { initCard3D } from './card-3d.js';
import { initClickEffect } from './click-effect.js';

document.addEventListener('DOMContentLoaded', () => {
    // EFECTO DE ESCRITURA
    initTypewriter();

    // TARJETAS 3D
    initCard3D();

    // EFECTO DE CLICK
    initClickEffect();
});
