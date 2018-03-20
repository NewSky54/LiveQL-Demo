import React, { Component } from 'react';
import Counter from './../components/Counter';
import Form from './Form';
import FlipMove from 'react-flip-move';

class ChildComments extends React.Component {
  constructor(props) {
    super(props);
    this.createComments = this.createComments.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createComments(comment) {
    const { key, text } = comment;
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
    
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: addTopic,
        variables: { topic: text }
      }),
    })
    .then(res => res.json())
    .then((res) => console.log(res.data))

    console.log("Creating", comment)
    return (
      <div className="comments" key={comment.key}>
        <div className="topics">
          {comment.text}      
        </div>
          {/* <button id='delete-button' onClick={() => this.delete(comment.key)}> Delete </button> */}
          <Form/>
      </div>
    );
  }

	render() {
    let comments = this.props.entries.map(this.createComments)
    return (
      <div>
        <div className="theList">
         <FlipMove duration={300} easing="ease-out">
            {comments}
         </FlipMove>
        </div>
      </div> 
		);
  }
}

export default ChildComments;