import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net'

class FriendlyLink extends Component {
  render() {
    return (
      <div>
      <span>友情链接</span><br />
      { this.getItems() }
      { this.getExtraItem() }
      <button onClick={ this.submitHandler }>提交</button>
      </div>
    );
  }

  getItems = () => {
  	return this.props.friendly_link.map(({
  		name,link
  	},index) => {
  		return (
  			<div key={name}>
  				<span>展示文字</span>
				<input type="text" 
					defaultValue={name}
					onBlur={ this.updateValue(index) }
					ref={`textInput${index}`}
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
			<span>展示文字</span>
			<input type="text" ref="addText"/>
			<span>跳转地址</span>
			<input type="text" ref="addLink"/>
			<span onClick={ this.addItem }>+</span>
		</div>
  	)
  }

  addItem = () => {
  	const {
  		addText,addLink
  	} = this.refs;

  	if( !addText.value || !addLink.value ){
  		return;
  	}

  	this.props.dispatch({
  		type:"ADD_FriendlyLink",
  		payload:{
  			name:addText.value,
  			link:addLink.value
  		}
  	})

  	addText.value = "";
  	addLink.value = "";
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_FriendlyLink',
  			payload:{
  				index
  			}
  		})
  	}
  }

  // 柯里化 、 惰性求值

  updateValue = (index) => {
  	return () => {

  		const textInput = this.refs[`textInput${index}`]
  		const linkInput = this.refs[`linkInput${index}`]

  		this.props.dispatch({
  			type:"UPDATE_FriendlyLink",
  			payload:{
  				index,
  				name:textInput.value,
  				link:linkInput.value
  			}
  		})
  	}
  }

  submitHandler = () => {
  	this.props.dispatch(dispatch => {
  		post('friendly_link',this.props.friendly_link)
  		.then(r=>alert('success!'));
  	})
  }
}

export default connect(store => {
	return {
		friendly_link:(store && store.friendly_link) ? store.friendly_link : []
	}
})(FriendlyLink);
