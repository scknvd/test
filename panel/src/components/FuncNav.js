import React,{ Component} from 'react';
import { Link } from 'react-router-dom';

class FuncNav extends Component{
	render(){
		return (
			<div className="func-nav">
			  <Link to="/search-placeholder">搜索占位</Link>
			  <Link to="/slider">轮播图</Link>
			  <Link to="/song-sheet">推荐歌单</Link>
			  <Link to="/song-top-list">排行榜</Link>
			  <Link to="/first">新歌首发</Link>
			  <Link to="/recommend-mv">推荐MV</Link>
			  <Link to="/ads">广告</Link>
			  <Link to="/hot-radio">热门电台</Link>
			  <Link to="/hot-artists">热门歌手</Link>
			  <Link to="/partners">合作伙伴</Link>
			  <Link to="/friendly-link">友情链接</Link>
			</div>
		)
	}
}

export default FuncNav;