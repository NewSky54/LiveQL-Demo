import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class CommentForm extends Component {
  constructor(props) {
    super(props)
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
    let { comments, value } = this.state;
    const addTopic = `
      mutation addTopic($topic: String!){
        addTopic (topic: $topic) {
          topic
          comments {
            _id
            author
            topicId
            text
            netScore
          }
        } 
      }
    `;
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
      }, () => {
        fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            query: addTopic,
            variables: { 
              topic: this.state.comments[0].text,
            }
          }),
        })
        .then(res => res.json())
      })
    }
  }
 
  render() {
    return (
      <div>
        <FlipMove duration={300} easing="ease-out">
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
        </FlipMove>
      </div>
    );
  }
}
export default CommentForm;