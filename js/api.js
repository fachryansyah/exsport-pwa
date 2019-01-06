const BASE_URL = "http://api.football-data.org/v2/"
const API_KEY = "cac28286c4aa49d6ab08504fb4d10aa0"

function status(res) {
	if (res.status !== 200) {
		console.log("Error : ", res.status)

		return Promise.reject(new Error(res.statusText))
	}else{
		return Promise.resolve(res)
	}
}

function json(res) {
	return res.json()
}

function error(error) {
	console.log("Error : " + error)
}

function getMatches() {
	let request = new Request(BASE_URL + "matches", {
		method: "get",
		mode: "cors",
		headers: new Headers({
			"X-Auth-Token" : API_KEY
		})
	})

	if ('caches' in window) {
		caches.match(BASE_URL + "matches").then(function(response){
			if (response) {
				response.json().then(function (data){
					var matchesHTML = ""
					console.log(data)
					data.matches.forEach(function(match){
						matchesHTML += `
							<div class="col s12 m6">
								<div class="card">
									<div class="card-content gray-text">
										<span class="card-title">Primeira Liga</span>
										<div class="row">
											<div class="col s5 center-align">
												<h6 class="green-text">Away Team</h6>
												<img id="imgMatchAwayTeam-${match.awayTeam.id}" src="img/no-image.png" alt="${match.awayTeam.name}" class="circle responsive-img">
												<h6>${match.awayTeam.name}</h6>
												<p>
													Penalties : ${(match.score.penalties.homeTeam == null ? '0' : match.score.penalties.homeTeam)} <br>
												</p>
											</div>
											<div class="col s2 m2 center-align valign-wrapper">
												<h5>VS</h5>
											</div>
											<div class="col s5 center-align">
												<h6 class="orange-text">Home Team</h6>
												<img id="imgMatchHomeTeam-${match.homeTeam.id}" src="img/no-image.png" alt="${match.homeTeam.name}" class="circle responsive-img">
												<h6>${match.homeTeam.name}</h6>
												<p>
													Penalties : ${(match.score.penalties.homeTeam == null ? '0' : match.score.penalties.homeTeam)} <br>
												</p>
											</div>
										</div>
									</div>
									<ul class="collection">
										<li class="collection-item avatar">
											<i class="material-icons circle">date_range</i>
											<span class="title">Last update</span>
											<p>${match.lastUpdated}</p>
											<!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
										</li>
										<li class="collection-item avatar">
											<i class="material-icons circle green">insert_chart</i>
											<span class="title">Status</span>
											<p>${match.status}</p>
										</li>
										<li class="collection-item avatar">
											<i class="material-icons circle red">group</i>
											<span class="title">Group</span>
											<p>${match.group}</p>
										</li>
									</ul>
									<div class="card-action">
										<a href="./detail-match.html?id=${match.id}" class="waves-effect waves-teal btn-flat green-text">More..</a>
									</div>
								</div>
							</div>
						`
					})
					document.getElementById("matches").innerHTML = matchesHTML;
				})
			}
		})
	}

	fetch(request)
	.then(status)
	.then(json)
	.then((data) => {
		let matchesHTML = ""
		data.matches.forEach((match) => {

			matchesHTML += `
				<div class="col s12 m6">
					<div class="card">
						<div class="card-content gray-text">
							<span class="card-title">Primeira Liga</span>
							<div class="row">
								<div class="col s5 center-align">
									<h6 class="green-text">Away Team</h6>
									<img id="imgMatchAwayTeam-${match.awayTeam.id}" src="img/no-image.png" alt="${match.awayTeam.name}" class="circle responsive-img">
									<h6>${match.awayTeam.name}</h6>
									<p>
										Penalties : ${(match.score.penalties.homeTeam == null ? '0' : match.score.penalties.homeTeam)} <br>
									</p>
								</div>
								<div class="col s2 m2 center-align valign-wrapper">
									<h5>VS</h5>
								</div>
								<div class="col s5 center-align">
									<h6 class="orange-text">Home Team</h6>
									<img id="imgMatchHomeTeam-${match.homeTeam.id}" src="img/no-image.png" alt="${match.homeTeam.name}" class="circle responsive-img">
									<h6>${match.homeTeam.name}</h6>
									<p>
										Penalties : ${(match.score.penalties.homeTeam == null ? '0' : match.score.penalties.homeTeam)} <br>
									</p>
								</div>
							</div>
						</div>
						<ul class="collection">
							<li class="collection-item avatar">
								<i class="material-icons circle">date_range</i>
								<span class="title">Last update</span>
								<p>${match.lastUpdated}</p>
								<!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
							</li>
							<li class="collection-item avatar">
								<i class="material-icons circle green">insert_chart</i>
								<span class="title">Status</span>
								<p>${match.status}</p>
							</li>
							<li class="collection-item avatar">
								<i class="material-icons circle red">group</i>
								<span class="title">Group</span>
								<p>${match.group}</p>
							</li>
						</ul>
						<div class="card-action">
							<a href="./detail-match.html?id=${match.id}" class="waves-effect waves-teal btn-flat green-text">More..</a>
						</div>
					</div>
				</div>
			`
			// getAvatarAwayTeam(match.awayTeam.id)
			// getAvatarHomeTeam(match.homeTeam.id)
		})
		document.getElementById("matches").innerHTML = matchesHTML;
		
		console.log(data)
	})
}

