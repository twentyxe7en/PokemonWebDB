let count = 100000
var pokedex = {}
const tbl  = document.getElementById("tbl")
let addBtn
let add


window.onload = async function() {
	// getPokemon(1)
	for (let i = 1; i <= count; i++) {
		await getPokemon(i)

		add = document.getElementById("add")
		addBtn = document.getElementById("addBtn")
		addBtn.addEventListener("click", addPokemon)

		let row = document.createElement("tr")
		// row.addEventListener("click", updatePokemon)
		// row.id = i
		// ID
		let id = document.createElement("td")
		id.innerHTML = pokedex[i]["id"]
		row.append(id)
		// Name
		let name = document.createElement("td")
		const n = pokedex[i]["name"]
		name.innerHTML = n.charAt(0).toUpperCase() + n.slice(1)
		name.classList.add("name")
		row.append(name)
		// Type
		let types = pokedex[i]["types"]
		let type1 = document.createElement("td")
		const t1 = types[0]["type"]["name"]
		type1.innerHTML = t1.charAt(0).toUpperCase() + t1.slice(1)
		let type2 = document.createElement("td")
		if (types[1] == null) {
			type2.innerHTML = type1.innerHTML
		} else {
			const t2 = types[1]["type"]["name"]
			type2.innerHTML = t2.charAt(0).toUpperCase() + t2.slice(1)
		}
		type1.classList.add("type")
		type1.classList.add(type1.innerHTML.toLowerCase())
		type2.classList.add("type")
		type2.classList.add(type2.innerHTML.toLowerCase())
		row.append(type1)
		row.append(type2)
		// Base Stats
		let stats = pokedex[i]["stats"]
		for (let i = 0; i < 6; i++) {
			let base_stat = document.createElement("td")
			base_stat.innerHTML = stats[i]["base_stat"]
			base_stat.classList.add("stat")
			row.append(base_stat)
		}
		// Height
		let height = document.createElement("td")
		height.innerHTML = (pokedex[i]["height"] / 10) + "m"
		height.classList.add("stat")
		row.append(height)
		// Weight
		let weight = document.createElement("td")
		weight.innerHTML = (pokedex[i]["weight"] / 10) + " kg"
		weight.classList.add("stat")
		row.append(weight)

		// Add Row
		tbl.append(row)
		// console.log(row)

		// Get Image
		// document.getElementById("img").src = pokedex[i]["img"]

		console.log("Index: " + i + " Name: " + pokedex[i]["name"])
		console.log(pokedex[i])
	}
	// console.log(pokedex)
}

async function getPokemon(num) {
	let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString()

	let res = await fetch(url)
	let pokemon = await res.json()
	// console.log(pokemon)

	let id = pokemon["id"]
	let name = pokemon["name"]
	let type = pokemon["types"]
	let stats = pokemon["stats"]
	let height = pokemon["height"]
	let weight = pokemon["weight"]
	// let img = pokemon["sprites"]["front_default"]

	// res = await fetch(pokemon["species"]["url"])
	// let desc = await res.json()

	// // console.log(desc)
	// desc = desc["flavor_text_entries"][0]["flavor_text"]

	pokedex[num] = {
		"id": id,
		"name": name,
		"types": type,
		"stats": stats,
		"height": height,
		"weight": weight
	}
}

// function updatePokemon() {
// 	document.getElementById("img").src = pokedex[this.id]["img"]
// }

async function addPokemon() {
	let n = add.value
	let url = "https://pokeapi.co/api/v2/pokemon/" + n.toLowerCase()

	let res = await fetch(url)
	let pokemon = await res.json()

	let row = document.createElement("tr")
	let id = document.createElement("td")
	id.innerHTML = pokemon.id
	row.append(id)
	let name = document.createElement("td")
	let nm = pokemon.name
	name.innerHTML = nm.charAt(0).toUpperCase() + nm.slice(1)
	row.append(name)
	let type1 = document.createElement("td")
	let t1 = pokemon.types[0].type.name
	type1.innerHTML = t1.charAt(0).toUpperCase() + t1.slice(1)
	row.append(type1)
	let type2 = document.createElement("td")
	if (pokemon.types[1] == null) {
		type2.innerHTML = type1.innerHTML
	} else {
		const t2 = pokemon.types[1].type.name
		type2.innerHTML = t2.charAt(0).toUpperCase() + t2.slice(1)
	}
	row.append(type2)
	type1.classList.add(type1.innerHTML.toLowerCase())
	type2.classList.add(type2.innerHTML.toLowerCase())
	// let stats = pokemon.stats[]
	for (let i = 0; i < 6; i++) {
		let base_stat = document.createElement("td")
		base_stat.innerHTML = pokemon.stats[i]["base_stat"]
		base_stat.classList.add("stat")
		row.append(base_stat)
	}
	// Height
	let height = document.createElement("td")
	height.innerHTML = (pokemon.height / 10) + "m"
	row.append(height)
	// Weight
	let weight = document.createElement("td")
	weight.innerHTML = (pokemon.weight / 10) + " kg"
	row.append(weight)
	tbl.append(row)
}