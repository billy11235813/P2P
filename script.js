var cardsSrc = new Array(
					"Apfel1.jpg", 
					"Apfel2.jpg", 
					"Auto1.jpg", 
					"Auto2.jpg",
					"Bad1.jpg",
					"Bad2.jpg",
					"Bahn1.jpg",
					"Bahn2.jpg",
					"Ball1.jpg",
					"Ball2.jpg",
					"Baum1.jpg",
					"Baum2.jpg",
					"Bild1.jpg",
					"Bild2.jpg",
					"Blumen1.jpg",
					"Blumen2.jpg",
					"Brezen1.jpg",
					"Brezen2.jpg",
					"Bunt1.jpg",
					"Bunt2.jpg",
					"Camp1.jpg",
					"Camp2.jpg",
					"Code1.jpg",
					"Code2.jpg",
					"Dosen1.jpg",
					"Dosen2.jpg",
					"Faden1.jpg",
					"Faden2.jpg",
					"Farbe1.jpg",
					"Farbe2.jpg",
					"Fussball1.jpg",
					"Fussball2.jpg",
					"Gogh1.jpg",
					"Gogh2.jpg",
					"Kadinsky1.jpg",
					"Kadinsky2.jpg",
					"Kranz1.jpg",
					"Kranz2.jpg",
					"Kunst1.jpg",
					"Kunst2.jpg",
					"Leine1.jpg",
					"Leine2.jpg",
					"Mann1.jpg",
					"Mann2.jpg",
					"Muschel1.jpg",
					"Muschel2.jpg",
					"Musik1.jpg",
					"Musik2.jpg",
					"Nuss1.jpg",
					"Nuss2.jpg",
					"Pommes1.jpg",
					"Pommes2.jpg",
					"Quadrat1.jpg",
					"Quadrat2.jpg",
					"Sand1.jpg",
					"Sand2.jpg", 
					"Schrift1.jpg",
					"Schrift2.jpg",
					"Sterne1.jpg",
					"Sterne2.jpg",
					"Suppe1.jpg",
					"Suppe2.jpg",
					"Tanne1.jpg",
					"Tanne2.jpg", 
					"Uhr1.jpg",
					"Uhr2.jpg"
					);

var numberRows = 6;
var numberColumns = 11; 

// Here start the variables that don`t have to be changed 

var player1Active = true;
var player2Active = false; 
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var openCards = 0; 
var rowOpen1;
var columnOpen1;
var rowOpen2;
var columnOpen2;  
var FivePointsPlayer1 = 0;
var FivePointsPlayer2 = 0; 
var rowPointsPlayer1 = 1;
var rowPointsPlayer2 = 1; 


function creatingCards(){
	cards = new Array(numberRows)
	for (i=1;i<numberRows+1;i++) {
		cards[i]=new Array(numberColumns);
		for (j=1;j<numberColumns+1;j++) {
			var random = Math.floor(Math.random() * cardsSrc.length) 
			cards[i][j] = cardsSrc[random];
			cardsSrc.splice(random, 1); 
			console.log("i="+i+" j =" + j + " Karte=" + cards[i][j])
		}
	}	
}

function mixingCards(){
	creatingCards(); 
	for (a = 1; a <= numberRows; a++) {
		for (b = 1; b <= numberColumns; b++) {
			document.getElementById("card"+a+b).src = "R1.png"
		}
	}
}

function myFunction(row, column) {
 if(openCards>1 || (row === rowOpen1 && column === columnOpen1) || (row === rowOpen2 && column === columnOpen2) ){
	 
 }
 else{
	if(openCards==0){
		rowOpen1 = row;
		columnOpen1 = column;
	}
	if(openCards==1){
		rowOpen2 = row;
		columnOpen2 = column;
	}

 document.getElementById("card"+row+column).src = cards[row][column];
 openCards+=1; 
 if(openCards==2){
	 setTimeout(TurnCardsOver, 2500);
 }
 }
}

