import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net'

class SongTopList extends Component {
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
  	return this.props.song_top_list.map(({
  		image_url,song_list,link,title
  	},index) => {
  		return (
  			<div key={image_url} style={{marginBottom:10}}>
  				<span>图片地址</span>
					<input type="text" 
					defaultValue={image_url}
					onBlur={ this.updateValue(index) }
					ref={`imageInput${index}`}
					/>

					<span>跳转地址</span>
  				<input type="text" 
  					defaultValue={link}
  					onBlur={ this.updateValue(index) }
  					ref={`linkInput${index}`}
  					/><br/>
  					
					<span>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</span>
  				<input type="text" 
  					defaultValue={title}
  					onBlur={ this.updateValue(index) }
  					ref={`titleInput${index}`}
  					/>
  					
					<span>音乐列表</span>
  				<input type="text" 
  					defaultValue={ song_list.join(',') }
  					onBlur={ this.updateValue(index) }
  					ref={`songListInput${index}`}
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
			<input type="text" ref="addImage"/>
			<span>跳转地址</span>
			<input type="text" ref="addLink"/><br/>
			<span>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</span>
			<input type="text" ref="addTitle"/>
			<span>音乐列表</span>
			<input type="text" ref="addSongList"/><br/>
			<span onClick={ this.addItem }>+</span>
		</div>
  	)
  }

  addItem = () => {
  	const {
  		addImage,
  		addLink,
  		addSongList,
  		addTitle
  	} = this.refs;

  	if( 
  		!addImage.value ||
  		!addLink.value ||
  		!addSongList.value ||
  		!addTitle.value
		){
  		return;
  	}

  	this.props.dispatch({
  		type:"ADD_SONGTOPLIST",
  		payload:{
  			image_url:addImage.value,
  			link:addLink.value,
  			title:addTitle.value,
  			song_list:addSongList.value.split(',')
  		}
  	})

  	addImage.value = "";
  	addLink.value = "";
  	addSongList.value = "";
  	addTitle.value = "";
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_SONGTOPLIST',
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
  		const songListInput = this.refs[`songListInput${index}`]
  		const linkInput = this.refs[`linkInput${index}`]
  		const titleInput = this.refs[`titleInput${index}`]

  		this.props.dispatch({
  			type:"UPDATE_SONGTOPLIST",
  			payload:{
  				index,
  				image_url:imageInput.value,
  				song_list:songListInput.value.split(','),
  				link:linkInput.value,
  				title:titleInput.value,
  			}
  		})
  	}
  }

  submitHandler = () => {
  	this.props.dispatch(dispatch => {
  		post('song_top_list',this.props.song_top_list)
  		.then(r=>alert('success!'));
  	})
  }
}

export default connect(store => {
	return {
		song_top_list:(store && store.song_top_list) ? store.song_top_list : []
	}
})(SongTopList);
