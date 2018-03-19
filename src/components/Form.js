import React, { Component } from 'react';
import Counter from './Counter';

class Form extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      comments: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createComments = this.createComments.bind(this);
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
    }
    console.log(comments)
    e.preventDefault();
  }
  
  createComments(comment) {
    console.log(comment)
    let {comments} = this.state;
    let filteredComments;
    return (
      <dd key={comment.key}>

          {comment.text}
          <Counter/>
      </dd>
    );
  }

	render() {
    let commentItems = this.state.comments.map(this.createComments)
    return (
      <div className='mainform'>
        <form onSubmit={this.handleSubmit}>
          <label>
              Comment: <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
        </form>
        <ol>
          {commentItems}
        </ol>
      </div>
    );
  }
}

export default Form;