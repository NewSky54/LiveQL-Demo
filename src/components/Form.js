import React, { Component } from 'react';
import Counter from './Counter';

class Form extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      comments: [],
      onComment: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createComments = this.createComments.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) { // Gets call when the form is submitted
    e.preventDefault();
    let { value, comments, onComment } = this.state;

    const addComment = `
      mutation addComment($topicId: String!, $text: String!, $netScore: Int) {
        addComment(topicId: $topicId, text: $text, netScore: $netScore) {
          _id
          topicId
          text
          netScore
        }
      }
    `;
    if (value !== '') {

      let newArr = [...comments];
      newArr.unshift({
        key: Date.now(),
        text: value,
      })

      this.setState({
        comments: newArr,
        value: ''
      }, 
      () => {
        fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: addComment,
            variables: {
              topicId: this.props.id,
              text: this.state.comments[0].text,
              netScore: 0
            }
          }),
        })
          .then(res => res.json())
          .then(res => this.setState({ onComment: res.data })) 
        });
      }
    }

    createComments(){
      return this.state.onComment.map(({ _id, topicId, text, netScore }) => {
        return (
          <div className='commentss'> 
            {text} 
            <Counter id={_id} likeCount={netScore}/>
          </div>
        );
      });
    }


  render() { 
    // map over elements in state. Save in createComments
    return (
      <div className='mainform'>
        <form onSubmit={this.handleSubmit}>
          <label>
              <input
                placeholder="Reply"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
          </label>
        </form>
        {/* <div>
          {this.createComments}
        </div> */}
      </div>
    );
  }
}

export default Form;