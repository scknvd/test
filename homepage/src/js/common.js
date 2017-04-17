const Net = {
	address:"http://localhost:9988",
	dev_address:"http://localhost:8888",
	get(path){
		return fetch(`${this.address}/${path}`).then(r=>r.json());
	}
}