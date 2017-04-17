import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net'

class Partners extends Component {
  render() {
    return (
      <div>
      <span>合作伙伴列表</span><br />
      { this.getItems() }
      { this.getExtraItem() }
      <button onClick={ this.submitHandler }>提交</button>
      </div>
    );
  }

  getItems = () => {
  	return this.props.partners.map(({
  		image_url
  	},index) => {
  		return (
  			<div key={image_url}>
  				<span>图片地址</span>
				<input type="text" 
					defaultValue={image_url}
					onBlur={ this.updateValue(index) }
					ref={`imageInput${index}`}
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
			<span onClick={ this.addItem }>+</span>
		</div>
  	)
  }

  addItem = () => {
  	const {
  		addImage
  	} = this.refs;

  	if( !addImage.value){
  		return;
  	}

  	this.props.dispatch({
  		type:"ADD_PARTNERS",
  		payload:{
  			image_url:addImage.value,
  		}
  	})

  	addImage.value = "";
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_PARTNERS',
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

  		this.props.dispatch({
  			type:"UPDATE_PARTNERS",
  			payload:{
  				index,
  				image_url:imageInput.value,
  			}
  		})
  	}
  }

  submitHandler = () => {
  	this.props.dispatch(dispatch => {
  		post('partners',this.props.partners)
  		.then(r=>alert('success!'));
  	})
  }
}

export default connect(store => {
	return {
		partners:(store && store.partners) ? store.partners : []
	}
})(Partners);
