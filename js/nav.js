document.addEventListener("DOMContentLoaded", function(){
	const sidebar = document.querySelectorAll('.sidenav')
	M.Sidenav.init(sidebar)

	let page = window.location.hash.substr(1)
	if (page == "") {
		page = "match"
	}

	loadPage(page)

	function loadPage(page){
		let content = document.querySelector("#content")
		fetch("/pages/" + page + ".html")
		.then((res) => {

			if (page === "match") {
				getMatches()
			}else if(page === "fav-match"){
				getSavedMatches()	
			}

			if (res.status == 200) {
				return res.text();
			}else if(res.status == 404){
				return "<h2>Opps.. halaman tidak ditemukan</h2>"
			}else if (res.status == 500) {
				return "<h2>Opps.. sepertinya ada masalah</h2>"
			}
		})
		.then((text) => {
			content.innerHTML = text
		})
	}

	//saat diklik ganti halaman
	document.querySelectorAll(".sidenav a, .topnav a").forEach((element) => {
		element.addEventListener("click", (event) => {
			//tutup sidenav
			let sidenav = document.querySelector(".sidenav")
			M.Sidenav.getInstance(sidenav).close()

			page = event.target.getAttribute("href").substr(1)
			loadPage(page)
		})
	})
})