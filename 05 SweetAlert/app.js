function showWelcome() {
    Swal.fire({
        title: '¡Bienvenido a Piedra, Papel o Tijera!',
        text: '¿Quieres jugar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '¡Sí!',
        cancelButtonText: 'No, gracias'
    })
        .then((result) => {
            if (result.isConfirmed) {
                getUserChoice();
            }
            else {
                Swal.fire({
                    title: 'Juego cancelado',
                    text: 'Hasta la próxima!',
                    icon: 'info',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
}

function getUserChoice() {
    Swal.fire({
        toast: true,
        title: 'Elige tu jugada',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '<div class="choice">🪨</div>',
        denyButtonText: '<div class="choice">📜</div>',
        cancelButtonText: '<div class="choice">✂️</div>',
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // El usuario ha seleccionado "Piedra"
            playGame('rock');
        } else if (result.isDenied) {
            // El usuario ha seleccionado "Papel"
            playGame('paper');
        } else {
            // El usuario ha seleccionado "Tijera"
            playGame('scissors');
        }
    });
}

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    if (userChoice === computerChoice) {
        result = 'Empate';
    } else if ((userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')) {
        result = 'Ganaste';
    } else {
        result = 'Perdiste';
    }

    Swal.fire({
        title: `Elegiste ${ convertToWord(userChoice) }\ncomputadora eligió ${ convertToWord(computerChoice) }`,
        text: result,
        icon: result === 'Empate' ? 'info' : result === 'Ganaste' ? 'success' : 'error',
        confirmButtonText: 'Jugar de nuevo',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
            showWelcome();
        }
    });
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function convertToWord(choice) {
    if (choice === 'rock') return '<div class="choice">🪨</div>';
    if (choice === 'paper') return '<div class="choice">📜</div>';
    if (choice === 'scissors') return '<div class="choice">✂️</div>';
}





document.addEventListener('DOMContentLoaded', function() {
    showWelcome();
});
