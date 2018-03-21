import React, { Component } from 'react';
import gql from 'graphql-tag';
import ReactPlayer from 'react-player'
import { CubeGrid } from 'better-react-spinkit'
import FlipMove from 'react-flip-move';
import Header from './../components/Header';
import CommentForm from './CommentForm';
import Counter from './../components/Counter';
import ReplyForm from './../components/ReplyForm.js';
import liveClient from '../../liveql_modules/liveqlClient'
require('isomorphic-fetch');

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      onComment: null
    };
    this.triggerRefresh = this.triggerRefresh.bind(this)
  }

  triggerRefresh(data) {
   this.setState({ onComment: data.data })
  }

  componentWillMount() {
    liveClient.connect('http://localhost:3000')
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
    .then((res) => {
      this.setState({ onComment: res.data })
      liveClient.on('triggerRefresh', this.triggerRefresh)
    })
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
            <ReplyForm id={_id} />
            {comments.map(({ _id, text, netScore }) => <div className='childComment' key={'text' + _id}>{text} {<Counter id={_id} likeCount={netScore}/>}</div>).reverse()}
          </div>
        );
      }).reverse();
      return (
        <div className="parent">
          <Header />
          <ReactPlayer url='https://vimeo.com/channels/animatedshorts/137531269' />
          <CommentForm />
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