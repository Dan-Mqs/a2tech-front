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

  // Preparando elementos do carrosel de games
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

 
  // Inserindo elementos nos carroseis
  document.getElementById("games-best").innerHTML = bestGamesContent;
  document.getElementById("games-popular").innerHTML = popularGamesContent;
  document.getElementById("games-all").innerHTML = allGamesContent;
}

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

  document.getElementById("modal-game").style = "display: block;";
  document.getElementById("modal-bg").style = "display: block;";
}

function hideModal() {
  document.getElementById("modal-game").style = "display: none;";
  document.getElementById("modal-bg").style = "display: none;";
}

showData();
