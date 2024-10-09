/*let container = document.querySelector('.container');
let btn =document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');

btn.onclick = function() {
    let score = 0;
    let time = 15;
    container.innerHTML = "";

    let interval = setInterval(function showTarget(){

        let target = document.createElement('img');
        target.id="target";
        target.src="https://img.pixers.pics/pho_wat(s3:700/FO/51/37/86/20/700_FO51378620_ec144ef60df3243529b54d67cb4b05b5.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/papiers-peints-dessin-anime-3d-mignon-monstre-vert.jpg.jpg";
        container.append(target);
        target.style.top = Math.random() * (500 - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (600 - target.offsetWidth) + 'px';

        let badTarget = document.createElement('img');
        badTarget.id = "bad-target";
        badTarget.src = "https://img.pixers.pics/pho_wat(s3:700/FO/40/24/20/43/700_FO40242043_f755ed92b5177f16cef5a432036845dd.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/stickers-monstre-rouge.jpg.jpg";
        badTarget.style.width = '50px';
        badTarget.style.height = '50px';
        container.append(badTarget);
        badTarget.style.position = 'absolute'; // Pour permettre le positionnement
        badTarget.style.top = Math.random() * (500 - badTarget.offsetHeight) + 'px';
        badTarget.style.left = Math.random() * (600 - badTarget.offsetWidth) + 'px';


        setTimeout(function() {
            target.remove();
            badTarget.remouve();
         }, 500)

            target.onclick = function(){
                score += 1;
                target.style.display = 'none'
            }

            badTarget.onclick = function() {
                score -= 1;
                badTarget.style.display = 'none';
            }

            time -= 1;

            scoreContainer.innerHTML = `Score : ${score}`
            timeContainer.innerHTML = `Temps : ${time}`

            if(time === 0){
                clearInterval(interval);
                container.innerHTML = "Game over"
            }
    }, 1000);
}*/


let container = document.querySelector('.container');
let btn = document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');
let score = 0;
let time = 15;
let level = 1;
let clicks = 0; // Compte le nombre de clics sur la bonne cible

btn.onclick = function() {
    score = 0;
    time = 15;
    clicks = 0; // Réinitialiser les clics
    container.innerHTML = "";

    let target, badTarget;

    let interval = setInterval(function showTarget() {
        // Vérifiez si le temps est écoulé
        if (time <= 0) {
            clearInterval(interval);
            container.innerHTML = "Game over";
            return; // Sortir de la fonction si le temps est écoulé
        }

        // Supprimer les cibles précédentes
        if (target) target.remove();
        if (badTarget) badTarget.remove();

        // Créer la cible "bonne"
        target = document.createElement('img');
        target.id = "target";
        target.src = "https://ih1.redbubble.net/image.4988706314.2939/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"; // Mettez une image valide ici
        target.style.width = '50px';
        target.style.height = '50px';
        target.style.position = 'absolute';
        target.style.top = Math.random() * (500 - 50) + 'px';
        target.style.left = Math.random() * (600 - 50) + 'px';
        container.append(target);
        moveTarget(target); // Déplacer la cible

        // Créer la cible "mauvaise"
        badTarget = document.createElement('img');
        badTarget.id = "bad-target";
        badTarget.src = "https://img.freepik.com/photos-premium/monstre-rouge-grands-yeux-grands-yeux_905510-12922.jpg"; // Mettez une image valide ici
        badTarget.style.width = '50px';
        badTarget.style.height = '50px';
        badTarget.style.position = 'absolute'; 
        badTarget.style.top = Math.random() * (500 - 50) + 'px';
        badTarget.style.left = Math.random() * (600 - 50) + 'px';
        container.append(badTarget);
        moveTarget(badTarget); // Déplacer la cible

        // Mettre à jour le temps
        time -= 1;
        scoreContainer.innerHTML = `Score : ${score}`;
        timeContainer.innerHTML = `Temps : ${time}`;

        // Vérifiez si le temps est écoulé après la mise à jour
        if (time <= 0) {
            clearInterval(interval);
            container.innerHTML = "Game over";
        }

    }, 1000);

    // Gestion du clic sur la bonne cible
    container.onclick = function(event) {
        if (event.target.id === "target") {
            score += 1; // Gagne 1 point
            //time += 5; // Diminuer 5 secondes en cliquant sur la bonne cible
            clicks++; // Incrémente le nombre de clics sur la bonne cible

            target.remove(); // Supprimer la cible cliquée
            if (clicks % 10 === 0) {
                createTimeBonus(); // Créer un power-up si 12 clics
            }
        } else if (event.target.id === "bad-target") {
            score -= 1; // Perdre un point
            time -= 5; // Perdre 5 secondes
            badTarget.remove(); // Supprimer la cible cliquée
        } else if (event.target.classList.contains('time-bonus')) {
            time += 10; // Gagne 10 secondes en cliquant sur le power-up
            score += 2;
            event.target.remove(); // Supprimer le power-up après le clic
        }

        // Vérifiez si le temps est écoulé après chaque clic
        if (time <= 0) {
            clearInterval(interval);
            container.innerHTML = "Game over";
        }
    };
};

// Fonction pour créer un power-up
function createTimeBonus() {
    let timeBonus = document.createElement('img');
    timeBonus.src = 'https://st.depositphotos.com/1787196/1330/i/950/depositphotos_13301967-stock-photo-furry-blue-monster.jpg'; // Image de votre power-up
    timeBonus.classList.add('time-bonus'); // Ajouter une classe pour identifier le power-up
    timeBonus.style.position = 'absolute';
    timeBonus.style.width = '50px'; // Ajustez la taille
    timeBonus.style.height = '50px'; // Ajustez la taille
    timeBonus.style.top = Math.random() * (500 - 50) + 'px'; // Position aléatoire
    timeBonus.style.left = Math.random() * (600 - 50) + 'px'; // Position aléatoire
    container.append(timeBonus);

    // Supprime le power-up après 10 secondes s'il n'a pas été cliqué
    setTimeout(() => {
        timeBonus.remove(); // Supprime après un certain temps si non cliqué
    }, 10000); // 10 secondes
}

// Fonction pour déplacer la cible
function moveTarget(target) {
    let moveInterval = setInterval(function() {
        target.style.top = Math.random() * (500 - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (600 - target.offsetWidth) + 'px';
    }, 1000); // Déplace toutes les secondes

    // Arrête le mouvement lorsque la cible est cliquée
    target.onclick = function() {
        clearInterval(moveInterval); // Arrête le déplacement
    };
}