import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net'

class RecommendMv extends Component {
  render() {
    return (
      <div>
      <span>排行榜</span><br />
      { this.getItems() }
      { this.getExtraItem() }
      <button onClick={ this.submitHandler }>提交</button>
      </div>
    );
  }

  getItems = () => {
  	return this.props.recommend_mv.map(({
  		image_url,artist,play_link,name
  	},index) => {
  		return (
  			<div key={image_url} style={{marginBottom:10}}>
  				<span>图片地址</span>
					<input type="text" 
					defaultValue={image_url}
					onBlur={ this.updateValue(index) }
					ref={`imageInput${index}`}
					/><br/>

					<span>播放地址</span>
  				<input type="text" 
  					defaultValue={play_link}
  					onBlur={ this.updateValue(index) }
  					ref={`playLinkInput${index}`}
  					/><br/>
  					
					<span>MV名称</span>
  				<input type="text" 
  					defaultValue={name}
  					onBlur={ this.updateValue(index) }
  					ref={`nameInput${index}`}
  					/><br/>
  					
					<span>歌手</span>
  				<input type="text" 
  					defaultValue={ artist }
  					onBlur={ this.updateValue(index) }
  					ref={`artistInput${index}`}
  					/><br/>

  				<span onClick={ this.deleteItem(index) }>×</span>
  			</div>
  		)
  	})
  }

  getExtraItem = () => {
  	return (
		<div>
			<span>图片地址</span>
			<input type="text" ref="addImage"/><br/>
			<span>播放地址</span>
			<input type="text" ref="addPlayLink"/><br/>
			<span>MV名称</span>
			<input type="text" ref="addName"/><br/>
			<span>歌手</span>
			<input type="text" ref="addArtist"/><br/>
			<span onClick={ this.addItem }>+</span>
		</div>
  	)
  }

  addItem = () => {
  	const {
  		addImage,
  		addPlayLink,
  		addName,
  		addArtist
  	} = this.refs;

  	if( 
  		!addImage.value ||
  		!addPlayLink.value ||
  		!addName.value ||
  		!addArtist.value
		){
  		return;
  	}

  	this.props.dispatch({
  		type:"ADD_RECOMMENDMV",
  		payload:{
  			image_url:addImage.value,
  			play_link:addPlayLink.value,
  			name:addName.value,
  			artist:addArtist.value
  		}
  	})

  	addImage.value = "";
  	addPlayLink.value = "";
  	addName.value = "";
  	addArtist.value = "";
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_RECOMMENDMV',
  			payload:{
  				index
  			}
  		})
  	}
  }

  // 柯里化 、 惰性求值

  updateValue = (index) => {
  	return () => {

  		const imageInput = this.refs[`imageInput${index}`]
  		const playLinkInput = this.refs[`playLinkInput${index}`]
  		const nameInput = this.refs[`nameInput${index}`]
  		const artistInput = this.refs[`artistInput${index}`]

  		this.props.dispatch({
  			type:"UPDATE_RECOMMENDMV",
  			payload:{
  				index,
  				image_url:imageInput.value,
  				play_link:playLinkInput.value,
  				name:nameInput.value,
  				artist:artistInput.value
  			}
  		})
  	}
  }

  submitHandler = () => {
  	this.props.dispatch(dispatch => {
  		post('recommend_mv',this.props.recommend_mv)
  		.then(r=>alert('success!'));
  	})
  }
}

export default connect(store => {
	return {
		recommend_mv:(store && store.recommend_mv) ? store.recommend_mv : []
	}
})(RecommendMv);
