import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net'

class HotRadio extends Component {
  render() {
    return (
      <div>
      <h3>热门电台</h3><br />
      { this.getItems() }
      { this.getExtraItem() }
      <button onClick={ this.submitHandler }>提交</button>
      </div>
    );
  }

  getItems = () => {
  	return this.props.hot_radio.map(({
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
  					
					<span>电台名称</span>
  				<input type="text" 
  					defaultValue={name}
  					onBlur={ this.updateValue(index) }
  					ref={`nameInput${index}`}
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
			<span>电台名称</span>
			<input type="text" ref="addName"/><br/>
			<span onClick={ this.addItem }>+</span>
		</div>
  	)
  }

  addItem = () => {
  	const {
  		addImage,
  		addPlayLink,
  		addName,
  	} = this.refs;

  	if( 
  		!addImage.value ||
  		!addPlayLink.value ||
  		!addName.value
		){
  		return;
  	}

  	this.props.dispatch({
  		type:"ADD_HOTRADIO",
  		payload:{
  			image_url:addImage.value,
  			play_link:addPlayLink.value,
  			name:addName.value,
  		}
  	})

  	addImage.value = "";
  	addPlayLink.value = "";
  	addName.value = "";
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_HOTRADIO',
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

  		this.props.dispatch({
  			type:"UPDATE_HOTRADIO",
  			payload:{
  				index,
  				image_url:imageInput.value,
  				play_link:playLinkInput.value,
  				name:nameInput.value,
  			}
  		})
  	}
  }

  submitHandler = () => {
  	this.props.dispatch(dispatch => {
  		post('hot_radio',this.props.hot_radio)
  		.then(r=>alert('success!'));
  	})
  }
}

export default connect(store => {
	return {
		hot_radio:(store && store.hot_radio) ? store.hot_radio : []
	}
})(HotRadio);
