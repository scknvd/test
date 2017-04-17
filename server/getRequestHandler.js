module.exports = (app,db) => {
	app.get('/search_placeholder',(req,res) => {

		db.query(
			`SELECT placeholder FROM search_placeholder`,
			(err,data) => {

				if( err ){
					console.log(err);

				} else {
					res.send({
						errCode:0,
						errMsg:'ok',
						data:data[0].placeholder
					});

					res.end();
				}
			}
		)
	})

	app.get('/sliders',(req,res) => {
		db.query(`SELECT * FROM slider`,(err,data) => {
			if( err ){

			} else {
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});
				res.end();
			}
		})
	})

	app.get('/song_sheet',(req,res) => {
		db.query(`SELECT * FROM song_sheet`,(err,data) => {
			if(err){
				console.log(err);
			} else {
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});

				res.end();
			}
		})
	})

	app.get('/song_top_list',(req,res) => {
		db.query(`SELECT * FROM song_top_list`,(err,data) => {
			if(err){
				console.log(err);
			} else {
				data = data.map((obj,index) => {
					obj.song_list = obj.song_list.split(',');
					return obj;
				})

				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});

				res.end();
			}
		})
	})

	app.get('/first',(req,res) => {
		db.query(`
			SELECT * FROM first WHERE language="chinese";
			SELECT * FROM first WHERE language="european";
			SELECT * FROM first WHERE language="korea";
			SELECT * FROM first WHERE language="japanese";
		`,(err,data) => {
			if(err){
				console.log(err);
			} else {
				res.send({
					errCode:0,
					errMsg:'ok',
					data:{
						chinese:data[0],
						european:data[1],
						korea:data[2],
						japanese:data[3]
					}
				});

				res.end();
			}
		})
	})

	app.get('/flatten_first',(req,res) => {
		db.query(`
			SELECT * FROM first
		`,(err,data) => {
			if(err){
				console.log(err);
			} else {
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});

				res.end();
			}
		})
	})

	app.get('/recommend_mv',(req,res)=>{
		db.query(`SELECT * FROM recommend_mv`,(err,data) => {
			if( err ){
				console.log(err);
			}else{
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});

				res.end();
			}

		})
	})

	app.get('/ads',(req,res)=>{
		db.query(`SELECT * FROM advertisements`,(err,data) => {
			if( err ){
				console.log(err);
			}else{
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});
				
				res.end();
			}
		})
	})

	app.get('/hot_radio',(req,res)=>{
		db.query(`SELECT * FROM hot_radio`,(err,data) => {
			if( err ){
				console.log(err);
			}else{
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});
				
				res.end();
			}
		})
	})

	app.get('/flatten_hot_artists',(req,res)=>{
		db.query(`
			SELECT * FROM hot_artists
		`,(err,data) => {
			if( err ){
				console.log(err);
			}else{
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});
				
				res.end();
			}
		})
	})

	app.get('/hot_artists',(req,res)=>{
		db.query(`
			SELECT * FROM hot_artists WHERE language="chinese";
			SELECT * FROM hot_artists WHERE language="european";
			SELECT * FROM hot_artists WHERE language="japanese" OR language="korea";
		`,(err,data) => {
			if( err ){
				console.log(err);
			}else{
				res.send({
					errCode:0,
					errMsg:'ok',
					data:{
						chinese:data[0],
						european:data[1],
						japanese_korea:data[2]
					}
				});
				
				res.end();
			}
		})
	})

	app.get('/partners',(req,res)=>{
		db.query(`SELECT * FROM partners`,(err,data) => {
			if( err ){
				console.log(err);
			}else{
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});
				
				res.end();
			}
		})
	})

	app.get('/friendly_link',(req,res)=>{
		db.query(`SELECT * FROM friendly_link`,(err,data) => {
			if( err ){
				console.log(err);
			}else{
				res.send({
					errCode:0,
					errMsg:'ok',
					data
				});
				
				res.end();
			}
		})
	})
}


