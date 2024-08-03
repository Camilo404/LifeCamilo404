function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '•';
    snowflake.style.fontSize = Math.random() * 24 + 10 + 'px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animation = `fall ${Math.random() * 10 + 10}s linear infinite, sideWays ${Math.random() * 2 + 1}s ease-in-out infinite`;

    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, Math.random() * 6000 + 6000);
}

document.styleSheets[0].insertRule('@keyframes fall { 0% { top: -50px; } 100% { top: 100vh; } }', document.styleSheets[0].cssRules.length);
document.styleSheets[0].insertRule('@keyframes sideWays { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(20px); } }', document.styleSheets[0].cssRules.length);

setInterval(createSnowflake, 200);