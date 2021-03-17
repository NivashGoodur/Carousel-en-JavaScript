/**
 * CAROUSEL
 */

// Tableau contenant tous les images du carousel
let images = ["images/img01.jpg", "images/img02.jpg", "images/img03.jpg", "images/img04.jpg", "images/img05.jpg"];

// Pointeur correspondant à l'image en cours
let pointeur = 0;

// Contiendra le minuteur (setInterval())
let timer;


// Attends que le DOM soit chargé
window.onload = function() {

    // Récupérer éléments du DOM
    // -----------------------------------
    let slide = document.querySelector("#slide");
    let flecheDroite = document.querySelector("#avancer");
    let flecheGauche = document.querySelector("#reculer");
    let bullets = document.querySelector("#bullets");


    // Insertion des indicateurs d'images
    // -----------------------------------
    images.forEach((image, index) => {
        bullets.innerHTML += `<div data-index="${index}" class="rounded-circle border border-secondary mr-1" style="height: 15px; width: 15px"></div>`;
    });

    // Récupération de toutes les DIV contenus dans la DIV ayant l'ID "bullets"
    let indicators = bullets.querySelectorAll("div");
    // console.log(indicators);

    // Applique un écouteur d'évènement sur chaque DIV récupérées
    indicators.forEach((indicator) => {
        indicator.addEventListener("click", indicatorChangeImage);

    });


    // Écouteurs d'évènements
    // -----------------------------------

    // Start/Stop carousel
    slide.addEventListener("mouseover", stopCarousel);
    slide.addEventListener("mouseout", startCarousel);

    // Flèche de droite
    flecheDroite.addEventListener("click", avancer);
    flecheDroite.addEventListener("mouseover", stopCarousel);
    flecheDroite.addEventListener("mouseout", startCarousel);

    // Flèche de gauche
    flecheGauche.addEventListener("click", reculer);
    flecheGauche.addEventListener("mouseover", stopCarousel);
    flecheGauche.addEventListener("mouseout", startCarousel);

    
    // Fonctions
    // -----------------------------------

    // Lancement du carousel
    startCarousel();
}

// Stop le carousel
function stopCarousel()
{
    // "Tue" le timer
    clearInterval(timer);
}

// Démarre le carousel
function startCarousel()
{
    // setInterval() appelle une fonction toutes les XX secondes
    // Attention ! Le temps à définir doit être en millisecondes !
    timer = setInterval(avancer, 2000);
}

// "Avance" dans le carousel
function avancer()
{
    // Vérifie si le pointeur est égal à l'index final de mon tableau d'images
    if (pointeur === images.length - 1) {
        // Si oui, je réinitialise mon pointeur à zéro, soit en début de tableau
        pointeur = 0;
    }
    else {
        // Sinon, j'incrémente de 1
        pointeur++;
    }

    // Modification de l'attribut "src" en ajoutant la valeur "prochaine" de notre tableau
    // "pointeur" correspond à un index du tableau "images"
    // document.querySelector("img").setAttribute("src", images[pointeur]);
    changeImage();
}

// "Recule" dans le carousel
function reculer()
{
    // Si je le pointeur est égal à zéro
    if (pointeur === 0) {
        // Alors on met à jour l'index du pointeur en lui donnant le dernier index du tableau
        pointeur = images.length - 1;
    }
    else {
        // Sinon, je décrémente de 1
        pointeur--;
    }

    // document.querySelector("img").setAttribute("src", images[pointeur]);
    changeImage();
}

// Modifie le type "src" de la balise "img" en sélectionnant une image dans le tableau selon la valeur du pointeur
function changeImage()
{
    document.querySelector("img").setAttribute("src", images[pointeur]);




}

// Change l'image du carousel selon le "rond" (indicateur/bullet) cliqué
function indicatorChangeImage()
{
    // Récupère la valeur contenu dans l'attribut "data-index" et on met à jour
    // le pointeur de notre slider
    // Préciser grâce à la fonction JS "Number()" que la valeur récupérer est bien un entier (integer) : Evite les bugs par la suite
    pointeur = Number(this.dataset.index);


    // Appelle la fonction "changeImage()" afin de modifier l'image en cours sur le carousel
    // document.querySelector("img").setAttribute("src", images[pointeur]);
    changeImage();

    if (this.dataset.index == pointeur){
        this.style.backgroundColor = "blue";
        indicators.style.backgroundColor = "red";
    }
}

