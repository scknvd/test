export default (store={
	placeholder:"",
	sliders:[]
},action) => {
	const {
		type,payload
	} = action;

	if( type === 'INIT' ){
		return payload;
	}

	if( type === 'UPDATE_PLACEHOLDER' ){
		return {
			...store,
			placeholder:payload.text
		}
	}

	if( type === 'ADD_SLIDER' ){
		return {
			...store,
			sliders:store.sliders.concat([payload])
		}
	}

	if( type === 'DELETE_SLIDER' ){
		return {
			...store,
			sliders:store.sliders.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_SLIDER'){
		return {
			...store,
			sliders:store.sliders.map((obj,i) => {
				if( i !== payload.index ) return obj;

				return {
					...obj,
					link:payload.link,
					image_url:payload.image_url
				}
			})
		}
	}

	// partners
	if( type === 'ADD_PARTNERS' ){
		return {
			...store,
			partners:store.partners.concat([payload])
		}
	}

	if( type === 'DELETE_PARTNERS' ){
		return {
			...store,
			partners:store.partners.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_PARTNERS' ){
		return {
			...store,
			partners:store.partners.map((value,index) => {
				if( index !== payload.index ) return value;

				return payload;
			})
		}
	}

	// friendly link
	if( type === 'ADD_FriendlyLink' ){
		return {
			...store,
			friendly_link:store.friendly_link.concat([payload])
		}
	}

	if( type === 'DELETE_FriendlyLink' ){
		return {
			...store,
			friendly_link:store.friendly_link.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_FriendlyLink' ){
		return {
			...store,
			friendly_link:store.friendly_link.map((value,index) => {
				if( index !== payload.index ) return value;

				return payload;
			})
		}
	}

	// ads
	if( type === 'ADD_ADS' ){
		return {
			...store,
			ads:store.ads.concat([payload])
		}
	}

	if( type === 'DELETE_ADS' ){
		return {
			...store,
			ads:store.ads.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_ADS' ){
		return {
			...store,
			ads:store.ads.map((value,index) => {
				if( index !== payload.index ) return value;

				return payload;
			})
		}
	}

	// songsheet
	if( type === 'ADD_SONGSHEET' ){
		return {
			...store,
			song_sheet:store.song_sheet.concat([payload])
		}
	}

	if( type === 'DELETE_SONGSHEET' ){
		return {
			...store,
			song_sheet:store.song_sheet.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_SONGSHEET' ){
		return {
			...store,
			song_sheet:store.song_sheet.map((value,index) => {
				if( index !== payload.index ) return value;

				return payload;
			})
		}
	}

	// song top list

	if( type === 'ADD_SONGTOPLIST' ){
		return {
			...store,
			song_top_list:store.song_top_list.concat([payload])
		}
	}

	if( type === 'DELETE_SONGTOPLIST' ){
		return {
			...store,
			song_top_list:store.song_top_list.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_SONGTOPLIST' ){
		return {
			...store,
			song_top_list:store.song_top_list.map((value,index) => {
				if( index !== payload.index ) return value;

				return payload;
			})
		}
	}



	if( type === 'ADD_RECOMMENDMV' ){
		return {
			...store,
			recommend_mv:store.recommend_mv.concat([payload])
		}
	}

	if( type === 'DELETE_RECOMMENDMV' ){
		return {
			...store,
			recommend_mv:store.recommend_mv.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_RECOMMENDMV' ){
		return {
			...store,
			recommend_mv:store.recommend_mv.map((value,index) => {
				if( index !== payload.index ) return value;

				return payload;
			})
		}
	}


	if( type === 'ADD_HOTRADIO' ){
		return {
			...store,
			hot_radio:store.hot_radio.concat([payload])
		}
	}

	if( type === 'DELETE_HOTRADIO' ){
		return {
			...store,
			hot_radio:store.hot_radio.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'UPDATE_HOTRADIO' ){
		return {
			...store,
			hot_radio:store.hot_radio.map((value,index) => {
				if( index !== payload.index ) return value;

				return payload;
			})
		}
	}

	if( type === 'DELETE_FIRST' ){
		return {
			...store,
			flatten_first:store.flatten_first.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'ADD_FIRST' ){
		return {
			...store,
			flatten_first:store.flatten_first.concat([payload])
		}
	}

	if( type === 'UPDATE_FIRST' ){
		return {
			...store,
			flatten_first:store.flatten_first.map((f,i) => {
				if( i !== payload.index ) return f;

				return payload;
			})
		}
	}



	if( type === 'DELETE_HOT_ARTIST' ){
		return {
			...store,
			flatten_hot_artists:store.flatten_hot_artists.filter((o,i) => i!==payload.index)
		}
	}

	if( type === 'ADD_HOT_ARTIST' ){
		return {
			...store,
			flatten_hot_artists:store.flatten_hot_artists.concat([payload])
		}
	}

	if( type === 'UPDATE_HOT_ARTIST' ){
		return {
			...store,
			flatten_hot_artists:store.flatten_hot_artists.map((f,i) => {
				if( i !== payload.index ) return f;

				return payload;
			})
		}
	}

	return {
		...store
	}
}