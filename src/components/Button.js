import React, { Component } from 'react';
require('isomorphic-fetch');


class Button extends React.Component {
  constructor() {
    super();
    this.state = {}
    this.increment = this.increment.bind(this)
  }

  increment(e) {
    e.preventDefault();
    const _id = e.target.id;
    const increaseLikes = `
    mutation increaseLikes($_id: String!) {
      increaseLikes(_id: $_id) {
        topicId
        _id
        author
        text
        netScore
      }
    }
    `;
  
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: increaseLikes,
        variables: { _id }
      }),
    })
    .then(res => res.json())

  }

	render() {
    return (
        <span> 
          <button className='like-button' id={this.props.id} onClick={this.increment}>Like {this.props.likeCount}</button>
				</span>
			);
  }
}

export default Button;