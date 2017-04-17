import React, { Component } from 'react';
import { connect } from 'react-redux'
import { post } from '../components/Net';

class SearchPlaceholder extends Component {
  componentDidUpdate(){
    this.refs.inputItem.value = this.props.placeholder;
  }

  render() {
    return (
      <div>
        <label htmlFor="placeholder">搜索框占位文字</label><br/>
        <input type="text" ref="inputItem" id="placeholder"/><br/>
        <button onClick={ this.submit }>提交</button>
      </div>
    );
  }

  submit = (ev) => {    
    this.props.dispatch(dispatch => {
      
      post('search_placeholder',{
        placeholder:this.refs.inputItem.value
      }).then(r => {
        dispatch({
          type:'UPDATE_PLACEHOLDER',
          payload:{
            text:this.refs.inputItem.value
          }
        })

        alert('Success!');
      })
    })

  }
}

export default connect((store) => {
  return {
    placeholder:store.search_placeholder
  }
})(SearchPlaceholder);