function getMatchById(id) {
	let request = new Request(BASE_URL + 'matches/' + id, {
		method: "get",
		mode: "cors",
		headers: new Headers({
			"X-Auth-Token" : API_KEY
		})
	})

	return new Promise((resolve, reject) => {

		if ("caches" in window) {
	      caches.match(BASE_URL + "article/" + id).then(function(response) {
	        if (response) {
	          response.json().then(function(data) {
	          	let match = data.match
				let head2head = data.head2head
	            let matchHTML = `
					<h4 class="truncate">${match.competition.name}</h4>
					<div class="row" style="margin-top: 2rem">
						<div class="col s5 m6 center-align">
							<h6 class="green-text">Away Team</h6>
							<img id="imgMatchAwayTeam-${match.awayTeam.id}" src="img/no-image.png" alt="${match.awayTeam.name}" class="circle responsive-img">
							<h5 class="truncate">${match.awayTeam.name}</h5>
						</div>
						<div class="col s2 m2 center-align">
							<h5>VS</h5>
						</div>
						<div class="col s5 m6 center-align">
							<h6 class="orange-text">Home Team</h6>
							<img id="imgMatchHomeTeam-${match.homeTeam.id}" src="img/no-image.png" alt="${match.homeTeam.name}" class="circle responsive-img">
							<h5 class="truncate">${match.homeTeam.name}</h5>
						</div>
					</div>

					<div class="row">
						<div class="col s12 m12">
							<div class="card">
								<div class="card-content dark-text">
									<span class="card-title">Head 2 head</span>
									<table class="striped centered">
										<thead>
											<tr>
												<th>#</th>
												<th>Away Team</th>
												<th>Home Team</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>WINS</td>
												<td>${(head2head != null ? head2head.awayTeam.wins : '0')}</td>
												<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
											</tr>
											<tr>
												<td>DRAWS</td>
												<td>${(head2head != null ? head2head.awayTeam.draws : '0')}</td>
												<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
											</tr>
											<tr>
												<td>LOSS</td>
												<td>${(head2head != null ? head2head.awayTeam.losses : '0')}</td>
												<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
											</tr>
											<tr>
												<td>TOTAL GOALS</td>
												<td colspan="2">${(head2head != null ? head2head.totalGoals : '0')}</td>
											</tr>
											<tr>
												<td>NUM OF MATCH</td>
												<td colspan="2">${(head2head != null ? head2head.numberOfMatches : '0')}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<!-- <div class="card-action">
									<a href="#">This is a link</a>
									<a href="#">This is a link</a>
								</div> -->
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col s12 m12">
							<div class="card">
								<div class="card-content dark-text">
									<span class="card-title">Match</span>
									<ul class="collection">
										<li class="collection-item avatar">
											<i class="material-icons circle">date_range</i>
											<span class="title">Last update</span>
											<p>${match.lastUpdated}</p>
											<!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
										</li>
										<li class="collection-item avatar">
											<i class="material-icons circle green">insert_chart</i>
											<span class="title">Status</span>
											<p>${match.status}</p>
										</li>
										<li class="collection-item avatar">
											<i class="material-icons circle red">group</i>
											<span class="title">Group</span>
											<p>${match.group}</p>
										</li>
										<li class="collection-item avatar">
											<i class="material-icons circle orange">today</i>
											<span class="title">Match day</span>
											<p>${match.group}</p>
										</li>
										<li class="collection-item avatar">
											<i class="material-icons circle blue">location_on</i>
											<span class="title">Venue</span>
											<p>${match.group}</p>
										</li>
										<li class="collection-item avatar">
											<i class="material-icons circle yellow">nature</i>
											<span class="title">Season</span>
											<p>${match.group}</p>
										</li>
									</ul>
								</div>
								<!-- <div class="card-action">
									<a href="#">This is a link</a>
									<a href="#">This is a link</a>
								</div> -->
							</div>
						</div>
					</div>
				`
	            
	            document.getElementById("match").innerHTML = articlesHTML;
	            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
	            resolve(data);
	          });
	        }
	      });
	    }

		fetch(request)
		.then(status)
		.then(json)
		.then((data) => {
			console.log(data)
			let match = data.match
			let head2head = data.head2head
			let matchHTML = `
				<h4 class="truncate">${match.competition.name}</h4>
				<div class="row" style="margin-top: 2rem">
					<div class="col s5 m6 center-align">
						<h6 class="green-text">Away Team</h6>
						<img id="imgMatchAwayTeam-${match.awayTeam.id}" src="img/no-image.png" alt="${match.awayTeam.name}" class="circle responsive-img">
						<h5 class="truncate">${match.awayTeam.name}</h5>
					</div>
					<div class="col s2 m2 center-align">
						<h5>VS</h5>
					</div>
					<div class="col s5 m6 center-align">
						<h6 class="orange-text">Home Team</h6>
						<img id="imgMatchHomeTeam-${match.homeTeam.id}" src="img/no-image.png" alt="${match.homeTeam.name}" class="circle responsive-img">
						<h5 class="truncate">${match.homeTeam.name}</h5>
					</div>
				</div>

				<div class="row">
					<div class="col s12 m12">
						<div class="card">
							<div class="card-content dark-text">
								<span class="card-title">Head 2 head</span>
								<table class="striped centered">
									<thead>
										<tr>
											<th>#</th>
											<th>Away Team</th>
											<th>Home Team</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>WINS</td>
											<td>${(head2head != null ? head2head.awayTeam.wins : '0')}</td>
											<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
										</tr>
										<tr>
											<td>DRAWS</td>
											<td>${(head2head != null ? head2head.awayTeam.draws : '0')}</td>
											<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
										</tr>
										<tr>
											<td>LOSS</td>
											<td>${(head2head != null ? head2head.awayTeam.losses : '0')}</td>
											<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
										</tr>
										<tr>
											<td>TOTAL GOALS</td>
											<td colspan="2">${(head2head != null ? head2head.totalGoals : '0')}</td>
										</tr>
										<tr>
											<td>NUM OF MATCH</td>
											<td colspan="2">${(head2head != null ? head2head.numberOfMatches : '0')}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<!-- <div class="card-action">
								<a href="#">This is a link</a>
								<a href="#">This is a link</a>
							</div> -->
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s12 m12">
						<div class="card">
							<div class="card-content dark-text">
								<span class="card-title">Match</span>
								<ul class="collection">
									<li class="collection-item avatar">
										<i class="material-icons circle">date_range</i>
										<span class="title">Last update</span>
										<p>${match.lastUpdated}</p>
										<!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
									</li>
									<li class="collection-item avatar">
										<i class="material-icons circle green">insert_chart</i>
										<span class="title">Status</span>
										<p>${match.status}</p>
									</li>
									<li class="collection-item avatar">
										<i class="material-icons circle red">group</i>
										<span class="title">Group</span>
										<p>${match.group}</p>
									</li>
									<li class="collection-item avatar">
										<i class="material-icons circle orange">today</i>
										<span class="title">Match day</span>
										<p>${match.group}</p>
									</li>
									<li class="collection-item avatar">
										<i class="material-icons circle blue">location_on</i>
										<span class="title">Venue</span>
										<p>${match.group}</p>
									</li>
									<li class="collection-item avatar">
										<i class="material-icons circle yellow">nature</i>
										<span class="title">Season</span>
										<p>${match.group}</p>
									</li>
								</ul>
							</div>
							<!-- <div class="card-action">
								<a href="#">This is a link</a>
								<a href="#">This is a link</a>
							</div> -->
						</div>
					</div>
				</div>
			`
			document.getElementById("match").innerHTML = matchHTML;
			resolve(data);
			getAvatarAwayTeam(match.awayTeam.id)
			getAvatarHomeTeam(match.homeTeam.id)
		})
	})
}

