const paths = [
	"search_placeholder",
	"sliders",
	"song_sheet",
	"song_top_list",
	"first",
	"recommend_mv",
	"ads",
	"hot_radio",
	"hot_artists",
	"partners",
	"friendly_link"
]

Vue.filter('time',function(value){
	return `${parseInt(value/60)}:${value%60}`;
})

Vue.filter('playTimes',function(n){
	if( n < 10000 ) return n;

	return `${(n/10000).toFixed(2)}万`
})

new Vue({
	el:'#content',
	data:{
		ads:[],
		search_placeholder:'',
		sliders:[],
		song_sheet:[],
		song_top_list:[],
		first:{
			chinese:[],
			european:[],
			korea:[],
			japanese:[],
		},
		recommend_mv:[],
		ads:[],
		hot_radio:[],
		hot_artists:{
			chinese:[],
			european:[],
			japanese_korea:[],
		},
		partners:[],
		friendly_link:[],
		activeSliderIndex:0,
		singerIndex:0,
		singerCountries:["华语","欧美","日韩"],
		singerCountryIndex:0,
		currentSingers:[],
		songCountries:["华语","欧美","韩国","日本"],
		songCountryIndex:0,
		songPageIndex:0,
		currentSongs:[],
	},
	methods:{
		sliderPreClickHandler(){

			if( this.activeSliderIndex == 0 ){
				this.activeSliderIndex = this.sliders.length-1
			} else {
				this.activeSliderIndex -- ;
			}
		},
		sliderNextClickHandler(){
			
			if( this.activeSliderIndex == this.sliders.length-1 ){
				this.activeSliderIndex = 0
			} else {
				this.activeSliderIndex ++ ;
			}
		},
		sliderDotClickHandler(index){
			this.activeSliderIndex = index;
		},
		changeSingerContry(index){
			this.singerCountryIndex = index;
			this.singerIndex = 0;

			if( index == 0 ){
				this.currentSingers = this.hot_artists.chinese.filter((a,i) => i<5)
			} else if( index == 1 ){
				this.currentSingers = this.hot_artists.european.filter((a,i) => i<5)
			} else if( index == 2 ){
				this.currentSingers = this.hot_artists.japanese_korea.filter((a,i) => i<5)
			}
		},
		changeSingerPageIndex(index){
			this.singerIndex = index;

			if( this.singerCountryIndex == 0 ){
				this.currentSingers = this.hot_artists.chinese.filter((a,i) => i<(this.singerIndex+1)*5 && i>=(this.singerIndex)*5)
			} else if( this.singerCountryIndex == 1 ){
				this.currentSingers = this.hot_artists.european.filter((a,i) => i<(this.singerIndex+1)*5 && i>=(this.singerIndex)*5)
			} else if( this.singerCountryIndex == 2 ){
				this.currentSingers = this.hot_artists.japanese_korea.filter((a,i) => i<(this.singerIndex+1)*5 && i>=(this.singerIndex)*5)
			}
		},
		changeSongCountry(index){
			this.songCountryIndex = index;
			this.songPageIndex = 0;

			if( this.songCountryIndex == 0 ){
				this.currentSongs = this.first.chinese.filter((a,i) => i<3)
			} else if(this.songCountryIndex == 1){
				this.currentSongs = this.first.european.filter((a,i) => i<3)
			} else if(this.songCountryIndex == 2){
				this.currentSongs = this.first.korea.filter((a,i) => i<3)
			} else if(this.songCountryIndex == 3){
				this.currentSongs = this.first.japanese.filter((a,i) => i<3)
			}
		},
		songPagePreClickHandler(){
			if( this.songPageIndex == 0 ){
				return
			}
				
			this.songPageIndex --
			this.changeSongPage();
		},
		songPageNextClickHandler(){

			if( this.songPageIndex == 2 ){
				return
			}
			
			this.songPageIndex ++
			this.changeSongPage();
		},

		changeSongPage(){
			if( this.songCountryIndex == 0 ){
				this.currentSongs = this.first.chinese.filter((a,i) => i<(this.songPageIndex+1)*3 && i>=this.songPageIndex*3)
			} else if(this.songCountryIndex == 1){
				this.currentSongs = this.first.european.filter((a,i) => i<(this.songPageIndex+1)*3 && i>=this.songPageIndex*3)
			} else if(this.songCountryIndex == 2){
				this.currentSongs = this.first.korea.filter((a,i) => i<(this.songPageIndex+1)*3 && i>=this.songPageIndex*3)
			} else if(this.songCountryIndex == 3){
				this.currentSongs = this.first.japanese.filter((a,i) => i<(this.songPageIndex+1)*3 && i>=this.songPageIndex*3)
			}
		}
	},
	mounted:function(){
		Promise.all(
			paths.map(path=>Net.get(path))
		).then(res => {

			paths.forEach((path,index) => {
				this[path] = res[index].data
			})

			this.currentSingers = this.hot_artists.chinese.filter((a,i) => i<5)
			this.currentSongs = this.first.chinese.filter((a,i) => i<3);
		})

		setInterval(() => {
			this.sliderNextClickHandler();
		},6000)
	}
})