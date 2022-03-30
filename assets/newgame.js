// POST
async function createNewGame() {
  let game = {
    nome: "",
    urlDemonstracao: "",
    urlAcesso: "",
    urlImagem: "",
  };

  game.nome = document.getElementById("new-game-name").value;
  game.urlDemonstracao = document.getElementById("new-game-demoURL").value;
  game.urlAcesso = document.getElementById("new-game-accessURL").value;
  game.urlImagem = document.getElementById("new-game-imgURL").value;


  const rawResponse = await fetch("https://a2tech-api.herokuapp.com/api/a2tech/game", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
  
  if (rawResponse.status == 201) {
      document.getElementsByClassName("container-info")[0].innerHTML = `
      <h3 class="title">Jogo ${game.nome} cadastrado!</h3>
      <p id="add-another-game" onclick="location.reload()">CADASTRAR OUTRO JOGO</p>
      `
  }
}
