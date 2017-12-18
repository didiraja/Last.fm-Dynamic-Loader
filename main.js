function geraCard(srcImg, nomeArtista, rankArtista, playsArtista, urlArtista){
    
    /* declara os elementos que serão criados */
    var cardDiv = $("<div>").addClass("card");
    var cardImg = $("<img>").addClass("card-img-top").attr("src", srcImg).attr("alt", nomeArtista);
    var cardBody = $("<div>").addClass("card-body");
    var cardRank = $("<h1>").addClass("artist-rank").addClass("d-inline").text("#"+rankArtista);
    var cardName = $("<h4>").addClass("card-title").addClass("d-inline").text(nomeArtista);
    var cardPlays = $("<p>").addClass("card-text").text(playsArtista + " plays");
    var cardLink = $("<a>").attr("href", urlArtista).attr("target", "blank").addClass("btn btn-danger").text("Acesse a página do artista");

    /* agrupa a parte principal do conteúdo */
    var cardContent = cardBody.append(cardRank).append(cardName).append(cardPlays).append(cardLink);
    
    /* agrupa todos os elementos do card*/
    var cardComplete = cardDiv.append(cardImg).append(cardContent);
    
    /* cria efetivamente o card no elemento */
    $("#main").append(cardComplete);
    
};

$("#busca-api").click(function(){
    
    $("#erro-insuficiente").hide();
    
    $(".card").remove();
    
    var userProfile = $("#user-profile").val();
    
   $.get("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&period=7day&user=" + userProfile + "&api_key=e5faa330af20c2e07a1c6155c9a6e672&format=json", function(response){
        
        console.log(response);
       
        var artists = response.topartists.artist;
       
        if (artists.length > 6 ) {

           for (i = 0; i < 6; i++) { 

                geraCard(artists[i].image[4]["#text"], artists[i].name, artists[i]["@attr"].rank, artists[i].playcount, artists[i].url);

            };

        } else {

           $("#erro-insuficiente").slideDown();

        }
    
    
    }); 
    
});