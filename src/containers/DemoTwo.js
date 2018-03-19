import React, { Component } from 'react';
import gql from 'graphql-tag';
import ReactPlayer from 'react-player'
import { CubeGrid } from 'better-react-spinkit'
import FlipMove from 'react-flip-move';
import Header from './../components/Header';
import Comments from './Comments';
import Counter from './../components/Counter';
require('isomorphic-fetch');

class Demotwo extends React.Component {
  constructor() {
    super();
    this.state = {
      onComment: null
    };
  }

  componentWillMount() {
    const query = `
      getAllTopics {
        _id
        topic
        comments {
          _id
          author
          topicId
          text
          netScore
        }
      }`;

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ ${query} }` }),
    })
    .then(res => res.json())
    .then((res) => this.setState({ onComment: res.data }))
  }

  render() {
    let topics;
    if (this.state.onComment) {

      topics = this.state.onComment.getAllTopics.map(({ _id, topic, comments }) => {
        return (
          <div className='comments' key={_id}>
            {topic}
            {<Counter/>}
            {comments.map(({ _id, text }) => <div key={'text' + _id}>{text} {<Counter/>}</div>)}
          </div>
        )
      });
      return (
        <div className="parent">
          <Header />
          {/* <ReactPlayer url='https://www.youtube.com/watch?v=dMH0bHeiRNg' /> */}
          <Comments />
        </div>
      )
    } else {
      return (
        <div className="loader">
          <CubeGrid size={300} />
        </div>
      );
    }
  }
}

export default Demotwo;