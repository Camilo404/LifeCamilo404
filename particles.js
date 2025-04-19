// Configuración de partículas
const particleConfig = {
    symbols: ['•', '❄', '✧', '*', '·'],
    colors: ['#ffffff', '#f0f0ff', '#e6e6ff', '#d9d9ff'],
    minSize: 8,
    maxSize: 20,
    minDuration: 8,
    maxDuration: 15,
    density: 200, // ms entre partículas
    maxParticles: 50, // máximo de partículas en pantalla
}

// Contador de partículas activas
let activeParticles = 0;

function createSnowflake() {
    // Limitar número máximo de partículas
    if (activeParticles >= particleConfig.maxParticles) return;
    
    activeParticles++;
    
    // Crear elemento
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Seleccionar características aleatorias
    const symbol = particleConfig.symbols[Math.floor(Math.random() * particleConfig.symbols.length)];
    const color = particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)];
    const size = Math.random() * (particleConfig.maxSize - particleConfig.minSize) + particleConfig.minSize;
    const duration = Math.random() * (particleConfig.maxDuration - particleConfig.minDuration) + particleConfig.minDuration;
    const opacity = Math.random() * 0.4 + 0.6;
    const horizontalDuration = Math.random() * 3 + 2;
    
    // Aplicar características
    snowflake.textContent = symbol;
    snowflake.style.fontSize = size + 'px';
    snowflake.style.color = color;
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.opacity = opacity;
    snowflake.style.textShadow = `0 0 ${size/4}px ${color}`;
    snowflake.style.animation = `fall ${duration}s linear infinite, sideWays ${horizontalDuration}s ease-in-out infinite alternate`;
    
    // Añadir al DOM
    document.body.appendChild(snowflake);
    
    // Eliminar después de un tiempo para liberar memoria
    setTimeout(() => {
        snowflake.remove();
        activeParticles--;
    }, duration * 1000);
}

// Crear las reglas de animación
document.styleSheets[0].insertRule(`
    @keyframes fall {
        0% { top: -50px; }
        100% { top: 100vh; }
    }
`, document.styleSheets[0].cssRules.length);

document.styleSheets[0].insertRule(`
    @keyframes sideWays {
        0% { transform: translateX(-5px) rotate(-10deg); }
        50% { transform: translateX(10px) rotate(10deg); }
        100% { transform: translateX(-5px) rotate(-10deg); }
    }
`, document.styleSheets[0].cssRules.length);

// Función para ajustar la generación de partículas según el tamaño de la pantalla
function adjustParticleDensity() {
    const screenWidth = window.innerWidth;
    // Ajustar densidad basado en tamaño de pantalla
    const density = screenWidth < 768 ? particleConfig.density * 1.5 : particleConfig.density;
    
    // Limpiar intervalos anteriores si existen
    if (window.particleInterval) {
        clearInterval(window.particleInterval);
    }
    
    // Crear nuevo intervalo
    window.particleInterval = setInterval(createSnowflake, density);
}

// Iniciar la generación de partículas y ajustar cuando cambie el tamaño de la ventana
window.addEventListener('load', () => {
    adjustParticleDensity();
    // Generar unas cuantas al inicio
    for (let i = 0; i < 10; i++) {
        setTimeout(createSnowflake, i * 100);
    }
});

window.addEventListener('resize', adjustParticleDensity);