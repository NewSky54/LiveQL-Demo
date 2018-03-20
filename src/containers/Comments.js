import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import ChildComments from './../components/ChildComments';

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      comments: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  
  handleSubmit(e) { // Gets call when the form is submitted
    let { comments, value } = this.state;
    if (value !== '') {
      let newArr = [...comments];
      newArr.unshift({
        key: Date.now(),
        text: value,
        children: []
      })
      this.setState({
        comments: newArr,
        value: ''
      })
      console.log(comments)
      console.log(`Comments array: ${comments}`);
    }
    e.preventDefault();
  }
  
  deleteComment(key) {
    let filteredComments = this.state.comments.filter((item) => {
      return (item.key !== key);
    });
    this.setState({
      comments: filteredComments
    });
    console.log('Comments:', filteredComments)
  } 

  render() {
    return (
      <div>
        <form className='parentForm' onSubmit={this.handleSubmit}>
          <label>
          <input 
            className="parentInput" 
            placeholder="Make a Comment" 
            type="text" 
            value={this.state.value} 
            onChange={this.handleChange} 
          />
          </label>
        </form>
        <ChildComments 
          entries={this.state.comments}  
          delete={this.deleteComment} 
        />
      </div>
    );
  }
}
export default Comments;