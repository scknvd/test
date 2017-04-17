module.exports = (app,db) => {

	app.post('/search_placeholder',(req,res) => {
		const { placeholder } = req.body;
		
		console.log(placeholder);

		db.query(`UPDATE search_placeholder SET placeholder="${
			placeholder
		}" WHERE id=1`,(err,data) => {
			if(err){
				console.log(err);
			} else {
				res.send({
					errCode:0,
					errMsg:"ok"
				})
				res.end();
			}
		})
	})

	app.post('/sliders',(req,res) => {

		const reqData = req.body;

		db.query(`DELETE FROM slider WHERE id>${reqData.length}`,(err,data) => {
			if( err ){
				console.log(err)
			} else {

				if( !reqData.length ){
					res.send({
						errCode:0,
						errMsg:'ok'
					})
					res.end();
				}

				const values = reqData.map((obj,index)=>{
					const { id,image_url,link } = obj;
					return `(${index+1},"${image_url}","${link}")`
				}).join(',');

				db.query(`INSERT INTO slider (id,image_url,link) VALUES ${values} ON DUPLICATE KEY UPDATE image_url=VALUES(image_url),link=VALUES(link)`,(
					err,data
				) => {
					if( err ){
						console.log(err)
					} else {
						res.send({
							errCode:0,
							errMsg:'ok'
						})
						res.end();
					}
				})
			}
		})
	})

	app.post('/partners',(req,res) => {
		const reqData = req.body;

		const queryStr = reqData.map((obj,index) => {
			return  `(${index+1},"${obj.image_url}")`
		}).join(',');

		db.query(`DELETE FROM partners`,() =>{
			db.query(`INSERT INTO partners VALUES${queryStr}`,() => {
				res.send({
					errCode:0,
					errMsg:'ok'
				})
				res.end();
			})
		})
	})

	app.post('/friendly_link',(req,res) => {
		const reqData = req.body;

		const queryStr = reqData.map((obj,index) => {
			return  `(${index+1},"${obj.name}","${obj.link}")`
		}).join(',');

		db.query(`DELETE FROM friendly_link`,() =>{
			db.query(`INSERT INTO friendly_link VALUES${queryStr}`,() => {
				res.send({
					errCode:0,
					errMsg:'ok'
				})
				res.end();
			})
		})
	})

	app.post('/ads',(req,res) => {

		const reqData = req.body;

		db.query(`DELETE FROM advertisements WHERE id>${reqData.length}`,(err,data) => {
			const queryStr = reqData.map((obj,index)=>{
				const { id,image_url,link } = obj;
				return `(${index+1},"${image_url}","${link}")`
			}).join(',');

			db.query(`DELETE FROM advertisements`,() =>{
				db.query(`INSERT INTO advertisements VALUES${queryStr}`,() => {
					res.send({
						errCode:0,
						errMsg:'ok'
					})
					res.end();
				})
			})
		})
	})

	app.post('/song_sheet',(req,res) => {

		const reqData = req.body;
		console.log(reqData);
		db.query(`DELETE FROM song_sheet`,(err,data) => {
			if (err) {
				console.log(err);
			}else{
				const queryStr = reqData.map((obj,index)=>{
					const { id,image_url,link,play_times,title,username } = obj;
					return `(${index+1},"${image_url}","${link}",${
							play_times},"${title}","${username}")`;
				}).join(',');

				db.query(`INSERT INTO song_sheet VALUES ${queryStr}`,(err,data) => {
					if (err) {
						console.log(err);
					}else{
						res.send({
							errCode:0,
							errMsg:'ok'
						})
						res.end();
					}
				})
			}
		})
	})

	app.post('/song_top_list',(req,res) => {

		const reqData = req.body;

		db.query(`DELETE FROM song_top_list`,(err,data) => {
			const queryStr = reqData.map((obj,index)=>{
				const { id,image_url,link,song_list,title } = obj;
				return `(${index+1},"${title}","${image_url}","${song_list.join(',')}","${
						link}")`;
			}).join(',');

			console.log(`INSERT INTO song_top_list VALUES${queryStr}`);

			db.query(`INSERT INTO song_top_list VALUES${queryStr}`,() => {
				res.send({
					errCode:0,
					errMsg:'ok'
				})
				res.end();
			})
		})
	})

	app.post('/recommend_mv',(req,res) => {

		const reqData = req.body;

				db.query(`DELETE FROM recommend_mv`,(err,data) => {
					const queryStr = reqData.map((obj,index)=>{
						return `(${index+1},"${name}","${artist}","${image_url}","${play_link}")`;
					}).join(',');

					console.log(`INSERT INTO recommend_mv VALUES ${queryStr}`);

					db.query(`INSERT INTO recommend_mv VALUES ${queryStr}`,() => {
						res.send({
							errCode:0,
							errMsg:'ok'
						})
						res.end();
					})
				})
	})

	app.post('/hot_radio',(req,res) => {

		const reqData = req.body;

		db.query(`DELETE FROM hot_radio`,(err,data) => {
			const queryStr = reqData.map((obj,index)=>{
				const { id,image_url,play_link,name } = obj;
				return `(${index+1},"${name}","${image_url}","${play_link}")`;
			}).join(',');

			console.log(`INSERT INTO hot_radio VALUES${queryStr}`);

			db.query(`INSERT INTO hot_radio VALUES${queryStr}`,() => {
				res.send({
					errCode:0,
					errMsg:'ok'
				})
				res.end();
			})
		})
	})

	app.post('/first',(req,res) => {

		const reqData = req.body;

		db.query(`DELETE FROM first`,(err,data) => {
			const queryStr = reqData.map((obj,index)=>{
				const { artist,name,play_link,download_link,time,is_only,language } = obj;
				return `(${index+1},"${name}","${artist}",${time},"${play_link}","${download_link}",${is_only},"${language}")`;
			}).join(',');

			console.log(`INSERT INTO first VALUES${queryStr}`);

			db.query(`INSERT INTO first VALUES${queryStr}`,() => {
				res.send({
					errCode:0,
					errMsg:'ok'
				})
				res.end();
			})
		})
	})


	app.post('/hot_artists',(req,res) => {

		const reqData = req.body;

		db.query(`DELETE FROM hot_artists`,(err,data) => {
			const queryStr = reqData.map((obj,index)=>{
				const { name,image_url,link,language } = obj;
				return `(${index+1},"${name}","${image_url}","${link}","${language}")`;
			}).join(',');

			console.log(`INSERT INTO hot_artists VALUES${queryStr}`);

			db.query(`INSERT INTO hot_artists VALUES${queryStr}`,() => {
				res.send({
					errCode:0,
					errMsg:'ok'
				})
				res.end();
			})
		})
	})
}