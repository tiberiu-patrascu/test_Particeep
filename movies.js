window.addEventListener("DOMContentLoaded", function () {
  const movies = [{
      id: "1",
      title: "Oceans 8",
      category: "Comedy",
      likes: 4,
      dislikes: 1
    },
    {
      id: "2",
      title: "Midnight Sun",
      category: "Comedy",
      likes: 2,
      dislikes: 0
    },
    {
      id: "3",
      title: "Les indestructibles 2",
      category: "Animation",
      likes: 3,
      dislikes: 1
    },
    {
      id: "4",
      title: "Sans un bruit",
      category: "Thriller",
      likes: 6,
      dislikes: 6
    },
    {
      id: "5",
      title: "Creed II",
      category: "Drame",
      likes: 16,
      dislikes: 2
    },
    {
      id: "6",
      title: "Pulp Fiction",
      category: "Thriller",
      likes: 11,
      dislikes: 3
    },
    {
      id: "7",
      title: "Pulp Fiction",
      category: "Thriller",
      likes: 12333,
      dislikes: 32
    },
    {
      id: "8",
      title: "Seven",
      category: "Thriller",
      likes: 2,
      dislikes: 1
    },
    {
      id: "9",
      title: "Inception",
      category: "Thriller",
      likes: 2,
      dislikes: 1
    },
    {
      id: "10",
      title: "Gone Girl",
      category: "Thriller",
      likes: 22,
      dislikes: 12
    }
  ];

  //export const movies$ = new Promise((resolve, reject) => setTimeout(resolve, 100, movies))


  const categories = [];

  /**
   * Recuperation elements dans le tableau
   */
  for (let i = 0; i < movies.length; i++) {
    var element = movies[i].category;

    var verification = categories.find(item => item === element);
    if (verification == undefined) {
      categories.push(element);
    }
  }

  /**
   * Creation dynamiquement les li a
   */
  for (let i = 0; i < categories.length; i++) {
    var menu = document.querySelector(".menu");

    var createLi = document.createElement("li");
    menu.appendChild(createLi);

    var createA = document.createElement("a");
    createA.setAttribute("href", "#");
    createA.dataset.categories = categories[i];
    createA.className = "trier_films";
    createA.innerText = categories[i];
    createLi.appendChild(createA);
  }


  function creationBtnPagination() {
    let list_films = document.querySelector(".main");

    let btnSuivant = document.createElement("p");
    btnSuivant.className = "btnSuivant";
    btnSuivant.innerText = ">";
    list_films.appendChild(btnSuivant);

    let btnPrecedent = document.createElement("p");
    btnPrecedent.className = "btnPrecedent";
    btnPrecedent.innerText = "<";
    list_films.appendChild(btnPrecedent);

  }

  /**function pour creation des element dans la page */
  function creationElements(obj) {
    var list_films = document.querySelector(".list_films");

    //creation d'article pour notre carte
    let article = document.createElement("article");
    article.id = obj.id;
    article.dataset.id = "id";
    article.className = "carte";
    list_films.appendChild(article);

    //creation de titre
    let title = document.createElement("h2");
    title.className = "title";
    title.innerText = obj.title;
    title.style = "font-weight:bold; text-align:center;";
    article.appendChild(title);

    //creation de image pour chaque film
    let img_film = document.createElement("img");
    img_film.className = "img_film";
    img_film.style = "background-image:url('images/" + obj.id + ".jpg');";
    article.appendChild(img_film);

    //creation block pour nos buttons
    let div_btn = document.createElement("div");
    div_btn.className = "div_btn";
    article.appendChild(div_btn);

    let like = document.createElement("img");
    like.className = "like";
    like.setAttribute("src", "images/like.png");
    div_btn.appendChild(like);

    let dislike = document.createElement("img");
    dislike.className = "dislike";
    dislike.setAttribute("src", "images/dislike.png");
    div_btn.appendChild(dislike);

    let jauge_div = document.createElement("div");
    jauge_div.className = "jauge_div";
    div_btn.appendChild(jauge_div);
    var percent = 0;
    percent = Math.floor((100 / (obj.likes + obj.dislikes)) * obj.likes);

    //creation div pour notre jauge type youtube
    let jauge_progres = document.createElement("div");
    jauge_progres.className = "jauge_progres";
    jauge_progres.style = "width:" + percent + "%";
    jauge_div.appendChild(jauge_progres);

    let para_jauge = document.createElement("p");
    para_jauge.className = "para_jauge";
    para_jauge.innerText = obj.likes + " / " + obj.dislikes;
    jauge_div.appendChild(para_jauge);

    /**creation button delete */
    delete_btn = document.createElement("a");
    delete_btn.classList.add("btn", "delete_btn");
    delete_btn.setAttribute("href", "#");
    delete_btn.innerText = "Delete";
    article.appendChild(delete_btn);

    delete_btn.addEventListener("click", function () {
      article.remove();
    });

    /**
     * evenement sur image like
     * si on clique on increment notre atribut avec 1
     * */
    like.addEventListener("click", function () {
      obj.likes = obj.likes + 1;
      percent = Math.floor((100 / (obj.likes + obj.dislikes)) * obj.likes);
      jauge_progres.style = "width:" + percent + "%";
      para_jauge.innerText = obj.likes + " / " + obj.dislikes;
    });

    /**
     * evenement sur notre image dislike
     * si on clique on increment avec 1
     * */
    dislike.addEventListener("click", function () {
      obj.dislikes += 1;
      percent = Math.floor((100 / (obj.likes + obj.dislikes)) * obj.likes);
      jauge_progres.style = "width:" + percent + "%";
      para_jauge.innerText = obj.likes + " / " + obj.dislikes;
    });
  }

  /**
   * Afficher tous les films
   */
  var affiche_film = document.querySelector(".affiche_films");
  affiche_film.addEventListener("click", function () {
    document.querySelector("#films").innerHTML = "";

    //chercher les element dans le tableaux
    for (const movie in movies) {
      let obj = movies[movie];
      creationElements(obj);
    }
  });

  /**
   * Trier les films par categories
   */
  var trier_films = document.querySelectorAll(".trier_films");
  for (var m of trier_films) {
    m.addEventListener("click", function () {
      document.querySelector("#films").innerHTML = "";

      for (const movie in movies) {
        let obj = movies[movie];

        if (obj.category == this.dataset.categories) {
          creationElements(obj);
        }
      }
    });
  }

  /**
   * affiche les films par le critère choisi
   */
  var affiche_films_trie = document.querySelectorAll(".nombre");
  for (var element of affiche_films_trie) {

    var buttonsExists = false;

    element.addEventListener("click", function () {
      document.querySelector("#films").innerHTML = "";
      if (buttonsExists == false) {
        creationBtnPagination();
        buttonsExists = true;
      }

      var currentPage = 0;
      var moviesNumber = movies.length;
      var maxNrOfPages = Math.floor(moviesNumber / this.dataset.nombre);
      var datasetNombre = this.dataset.nombre;

      for (let i = currentPage * datasetNombre; i < (currentPage + 1) * datasetNombre; i++) {
        creationElements(movies[i]);
      }

      //on lie l'evenement à notre button pour pouvoir passer la page
      let suivant = document.querySelector(".btnSuivant");
      suivant.addEventListener("click", function () {
        currentPage = currentPage + 1;

        /** 
         * on vérifie : si la page courante est supérieure au nombre maximum de pages
         * on reste sur la même page
         * si non on crée une nouvelle page avec les éléments restantes
         *  */
        if (currentPage > maxNrOfPages) {
          currentPage = maxNrOfPages;
        }
        /**
         * on réinitialiser la page à 0
         */
        document.querySelector("#films").innerHTML = "";
        for (let i = currentPage * datasetNombre; i < (currentPage + 1) * datasetNombre; i++) {
          creationElements(movies[i]);
        }
      });

      let prev = document.querySelector(".btnPrecedent");
      prev.addEventListener("click", function () {
        currentPage = currentPage - 1;

        /**
         * si la page courente est inferrieur à 0 on reste sur la meme page 
         * si non on crée une nouvelle page avec les éléments restants
         */
        if (currentPage < 0) {
          currentPage = 0;
        }

        document.querySelector("#films").innerHTML = "";
        for (let i = currentPage * datasetNombre; i < (currentPage + 1) * datasetNombre; i++) {
          var obj = movies[i];
          creationElements(obj);
        }
      });


    });
  }
});