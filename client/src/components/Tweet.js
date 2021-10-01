import React from 'react'
import { Card } from 'react-bootstrap'
import RelativeTime from './RelativeTime';

function Tweet(props) {
    const { User, content, createdAt } = props.tweet;
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Text>{content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <span className="fw-bolder">{User.username}</span> <RelativeTime time={createdAt} />
            </Card.Footer>
        </Card>
    )
}

export default Tweet