import React from 'react'
import { images } from '../../constants'
import { FiMessageSquare } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CommentForm from './CommentForm';


const Comment = ({ comment, logginedUserId, affectedComment, setAffectedComment, addComment, parentId = null, updateComment, }) => {
    const isUserLoggined = Boolean(logginedUserId);
    const commentBelongsToUser = logginedUserId == comment.user._id;
    const isReplying = affectedComment && affectedComment.type === 'replying' && affectedComment._id === comment._id;
    const isEditing = affectedComment && affectedComment.type === 'editing' && affectedComment._id === comment._id;
    const repliedCommentId = parentId ? parentId : comment._id;
    const replyOnUserId = comment.user._id;
    return (
        <div className='flex flex-norwrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg'>
            <img src={images.Post1Profile} alt="user profile" className='w-9 h-9 object-cover rounded-full' />
            <div className='flex-1 flex flex-col'>
                <h5 className='font-bold text-dark-hard text-xs'>{comment.user.name}</h5>
                <span className='text-xs text-dark-light'>
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: 'numeric',
                        hour: '2-digit',
                    })}
                </span>
                {!isEditing && (
                    <p className='font-opensans mt-[10px] text-dark-light'>{comment.desc}</p>
                )}
                {isEditing && (
                    <CommentForm btnLabel="Update" formSubmitHandler={(value) => updateComment(value, comment._id)}
                        formCancelHandler={() => setAffectedComment(null)}
                        initalText={comment.desc}
                    />
                )}
                < div className='flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3'>
                    {isUserLoggined && (<button className='flex items-center space-x-2' onClick={() => setAffectedComment({ type: 'replying', _id: comment._id })}>
                        <FiMessageSquare className='w-4 h-auto' />
                        <span>Reply</span>
                    </button>)}
                    {commentBelongsToUser && (
                        <>
                            <button className='flex items-center space-x-2' onClick={() => setAffectedComment({ type: 'editing', _id: comment._id })}>
                                <MdOutlineEdit className='w-4 h-auto' />
                                <span>Edit</span>
                            </button>
                            <button className='flex items-center space-x-2'>
                                <MdDelete className='w-4 h-auto' />
                                <span>Delete</span>
                            </button>
                        </>
                    )}
                </div>
                {isReplying && (
                    <CommentForm btnLabel="Reply" formSubmitHandler={(value) => addComment(value, repliedCommentId, replyOnUserId)
                    }
                        formCancelHandler={() => setAffectedComment(null)} />
                )}
            </div>
        </div >
    )
}
export default Comment