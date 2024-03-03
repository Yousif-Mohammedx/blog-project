import React, { useEffect, useState } from 'react'

import { getCommentsData } from "../../data/comments";
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentsContainer = ({ className, logginedUserId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        (async () => {
            const commentData = await getCommentsData();
            setComments(commentData)
        })()
    }, []);
    const mainComments = comments.filter((comment) => comment.parent === null);
    const [affectedComment, setAffectedComment] = useState(null);

    console.log(comments);

    const addCommentHandler = (value, parnet = null, replyOnUser = null) => {
        const newComment = {
            _id: "10",
            user: {
                _id: "a",
                name: "Mohammad Rezaii",
            },
            desc: value,
            post: "1",
            parent: parnet,
            replyOnUser: replyOnUser,
            createdAt: "2022-12-31T17:22:05.092+0000",
        };
        setComments((curState) => {
            return [newComment, ...curState]
        })
    };
    return (
        <div className={`${className}`}>
            <CommentForm btnLabel="Send" formSubmitHandler={(value) => addCommentHandler(value)} />
            <div className='space-y-4 mt-8'>
                {mainComments.map((comment) => (
                    <Comment comment={comment} logginedUserId={logginedUserId} affectedComment={affectedComment} setAffectedComment={setAffectedComment} addComment={addCommentHandler} />
                ))}
            </div>
        </div>
    )
}

export default CommentsContainer;