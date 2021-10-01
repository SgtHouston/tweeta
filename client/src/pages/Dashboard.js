import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Tweet from '../components/Tweet'
import TweetForm from '../components/TweetForm'

function Dashboard() {
    const [tweets, setTweets] = useState([])
    const { user } = useSelector(state => state.user);

    const fetchTweets = (data) => {
        fetch('/api/v1/tweets')
            .then(res => res.json())
            .then(data => {
                setTweets(data)
            })
    }

    useEffect(() => {
        fetchTweets()
    }, [])

    return (
        <Container>
            {user && <TweetForm onTweet={fetchTweets} />}
            {tweets.map((tweet) => {
                return (
                    <Tweet key={tweet.id} tweet={tweet} />
                )
            })}
        </Container>
    )
}

export default Dashboard
