import React, { Component } from 'react';
import Counter from './Counter';

class ReplyForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      comments: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) { 
    e.preventDefault();

    let { value, comments } = this.state;
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
        });
      }
    }

  render() { 
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
      </div>
    );
  }
}

export default ReplyForm;