function getAvatarAwayTeam(id) {
	let request = new Request(BASE_URL + "teams/" + id, {
		method: "get",
		mode: "cors",
		headers: new Headers({
			"X-Auth-Token" : API_KEY
		})
	})

	fetch(request)
	.then(status)
	.then(json)
	.then((data) => {
		document.getElementById("imgMatchAwayTeam-"+id).src = data.crestUrl
	})
}

function getAvatarHomeTeam(id) {
	let request = new Request(BASE_URL + "teams/" + id, {
		method: "get",
		mode: "cors",
		headers: new Headers({
			"X-Auth-Token" : API_KEY
		})
	})

	fetch(request)
	.then(status)
	.then(json)
	.then((data) => {
		if (data.crestUrl) {
			document.getElementById("imgMatchHomeTeam-"+id).src = data.crestUrl
		}else{
			document.getElementById("imgMatchHomeTeam-"+id).src = "img/no-image.png"
		}
		
	})
}

function getSavedMatches() {
  getAll().then(function(matches) {
    console.log(matches);
    var matchesHTML = "";
    matches.forEach(function(match) {
    	matchesHTML += `
				<div class="col s12 m6">
					<div class="card">
						<div class="card-content gray-text">
							<span class="card-title">Primeira Liga</span>
							<div class="row">
								<div class="col s5 center-align">
									<h6 class="green-text">Away Team</h6>
									<img id="imgMatchAwayTeam-${match.awayTeam.id}" src="img/no-image.png" alt="${match.awayTeam.name}" class="circle responsive-img">
									<h6>${match.awayTeam.name}</h6>
									<p>
										Penalties : ${(match.score.penalties.homeTeam == null ? '0' : match.score.penalties.homeTeam)} <br>
									</p>
								</div>
								<div class="col s2 m2 center-align valign-wrapper">
									<h5>VS</h5>
								</div>
								<div class="col s5 center-align">
									<h6 class="orange-text">Home Team</h6>
									<img id="imgMatchHomeTeam-${match.homeTeam.id}" src="img/no-image.png" alt="${match.homeTeam.name}" class="circle responsive-img">
									<h6>${match.homeTeam.name}</h6>
									<p>
										Penalties : ${(match.score.penalties.homeTeam == null ? '0' : match.score.penalties.homeTeam)} <br>
									</p>
								</div>
							</div>
						</div>
						<ul class="collection">
							<li class="collection-item avatar">
								<i class="material-icons circle">date_range</i>
								<span class="title">Last update</span>
								<p>${match.lastUpdated}</p>
								<!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
							</li>
							<li class="collection-item avatar">
								<i class="material-icons circle green">insert_chart</i>
								<span class="title">Status</span>
								<p>${match.status}</p>
							</li>
							<li class="collection-item avatar">
								<i class="material-icons circle red">group</i>
								<span class="title">Group</span>
								<p>${match.group}</p>
							</li>
						</ul>
						<div class="card-action">
							<a href="./detail-match.html?id=${match.id}&saved=true" class="waves-effect waves-teal btn-flat green-text">More..</a>
						</div>
					</div>
				</div>
			`
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("matches").innerHTML = matchesHTML;
  });
}

function getSavedMatchById(id){

	getById(id).then(function(match) {
		
	    let matchHTML = `
			<h4 class="truncate">${match.competition.name}</h4>
			<div class="row" style="margin-top: 2rem">
				<div class="col s5 m6 center-align">
					<h6 class="green-text">Away Team</h6>
					<img id="imgMatchAwayTeam-${match.awayTeam.id}" src="img/no-image.png" alt="${match.awayTeam.name}" class="circle responsive-img">
					<h5 class="truncate">${match.awayTeam.name}</h5>
				</div>
				<div class="col s2 m2 center-align">
					<h5>VS</h5>
				</div>
				<div class="col s5 m6 center-align">
					<h6 class="orange-text">Home Team</h6>
					<img id="imgMatchHomeTeam-${match.homeTeam.id}" src="img/no-image.png" alt="${match.homeTeam.name}" class="circle responsive-img">
					<h5 class="truncate">${match.homeTeam.name}</h5>
				</div>
			</div>

			<div class="row">
				<div class="col s12 m12">
					<div class="card">
						<div class="card-content dark-text">
							<span class="card-title">Head 2 head</span>
							<table class="striped centered">
								<thead>
									<tr>
										<th>#</th>
										<th>Away Team</th>
										<th>Home Team</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>WINS</td>
										<td>${(head2head != null ? head2head.awayTeam.wins : '0')}</td>
										<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
									</tr>
									<tr>
										<td>DRAWS</td>
										<td>${(head2head != null ? head2head.awayTeam.draws : '0')}</td>
										<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
									</tr>
									<tr>
										<td>LOSS</td>
										<td>${(head2head != null ? head2head.awayTeam.losses : '0')}</td>
										<td>${(head2head != null ? head2head.homeTeam.wins : '0')}</td>
									</tr>
									<tr>
										<td>TOTAL GOALS</td>
										<td colspan="2">${(head2head != null ? head2head.totalGoals : '0')}</td>
									</tr>
									<tr>
										<td>NUM OF MATCH</td>
										<td colspan="2">${(head2head != null ? head2head.numberOfMatches : '0')}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- <div class="card-action">
							<a href="#">This is a link</a>
							<a href="#">This is a link</a>
						</div> -->
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col s12 m12">
					<div class="card">
						<div class="card-content dark-text">
							<span class="card-title">Match</span>
							<ul class="collection">
								<li class="collection-item avatar">
									<i class="material-icons circle">date_range</i>
									<span class="title">Last update</span>
									<p>${match.lastUpdated}</p>
									<!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
								</li>
								<li class="collection-item avatar">
									<i class="material-icons circle green">insert_chart</i>
									<span class="title">Status</span>
									<p>${match.status}</p>
								</li>
								<li class="collection-item avatar">
									<i class="material-icons circle red">group</i>
									<span class="title">Group</span>
									<p>${match.group}</p>
								</li>
								<li class="collection-item avatar">
									<i class="material-icons circle orange">today</i>
									<span class="title">Match day</span>
									<p>${match.matchday}</p>
								</li>
								<li class="collection-item avatar">
									<i class="material-icons circle blue">location_on</i>
									<span class="title">Venue</span>
									<p>${match.venue}</p>
								</li>
								<li class="collection-item avatar">
									<i class="material-icons circle yellow">nature</i>
									<span class="title">Season</span>
									<p>${match.startDate} - ${match.endDate}</p>
								</li>
							</ul>
						</div>
						<!-- <div class="card-action">
							<a href="#">This is a link</a>
							<a href="#">This is a link</a>
						</div> -->
					</div>
				</div>
			</div>
		`
	    // Sisipkan komponen card ke dalam elemen dengan id #content
	    document.getElementById("match").innerHTML = articleHTML;
	});
}