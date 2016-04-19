(function(){

	function createArticle(elem, container, cat, bottext) {
		var article = document.createElement("article"),
			imgbase = document.createElement("div"),
			img = document.createElement("img"),
			imgbottom = document.createElement("div"),
			h1 = document.createElement("h1"),
			p = document.createElement("p"),
			link = document.createElement("a");
		imgbase.classList.add("artimg");
		img.src = "images/"+elem.Image;
		imgbase.appendChild(img);
	
	
		if (img.width/img.height < 1.48) {
			//console.log(img.height + " - " + img.width);
			img.classList.add("port");
		} else {
			img.classList.add("land");
		}
		console.log(img.width/img.height);

		if (bottext) {
			imgbottom.style.backgroundColor = cat[elem.Category-1].Color;
			imgbottom.classList.add("cat-"+elem.Category);
			imgbottom.classList.add("bottomtext");
			imgbottom.innerHTML = cat[elem.Category-1].Title;
			imgbase.appendChild(imgbottom);			
		}	
		article.appendChild(imgbase);
		
		h1.innerHTML = elem.Title;
		p.innerHTML = elem.Intro.split(".")[0] + ".";

		link.href = "";
		link.innerHTML = "Se video";
		link.classList.add("videolink");

		article.appendChild(h1);
		article.appendChild(p);
		article.appendChild(link);
		
		container.appendChild(article);
		return article;
	};

	function init() {
		var search = document.getElementById("search"),
			art, // for simpler access
			cat, // for simpler access
			searchresults,
			results = document.getElementById("results");
	
		search.addEventListener("keyup", function(){
			searchresults = [];
			var re = new RegExp(".*"+search.value+".*", 'i')
			results.innerHTML = "";
			results.style.display = "block";
			for (var i = 0; i < art.length && searchresults.length < 6; i++) {
				if (art[i].Title.match(re) ) {
					searchresults.push(art[i]);
					results.innerHTML += "<li>"+art[i].Title + "</li>";
				}
			}
		});

		search.addEventListener("blur", function() {
			results.style.display = "none";
		});

	
		var httpRequest = new XMLHttpRequest();
		
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
		       	var data = JSON.parse(httpRequest.responseText),
		       		head = document.getElementById("categories"),
		       		b = document.getElementById("news"),
		       		bil = document.getElementById("bil"),
		       		bol = document.getElementById("bol"),
		       		cat1count = 0,
		       		cat2count = 0;
		       	art = data.Articles;
		       	cat = data.Categories;


		       	for (var i = 0; i < cat.length; i++) {
		       		var div = document.createElement("div"),
		       			a = document.createElement("a");
		       		a.innerHTML = cat[i].Title;
		       		a.href = "";
		       		a.style.borderColor = cat[i].Color;
		       		div.classList.add("category");
		       		div.style.width = "calc(100% / " + cat.length + ")";
		       		div.appendChild(a);
		       		head.appendChild(div);

		       		console.log(cat[i]);
		       	}


		       	art.sort(function(a,b){
		       		return b.Date - a.Date;
		       	});
		        	
		       	for (var i = 0; i < 6; i++) {
		       		createArticle(art[i], b, cat, true);
		       	}
		       	// it is still sorted by date, so newest first
		       	for (var i = 0; i < art.length; i++) {
					if ((art[i].Category == 1 && cat1count++ < 4) || (art[i].Category == 2 && cat2count++ < 4)) {
						createArticle(art[i], art[i].Category == 1 ? bil : bol, cat, false).classList.add("category-article");
			       		console.log(art[i]);
					}
		       	}


		       	art.sort(function(a,b){
		       		return b.Views - a.Views;
		       	});
		       	b = document.getElementById("mostread");
				for (var i = 0; i < 5; i++) {
		       		createArticle(art[i], b, cat, true).classList.add("aside-article");
		       	}		        	
		    


		    }
		}
		httpRequest.open('GET', "hvordan.json")
		httpRequest.send()


	}
	
	document.addEventListener('DOMContentLoaded', init);


})();
