import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net'

class SongSheet extends Component {
  render() {
    return (
      <div>
      <span>推荐歌单</span><br />
      { this.getItems() }
      { this.getExtraItem() }
      <button onClick={ this.submitHandler }>提交</button>
      </div>
    );
  }

  getItems = () => {
  	return this.props.song_sheet.map(({
  		image_url,link,play_times,title,username
  	},index) => {
  		return (
  			<div key={image_url} style={{marginBottom:10}}>
  				<span>图片地址</span>
					<input type="text" 
					defaultValue={image_url}
					onBlur={ this.updateValue(index) }
					ref={`imageInput${index}`}
					/><br/>

					<span>跳转地址</span>
  				<input type="text" 
  					defaultValue={link}
  					onBlur={ this.updateValue(index) }
  					ref={`linkInput${index}`}
  					/><br/>

					<span>播放次数</span>
  				<input type="text" 
  					defaultValue={play_times}
  					onBlur={ this.updateValue(index) }
  					ref={`playTimeInput${index}`}
  					/><br/>
  					
					<span>标题</span>
  				<input type="text" 
  					defaultValue={title}
  					onBlur={ this.updateValue(index) }
  					ref={`titleInput${index}`}
  					/><br/>
  					
					<span>用户名</span>
  				<input type="text" 
  					defaultValue={username}
  					onBlur={ this.updateValue(index) }
  					ref={`usernameInput${index}`}
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
			<span>跳转地址</span>
			<input type="text" ref="addLink"/><br/>
			<span>播放次数</span>
			<input type="text" ref="addPlaytimes"/><br/>
			<span>标题</span>
			<input type="text" ref="addTitle"/><br/>
			<span>用户名</span>
			<input type="text" ref="addUsername"/><br/>
			<span onClick={ this.addItem }>+</span>
		</div>
  	)
  }

  addItem = () => {
  	const {
  		addImage,
  		addLink,
  		addPlaytimes,
  		addTitle,
  		addUsername
  	} = this.refs;

  	if( 
  		!addImage.value ||
  		!addLink.value ||
  		!addPlaytimes.value ||
  		!addTitle.value ||
  		!addUsername.value
		){
  		return;
  	}

  	this.props.dispatch({
  		type:"ADD_SONGSHEET",
  		payload:{
  			image_url:addImage.value,
  			link:addLink.value,
  			play_times:addPlaytimes.value,
  			title:addTitle.value,
  			username:addUsername.value
  		}
  	})

  	addImage.value = "";
  	addLink.value = "";
  	addPlaytimes.value = "";
  	addTitle.value = "";
  	addUsername.value = "";  	
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_SONGSHEET',
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
  		const linkInput = this.refs[`linkInput${index}`]
  		const playTimeInput = this.refs[`playTimeInput${index}`]
  		const titleInput = this.refs[`titleInput${index}`]
  		const usernameInput = this.refs[`usernameInput${index}`]

  		this.props.dispatch({
  			type:"UPDATE_SONGSHEET",
  			payload:{
  				index,
  				image_url:imageInput.value,
  				link:linkInput.value,
  				play_times:playTimeInput.value,
  				title:titleInput.value,
  				username:usernameInput.value
  			}
  		})
  	}
  }

  submitHandler = () => {
  	this.props.dispatch(dispatch => {
  		post('song_sheet',this.props.song_sheet)
  		.then(r=>alert('success!'));
  	})
  }
}

export default connect(store => {
	return {
		song_sheet:(store && store.song_sheet) ? store.song_sheet : []
	}
})(SongSheet);
