// The root URL for the RESTful services
var rootURL = "http://localhost:8080/Bibiliotheque/webresources/Livre";

var deleteURL;
var currentBook;

var livre;

// retrouve la liste de tous les livres au demarrage 
findAll();  

$('#btnSearch').click(function() {
	search($('#searchKey').val());
	return false;
});

$('#btnAdd').click(function() {
    livre=formToJSON();
        //livre.titre=$('#Auteur').val();
       // livre.auteur=$('#Titre').val();
	AddLivre($('#AddLivre').val());
	
});

$('#bookList a').live('click', function() {
	findById($(this).data('identity'));
});


function AddLivre(){
    console.log(livre);
    $.ajax({
		type: 'POST',
		url: rootURL,
               // data:"{\"titre\" :\""+livre.titre+"\", \"auteur\" :\""+livre.auteur+"\"}",
	data:livre,
        contentType:"application/json",
        dataType: "json"
		
	});
}

function search(searchKey) {
	if (searchKey === '') 
		findAll();
	else
		findByIdentifiant(searchKey);
}
 
 
function findAll() {
	console.log(livre);
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", 
		success: renderList
	});
}

function findByIdentifiant(searchKey) {
	console.log('findByIdentifiant: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + searchKey,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data.titre);
			currentBook = data;
			renderDetails(currentBook);
		} });
}

function renderList(data) {
	
	$('#bookList li').remove();
	if(data!==null){
		if (data instanceof Array){
			for(key in data){
				var unLivre = data[key];
				$('#bookList').append('<li><a>'+unLivre.titre+' - '+unLivre.auteur+'</a></li>');
			}
		} 
		else {
			alert('on a un seul livre'); 
			$('#bookList').append('<li><a>'+bib.titre+' - '+bib.auteur+'</a></li>');
		}
	}
}

function renderDetails(book) {
	$('#bookList li').remove();
	$('#bookList').append('<li><a>'+book.titre+' - '+book.auteur+'</a></li>');
}

function formToJSON() {
	return JSON.stringify({
		"titre": $('#titre').val(), 
		"auteur": $('#auteur').val()
		});
}

function livreToString() {
	return 'titre-'+$('#titre').val()+'/auteur-'+$('#auteur').val();  
}
