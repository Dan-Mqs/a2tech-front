// GET

async function getData() {
  const data = await fetch("https://a2tech-api.herokuapp.com/api/a2tech/game")
    .then((response) => response.json())
    .then((data) => data);

  return data;
}

async function showData() {
  const data = await getData();
  const gamesQty = data.length;

  let bestGamesContent = "";
  let popularGamesContent = "";
  let allGamesContent = "";
  //let actionGamesContent = "";
  // let adventureGamesContent = "";

  // Game em destaque
  const highlightedGameIndex = Math.floor(Math.random() * gamesQty);
  const highlightedGame = data[highlightedGameIndex];
  document.getElementById("highlighted-img").src = highlightedGame.urlImagem;
  document.getElementById("highlighted-name").innerHTML = highlightedGame.nome;
  document.getElementById("play-button").href = highlightedGame.urlAcesso;

  let modalScript = `showModal(${highlightedGame.id})`;
  document.getElementById("reviews-btn").setAttribute("onclick", modalScript);

  // Preparando elementos do carrossel de games
  data.forEach((item) => {
    allGamesContent += `
        <div class="item" onclick="showModal(${item.id})">
            
                <img class="box-game" src="${item.urlImagem}" alt="${item.nome}">
            
        </div>`;

    bestGamesContent += `
        <div class="item" onclick="showModal(${item.id})">
            
                <img class="box-game" src="${item.urlImagem}" alt="${item.nome}">
            
        </div>`;

    popularGamesContent += `
        <div class="item" onclick="showModal(${item.id})">
            
                <img class="box-game" src="${item.urlImagem}" alt="${item.nome}">
            
        </div>`;
  });

  // Inserindo elementos nos carrosseis
  document.getElementById("games-best").innerHTML = bestGamesContent;
  document.getElementById("games-popular").innerHTML = popularGamesContent;
  document.getElementById("games-all").innerHTML = allGamesContent;

  // Inserindo scripts do carrossel
  while (Array.isArray(data)) {
    removePlaceholders();
    owlCallback();
    const owlSetup = setTimeout(owlSetupCallback, 500);
    break;
  }

 /// removePlaceholders();
 // owlCallback();
 // const owlSetup = setTimeout(owlSetupCallback, 1000);
}

function owlCallback() {
  var script = document.createElement("script");
  script.src = "assets/owl/owl.carousel.min.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}

function owlSetupCallback() {
  var script = document.createElement("script");
  script.src = "assets/owl/setup.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}

function removePlaceholders() {
  //Retirando placeholders
  let placeholders = document.getElementsByClassName("loading-placeholder");
  for (const item of placeholders) {
    item.style = "display: none;";
  }
}

// Modal manipulation
async function showModal(id) {
  const url = `https://a2tech-api.herokuapp.com/api/a2tech/game/${id}`;
  const game = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);

  document.getElementById("game-title").innerHTML = game.nome;
  document.getElementById("modal-play-button").href = game.urlAcesso;
  document.getElementById("modal-img").src = game.urlImagem;

  const demoUrlBase = "https://www.youtube.com/embed/";
  const demoUrl = demoUrlBase + game.urlDemonstracao.slice(-11);
  document.getElementById("demo-video").src = demoUrl;

  //Edit form
  document.getElementById("edit-game-name").value = game.nome;
  document.getElementById("edit-game-accessURL").value = game.urlAcesso;
  document.getElementById("edit-game-demoURL").value = game.urlDemonstracao;
  document.getElementById("edit-game-imgURL").value = game.urlImagem;

  let updateScript = `updateGame(${id})`;
  document
    .getElementById("edit-update-btn")
    .setAttribute("onclick", updateScript);

  let deleteScript = `deleteGame(${id})`;
  document
    .getElementById("delete-game-btn")
    .setAttribute("onclick", deleteScript);

  //Show modal
  document.getElementById("modal-game").style = "display: block;";
  document.getElementById("modal-bg").style = "display: block;";
}

function hideModal() {
  hideEditForm();
  hideDeleteWarning();
  document.getElementById("modal-game").style = "display: none;";
  document.getElementById("modal-bg").style = "display: none;";
}

// Edit game
function showEditForm() {
  hideDeleteWarning();
  document.getElementById("form-edit-container").style = "display: flex;";
}

function hideEditForm() {
  document.getElementById("form-edit-container").style = "display: none;";
}

// Edit game: PUT
async function updateGame(id) {
  let game = {
    nome: "",
    urlDemonstracao: "",
    urlAcesso: "",
    urlImagem: "",
  };

  let fetchURL = `https://a2tech-api.herokuapp.com/api/a2tech/game/${id}`;

  game.nome = document.getElementById("edit-game-name").value;
  game.urlAcesso = document.getElementById("edit-game-accessURL").value;
  game.urlDemonstracao = document.getElementById("edit-game-demoURL").value;
  game.urlImagem = document.getElementById("edit-game-imgURL").value;

  const rawResponse = await fetch(fetchURL, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

  if (rawResponse.status == 200) {
    showModal(id);
    hideEditForm();
  }
}

// Deleting game
function showDeleteWarning() {
  hideEditForm();
  document.getElementById("delete-warning-container").style = "display: flex;";
}

function hideDeleteWarning() {
  document.getElementById("delete-warning-container").style = "display: none;";
}

async function deleteGame(id) {
  let fetchURL = `https://a2tech-api.herokuapp.com/api/a2tech/game/${id}`;

  const rawResponse = await fetch(fetchURL, {
    method: "DELETE",
  });

  location.reload();
}

// Execute
showData();
