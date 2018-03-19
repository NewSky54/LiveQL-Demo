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
    console.log("Creating")
    return (
      <div className="comments" key={comment.key}>
          {comment.text}
          <Counter/>
          <button id='delete-button' onClick={() => this.delete(comment.key)}> Delete </button>
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