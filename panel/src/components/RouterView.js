import React,{ Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

import SearchPlaceholder from '../pages/SearchPlaceholder';
import Slider from '../pages/Slider';
import SongSheet from '../pages/SongSheet';
import SongTopList from '../pages/SongTopList';
import First from '../pages/First';
import RecommendMv from '../pages/RecommendMv';
import Ads from '../pages/Ads';
import HotRadio from '../pages/HotRadio';
import HotArtists from '../pages/HotArtists';
import Partners from '../pages/Partners';
import FriendlyLink from '../pages/FriendlyLink';

class RouterView extends Component{
	render(){
		return (
		   <div className="routers">
         <Route path="/search-placeholder" component={ SearchPlaceholder }></Route>
         <Route path="/slider" component={ Slider }></Route>
         <Route path="/song-sheet" component={ SongSheet }/>
         <Route path="/song-top-list" component={ SongTopList }/>
         <Route path="/first" component={ First }/>
         <Route path="/recommend-mv" component={ RecommendMv }/>
         <Route path="/ads" component={ Ads }/>
         <Route path="/hot-radio" component={ HotRadio }/>
         <Route path="/hot-artists" component={ HotArtists }/>
         <Route path="/partners" component={ Partners }/>
         <Route path="/friendly-link" component={ FriendlyLink }/>
         <Redirect from="/" to="/search-placeholder"></Redirect>
       </div>
		)
	}
}

export default RouterView;