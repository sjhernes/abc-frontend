(function(){

	// Creates all articles

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
		img.alt = elem.Title;
	
	
		if (img.width/img.height < 1.48) {
			img.classList.add("port");
		} else {
			img.classList.add("land");
		}

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
	

		// searchfunction

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


		// Get json data and fill the html

	
		var httpRequest = new XMLHttpRequest();
		
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
		       	var data = JSON.parse(httpRequest.responseText),
		       		head = document.getElementById("categories"),
		       		b = document.getElementById("news"),
		       		curcatelem,
		       		curcat = null,
		       		count = 0;
		       	art = data.Articles;
		       	cat = data.Categories;

		       	// set up categories in header

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

		       	}


		       	// sort newest first
		       	art.sort(function(a,b){
		       		return b.Date - a.Date;
		       	});
		        	
		       	for (var i = 0; i < 6; i++) {
		       		createArticle(art[i], b, cat, true);
		       	}

		       	// sort newest first into categories
		       	art.sort(function(a,b){
		       		return a.Category - b.Category;
		       	});


		       	// creates the newst first based on category
		       	for (var i = 0; i < art.length; i++) {
		       		if (curcat != art[i].Category) {
		       			curcat = art[i].Category;
		       			var section = document.createElement("section"),
		       				header = document.createElement("header"),
		       				curcatelem = document.createElement("div");

		       			section.classList.add("clearfix");
		       			section.classList.add("category");
		       			header.classList.add("cat-"+curcat);
		       			header.classList.add("cathead");

		       			header.style.borderBottom = "1px solid "+cat[curcat-1].Color;
		       			header.innerHTML = cat[curcat-1].Title.toUpperCase() + "<span class='mer'>mer</span>";

		       			curcatelem.classList.add("clearfix");
		       			curcatelem.classList.add("catspool");

		       			section.appendChild(header);
		       			section.appendChild(curcatelem);

		       			document.getElementById("page").appendChild(section);
		       		}
					if (curcatelem.children.length < 4) {
						createArticle(art[i], curcatelem, cat, false).classList.add("category-article");
					}
		       	}

		       	// sorts to most viewed
		       	art.sort(function(a,b){
		       		return b.Views - a.Views;
		       	});

		       	// fills out the most viewed sidebar
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
