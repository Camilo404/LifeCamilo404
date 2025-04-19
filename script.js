document.addEventListener('copy', function (e) {
    e.preventDefault();
    e.clipboardData.setData('text', 'Nope');
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

class TextTyper {
    constructor(element) {
        // Obtener el elemento y sus atributos
        this.element = element;
        this.words = this.element.getAttribute("words").split(',');
        this.typingSpeed = parseInt(this.element.getAttribute('typing-speed')) || 70;
        this.typingDelay = parseInt(this.element.getAttribute('typing-delay')) || 700;
        this.erasingSpeed = this.typingSpeed / 2;
        
        // Estado inicial
        this.currentWordIndex = 0;
        this.currentCharacterIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        
        // Iniciar la animación
        this.element.innerHTML = '';
        this.type();
    }
    
    type() {
        // Obtener la palabra actual
        const wordIndex = this.currentWordIndex % this.words.length;
        const fullWord = this.words[wordIndex];
        
        // Determinar texto actual basado en si está escribiendo o borrando
        let text;
        if (this.isDeleting) {
            text = fullWord.substring(0, this.currentCharacterIndex);
        } else {
            text = fullWord.substring(0, this.currentCharacterIndex);
        }
        
        // Actualizar el texto en el DOM
        this.element.textContent = text;
        
        // Velocidad variable para efecto más natural
        let typeSpeed = this.isDeleting ? this.erasingSpeed : this.typingSpeed;
        
        // Agregar variación aleatoria sutil a la velocidad de escritura
        typeSpeed = Math.max(typeSpeed * (0.9 + Math.random() * 0.2), 30);
        
        // Lógica para continuar escribiendo, borrar, o cambiar palabra
        if (!this.isDeleting && this.currentCharacterIndex === fullWord.length) {
            // Palabra completa, esperar antes de borrar
            typeSpeed = this.typingDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharacterIndex === 0) {
            // Palabra borrada, pasar a la siguiente
            this.isDeleting = false;
            this.currentWordIndex++;
            typeSpeed = 500; // Pequeña pausa antes de la siguiente palabra
        }
        
        // Incrementar o decrementar el índice del caracter
        if (this.isDeleting) {
            this.currentCharacterIndex--;
        } else {
            this.currentCharacterIndex++;
        }
        
        // Continuar la animación
        setTimeout(() => this.type(), typeSpeed);
    }
}

window.onload = function() {
    const typer = document.querySelector("span[words]");
    if (typer) {
        new TextTyper(typer);
    }
};