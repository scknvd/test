import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../components/Net';

class First extends Component {
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
  	return this.props.flatten_first.map((song,index) => {
  		const {
  			name,artist,time,play_link,download_link,is_only,language
  		} = song;

  		return (
  			<div style={{marginBottom:20}} key={index+play_link}>
  				<span>歌名</span>
  				<input defaultValue={ name } onBlur={ this.update(index) } ref={`name${index}`}/><br/>
  				<span>歌手</span>
  				<input defaultValue={ artist } onBlur={ this.update(index) } ref={`artist${index}`}/><br/>
  				<span>时间</span>
  				<input defaultValue={ time } onBlur={ this.update(index) } ref={`time${index}`}/><br/>
  				<span>下载链接</span>
  				<input defaultValue={ download_link } onBlur={ this.update(index) } ref={`download${index}`}/><br/>
  				<span>播放链接</span>
  				<input defaultValue={ play_link } onBlur={ this.update(index) }  ref={`play${index}`}/><br/>
  				<span>独家</span>
  				<input type="text" defaultValue={ is_only } onBlur={ this.update(index) }  ref={`only${index}`}/>
  				<br/>
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
  			type:'DELETE_FIRST',
  			payload:{
  				index
  			}
  		})
  	}
  }

  showAddItem = () => {
  	return (
  		<div>
  			<span>歌名</span>
  			<input  ref="addName"/><br/>
  			<span>歌手</span>
  			<input  ref="addArtist"/><br/>
  			<span>时间</span>
  			<input  ref="addTime"/><br/>
  			<span>下载链接</span>
  			<input  ref="addDownload"/><br/>
  			<span>播放链接</span>
  			<input  ref="addPlay"/><br/>
  			<span>独家</span>
  			<input type="text" defaultValue={ 1 } ref="toggleOnly"/>
  			<br/>
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
      addArtist,
      addTime,
      addDownload,
      addPlay,
      changeLanguage,
      toggleOnly
    } = this.refs;

    if( 
      !addName.value ||
      !addArtist.value ||
      !addTime.value ||
      !addDownload.value ||
      !addPlay.value ||
      !toggleOnly.value
    ){
      return;
    }

    this.props.dispatch({
      type:'ADD_FIRST',
      payload:{
        name:addName.value,
        artist:addArtist.value,
        time:addTime.value,
        download_link:addDownload.value,
        play_link:addPlay.value,
        is_only:toggleOnly.value,
        language:changeLanguage.value,
      }
    })

    addName.value = "";
    addArtist.value = "";
    addTime.value = "";
    addDownload.value = "";
    addPlay.value = "";
    toggleOnly.value = 1;
    changeLanguage.value = "chinese";
  }

  update = (index) => {
    return () => {
      this.props.dispatch({
        type:'UPDATE_FIRST',
        payload:{
          index,
          name:this.refs[`name${index}`].value,
          artist:this.refs[`artist${index}`].value,
          time:this.refs[`time${index}`].value,
          download_link:this.refs[`download${index}`].value,
          play_link:this.refs[`play${index}`].value,
          is_only:this.refs[`only${index}`].value,
          language:this.refs[`language${index}`].value
        }
      })
    }
  }

  submitHandler = () => {
    this.props.dispatch(dispatch => {
      post('first',this.props.flatten_first)
      .then(r=>alert('success!'));
    })
  }
}

export default connect((store) => {
	return {
		flatten_first:(store.flatten_first) ? store.flatten_first : []
	}
})(First);
