import React, { useState } from 'react'
import { Alert, Button, Form, FormControl, InputGroup } from 'react-bootstrap'

export default function TweetForm({ onTweet }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // send tweet content to API
        fetch('/api/v1/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    // refresh tweets from API
                    onTweet(data)
                    // and clear form
                    setContent('')
                }
            })

    }

    return (
        <Form onSubmit={handleSubmit}>
            {error && (<Alert variant="danger">{error}</Alert>)}
            <InputGroup className="mb-3">
                <FormControl
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on ya mind?"
                    aria-label="Tweet Content"
                />
                <Button type="submit" variant="primary">
                    Tweet
                </Button>
            </InputGroup>
        </Form>
    )
}