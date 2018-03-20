import React, { Component } from 'react';
import gql from 'graphql-tag';
import ReactPlayer from 'react-player'
import { CubeGrid } from 'better-react-spinkit'
import FlipMove from 'react-flip-move';
import Header from './../components/Header';
import Comments from './Comments';
import Counter from './../components/Counter';
import Form from './../components/Form.js';
require('isomorphic-fetch');

class Demo extends React.Component {
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
      topics = this.state.onComment.getAllTopics.map(({ _id, topic, comments, netScore }) => {
        return (
          <div className='comments' key={_id}>
            <div className='topics'>
              {topic}
            </div>
            <Form id={_id} />
            {comments.map(({ _id, text, netScore }) => <div className='childComment' key={'text' + _id}>{text} {<Counter id={_id} likeCount={netScore}/>}</div>).reverse()}
          </div>
        );
      }).reverse();
      return (
        <div className="parent">
          <Header />
          <ReactPlayer url='https://vimeo.com/channels/animatedshorts/137531269' />
          <Comments />
          {topics}
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

export default Demo;