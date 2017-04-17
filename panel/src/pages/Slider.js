import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net'

class Slider extends Component {
  render() {
    return (
      <div>
      <span>轮播图列表</span><br />
      { this.getItems() }
      { this.getExtraItem() }
      <button onClick={ this.submitHandler }>提交</button>
      </div>
    );
  }

  getItems = () => {
  	return this.props.sliders.map(({
  		image_url,link
  	},index) => {
  		return (
  			<div key={image_url}>
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
  					/>
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
			<input type="text" ref="addLink"/>
			<span onClick={ this.addItem }>+</span>
		</div>
  	)
  }

  addItem = () => {
  	const {
  		addImage,addLink
  	} = this.refs;

  	if( !addImage.value || !addLink.value ){
  		return;
  	}

  	this.props.dispatch({
  		type:"ADD_SLIDER",
  		payload:{
  			image_url:addImage.value,
  			link:addLink.value
  		}
  	})

  	addImage.value = "";
  	addLink.value = "";
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_SLIDER',
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

  		this.props.dispatch({
  			type:"UPDATE_SLIDER",
  			payload:{
  				index,
  				image_url:imageInput.value,
  				link:linkInput.value
  			}
  		})
  	}
  }

  submitHandler = () => {
  	this.props.dispatch(dispatch => {
  		post('sliders',this.props.sliders)
  		.then(r=>alert('success!'));
  	})
  }
}

export default connect(store => {
	return {
		sliders:(store && store.sliders) ? store.sliders : []
	}
})(Slider);
