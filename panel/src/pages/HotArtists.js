import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net';

class HotArtist extends Component {
  render() {
    return (
      <div>
      	<h3>新歌首发</h3>
      	{ this.getItems() }
      	{ this.showAddItem() }
      	<br/>
      	<button onClick={ this.submitHandler }>提交</button>
      </div>
    );
  }

  getItems = () => {
  	return this.props.flatten_hot_artists.map((song,index) => {
  		const {
  			name,image_url,link,language
  		} = song;

  		return (
  			<div style={{marginBottom:20}} key={index+link}>
  				<span>歌手</span>
  				<input defaultValue={ name } onBlur={ this.update(index) } ref={`name${index}`}/><br/>
  				<span>图片地址</span>
  				<input defaultValue={ image_url } onBlur={ this.update(index) } ref={`image${index}`}/><br/>
  				<span>链接</span>
  				<input defaultValue={ link } onBlur={ this.update(index) } ref={`link${index}`}/><br/>
  				<span>语种</span>
  				<select defaultValue={ language } onBlur={ this.update(index) } ref={`language${index}`}>
  					<option value="chinese">chinese</option>
  					<option value="european">european</option>
  					<option value="korea">korea</option>
  					<option value="japanese">japanese</option>
  				</select>
  				<br/>
  				<span onClick={ this.deleteItem(index) }> × </span>
  			</div>
			)
  	})
  }

  deleteItem = (index) => {
  	return () => {
  		this.props.dispatch({
  			type:'DELETE_HOT_ARTIST',
  			payload:{
  				index
  			}
  		})
  	}
  }

  showAddItem = () => {
  	return (
  		<div>
  			<span>歌手</span>
  			<input  ref="addName"/><br/>
  			<span>图片地址</span>
  			<input  ref="addImage"/><br/>
  			<span>链接</span>
  			<input  ref="addLink"/><br/>
  			<span>语种</span>
  			<select ref="changeLanguage" defaultValue="chinese">
  				<option value="chinese">chinese</option>
  				<option value="european">european</option>
  				<option value="korea">korea</option>
  				<option value="japanese">japanese</option>
  			</select>
  			<br/>
  			<span onClick={ this.addItem }> + </span>
  		</div>
		)
  }

  addItem = () => {
    const {
      addName,
      addLink,
      addImage,
      changeLanguage,
    } = this.refs;

    if( 
      !addName.value ||
      !addLink.value ||
      !addImage.value
    ){
      return;
    }

    this.props.dispatch({
      type:'ADD_HOT_ARTIST',
      payload:{
        name:addName.value,
        image_url:addImage.value,
        link:addLink.value,
        language:changeLanguage.value,
      }
    })

    addName.value = "";
    addLink.value = "";
    addImage.value = "";
    changeLanguage.value = "chinese";
  }

  update = (index) => {
    return () => {
      this.props.dispatch({
        type:'UPDATE_HOT_ARTIST',
        payload:{
          index,
          name:this.refs[`name${index}`].value,
          image_url:this.refs[`image${index}`].value,
          link:this.refs[`link${index}`].value,
          language:this.refs[`language${index}`].value
        }
      })
    }
  }

  submitHandler = () => {
    this.props.dispatch(dispatch => {
      post('hot_artists',this.props.flatten_hot_artists)
      .then(r=>alert('success!'));
    })
  }
}

export default connect((store) => {
	return {
		flatten_hot_artists:(store.flatten_hot_artists) ? store.flatten_hot_artists : []
	}
})(HotArtist);
