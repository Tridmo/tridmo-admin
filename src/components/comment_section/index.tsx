import * as React from 'react'
import CommentSectionComponent from './CommentSectionComponent/Index'
import CommentsProvider from '@/context/comments'

interface CommentSectionProps {
    currentUser: {
        currentUserId: string
        currentUserImg: string
        currentUserProfile: string
        currentUserFullName: string
    } | null
    logIn: {
        loginLink: string
        signupLink: string
    }
    replyTop?: boolean
    customImg?: string
    inputStyle?: object
    formStyle?: object
    submitBtnStyle?: object
    cancelBtnStyle?: object
    overlayStyle?: object
    imgStyle?: object
    replyInputStyle?: object
    commentsCount?: number
    hrStyle?: object
    titleStyle?: object
    onSubmitAction?: Function
    onDeleteAction?: Function
    onReplyAction?: Function
    onEditAction?: Function
    customNoComment?: Function
    currentData?: Function
    removeEmoji?: boolean
    advancedInput?: boolean
    commentData: Array<{
        user_id: string
        comment_id: string
        fullName: string
        avatarUrl: string
        text: string
        userProfile?: string
        date: string
        replies?:
        | Array<{
            user_id: string
            comment_id: string
            fullName: string
            avatarUrl: string
            text: string
            userProfile?: string
            date: string
        }>
        | undefined
    }>
}

export const CommentSection = ({
    currentUser,
    customImg,
    inputStyle,
    formStyle,
    submitBtnStyle,
    cancelBtnStyle,
    overlayStyle,
    replyInputStyle,
    logIn,
    imgStyle,
    replyTop,
    commentsCount,
    commentData,
    hrStyle,
    titleStyle,
    removeEmoji,
    onSubmitAction,
    onDeleteAction,
    onReplyAction,
    onEditAction,
    customNoComment,
    currentData,
    advancedInput
}: CommentSectionProps) => {

    return (
        <CommentsProvider
            currentUser={currentUser}
            replyTop={replyTop}
            customImg={customImg}
            inputStyle={inputStyle}
            formStyle={formStyle}
            submitBtnStyle={submitBtnStyle}
            cancelBtnStyle={cancelBtnStyle}
            replyInputStyle={replyInputStyle}
            imgStyle={imgStyle}
            commentsCount={commentsCount}
            commentData={commentData}
            onSubmitAction={onSubmitAction}
            onDeleteAction={onDeleteAction}
            onReplyAction={onReplyAction}
            onEditAction={onEditAction}
            currentData={currentData}
            removeEmoji={removeEmoji}
            advancedInput={advancedInput}
        >
            <CommentSectionComponent
                overlayStyle={overlayStyle}
                hrStyle={hrStyle}
                logIn={logIn}
                titleStyle={titleStyle}
                customNoComment={customNoComment}
            />
        </CommentsProvider>
    )
}