function TurnCardsOver () {
	if(cards[rowOpen1][columnOpen1].slice(0,-5) === cards[rowOpen2][columnOpen2].slice(0,-5)){
		cards[rowOpen1][columnOpen1] = "";
		cards[rowOpen2][columnOpen2] = "";
		document.getElementById("card"+rowOpen1+columnOpen1).style.visibility = "hidden"; 
		document.getElementById("card"+rowOpen2+columnOpen2).style.visibility = "hidden"; 
		document.getElementById("card"+rowOpen1+columnOpen1).onclick = false;
		document.getElementById("card"+rowOpen2+columnOpen2).onclick = false; 
		if(player1Active == true){
			scorePlayer1++;
			AdjustScorePlayer(1);
		}
		if(player2Active == true){
			scorePlayer2++;
			AdjustScorePlayer(2);
		}
	} 
	else{
		document.getElementById("card"+rowOpen1+columnOpen1).src = "R1.png";
		document.getElementById("card"+rowOpen2+columnOpen2).src = "R1.png";
		if(player1Active == true){
			document.getElementById("outerLayoutPlayer1").style.borderColor = "transparent"; 
			document.getElementById("outerLayoutPlayer2").style.borderColor = "rgb(212,175,55)"; 
		}
		else{
			document.getElementById("outerLayoutPlayer2").style.borderColor = "transparent"; 
			document.getElementById("outerLayoutPlayer1").style.borderColor = "rgb(212,175,55)"; 
		}
		player1Active = !player1Active;
		player2Active = !player2Active; 
		
		
	}

	rowOpen1 = "";
	columnOpen1 = "";
	rowOpen2 = "";
	columnOpen2 = "";
	openCards=0;
}

function AdjustScorePlayer(playerNr){
	if(playerNr==1){
		if(FivePointsPlayer1>0){
			rowPointsPlayer1 = 2; 
		}
		if(scorePlayer1>1){
			var parent = document.getElementById("pointCounter1"+rowPointsPlayer1);
			var child = document.getElementById("PtsPly1");
			parent.removeChild(child);
		}
		if(scorePlayer1==5){
			FivePointsPlayer1+=1; 
			var img1 = document.createElement("img"); 
			img1.setAttribute("src", scorePlayer1+"Pt.png");
			img1.style.marginLeft ="3.6px";
			img1.setAttribute("id","SavePoints"+FivePointsPlayer1); 
			document.getElementById("pointCounter1"+rowPointsPlayer1).appendChild(img1); 
			scorePlayer1 = 0; 
		}
		else{
			var img1 = document.createElement("img"); 
			img1.setAttribute("src", scorePlayer1+"Pt.png");
			img1.style.marginLeft ="3.6px";
			img1.setAttribute("id","PtsPly1"); 
			document.getElementById("pointCounter1"+rowPointsPlayer1).appendChild(img1); 
		}
	}
	if(playerNr==2){
		if(FivePointsPlayer2>0){
			rowPointsPlayer2 = 2; 
		}
		if(scorePlayer2>1){
			var parent = document.getElementById("pointCounter2"+rowPointsPlayer2);
			var child = document.getElementById("PtsPly2");
			parent.removeChild(child);
		}
		if(scorePlayer2==5){
			FivePointsPlayer2+=1; 
			var img2 = document.createElement("img"); 
			img2.setAttribute("src", scorePlayer2+"Pt.png");
			img2.style.marginLeft ="3.6px";
			img2.setAttribute("id","SavePoints"+FivePointsPlayer2); 
			document.getElementById("pointCounter2"+rowPointsPlayer2).appendChild(img2); 
			scorePlayer2 = 0; 
		}
		else{
			var img2 = document.createElement("img"); 
			img2.setAttribute("src", scorePlayer2+"Pt.png");
			img2.style.marginLeft ="3.6px";
			img2.setAttribute("id","PtsPly2"); 
			document.getElementById("pointCounter2"+rowPointsPlayer2).appendChild(img2); 
		}
	
	}
}

var input1 = document.getElementById("fname1");
var input2 = document.getElementById("fname2");
input1.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
	introducePlayer(1); 
  }
});
input2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
	introducePlayer(2); 
  }
});

function introducePlayer(nr){
	if(nr==1){
		document.getElementById("outerLayoutPlayer1").style.borderColor = "rgb(212,175,55)";
	}
	document.getElementById("player"+nr).style.backgroundImage = "url('Rahmen.png')"; 
	document.getElementById("player"+nr).style.backgroundRepeat = "no-repeat"; 
	document.getElementById("player"+nr).style.marginLeft = "21px"; 
	document.getElementById("player"+nr).style.marginTop = "21px"; 
	document.getElementById("pictureplayer"+nr).src = document.getElementById("fname"+nr).value+".jpg"; 
	document.getElementById("pictureplayer"+nr).style.display = "inline-block"; 
	console.log(document.getElementById("fname"+nr).value+".jpg");
	document.getElementById("fname"+nr).readOnly = true;
	document.getElementsByClassName("backgroundNametag")[nr-1].style.marginLeft = "30px"; 
	document.getElementsByClassName("backgroundNametag")[nr-1].style.marginTop = "30px"; 
}

$(document).ready(mixingCards);