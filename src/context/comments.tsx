import React, { createContext, useEffect, useState } from 'react'
// const { v4: uuidv4 } = require('uuid')
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { selectMyProfile } from '../data/me'
import { IMAGES_BASE_URL } from '../utils/image_src'

export const CommentsContext = createContext({})

export const CommentsProvider = ({
    children,
    currentUser,
    replyTop,
    customImg,
    inputStyle,
    formStyle,
    submitBtnStyle,
    cancelBtnStyle,
    imgStyle,
    commentsCount,
    commentData,
    onSubmitAction,
    onDeleteAction,
    onReplyAction,
    onEditAction,
    currentData,
    replyInputStyle,
    removeEmoji,
    advancedInput
}: {
    children: any
    currentUser?: {
        currentUserId: string
        currentUserImg: string
        currentUserProfile?: string | undefined
        currentUserFullName: string
    } | null
    replyTop?: boolean
    customImg?: string
    inputStyle?: object
    formStyle?: object
    submitBtnStyle?: object
    cancelBtnStyle?: object
    imgStyle?: object
    replyInputStyle?: object
    commentsCount?: number
    removeEmoji?: boolean
    commentData?: Array<{
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
    onSubmitAction?: Function
    onDeleteAction?: Function
    onReplyAction?: Function
    onEditAction?: Function
    currentData?: Function
    advancedInput?: boolean
}) => {
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const user = useSelector(selectMyProfile);
    const [currentUserData, setCommentUser] = useState<any>(null)

    React.useEffect(() => {

        if (isAuthenticated && user) {

            setCommentUser({
                currentUserId: user.user_id,
                currentUserImg: user.image_src ? `${IMAGES_BASE_URL}/${user.image_src}` : '/img/avatar.png',
                currentUserProfile: `/designers/${user.username}`,
                currentUserFullName: user.full_name
            })

        }

    }, [isAuthenticated, user])

    const [data, setData] = useState<
        Array<{
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
    >([])
    const [editArr, setEdit] = useState<string[]>([])
    const [replyArr, setReply] = useState<string[]>([])

    useEffect(() => {
        if (commentData) {
            setData(commentData)
        }
    }, [commentData])

    useEffect(() => {
        if (currentData) {
            currentData(data)
        }
    }, [data])

    const handleAction = (id: string, edit: boolean) => {
        if (edit) {
            let editArrCopy: string[] = [...editArr]
            let indexOfId = _.indexOf(editArrCopy, id)
            if (_.includes(editArr, id)) {
                editArrCopy.splice(indexOfId, 1)
                setEdit(editArrCopy)
            } else {
                editArrCopy.push(id)
                setEdit(editArrCopy)
            }
        } else {
            let replyArrCopy: string[] = [...replyArr]
            let indexOfId = _.indexOf(replyArrCopy, id)
            if (_.includes(replyArr, id)) {
                replyArrCopy.splice(indexOfId, 1)
                setReply(replyArrCopy)
            } else {
                replyArrCopy.push(id)
                setReply(replyArrCopy)
            }
        }
    }

    const onSubmit = (text: string, uuid: string, date: string) => {
        let copyData = [...data]
        copyData.unshift({
            user_id: currentUserData!.currentUserId,
            comment_id: uuid,
            avatarUrl: currentUserData!.currentUserImg,
            userProfile: currentUserData!.currentUserProfile
                ? currentUserData!.currentUserProfile
                : undefined,
            fullName: currentUserData!.currentUserFullName,
            text: text,
            date: date,
            replies: []
        })
        setData(copyData)

    }

    const onEdit = (text: string, comment_id: string, parentId: string) => {
        let copyData = [...data]
        if (parentId) {
            const indexOfParent = _.findIndex(copyData, { comment_id: parentId })
            const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
                comment_id: comment_id
            })
            copyData[indexOfParent].replies![indexOfId].text = text
            setData(copyData)
            handleAction(comment_id, true)
        } else {
            const indexOfId = _.findIndex(copyData, { comment_id: comment_id })
            copyData[indexOfId].text = text
            setData(copyData)
            handleAction(comment_id, true)
        }
    }

    const onReply = (
        text: string,
        comment_id: string,
        parentId: string,
        uuid: string,
        date: string
    ) => {
        let copyData = [...data]
        if (parentId) {
            const indexOfParent = _.findIndex(copyData, { comment_id: parentId })
            copyData[indexOfParent].replies!.push({
                user_id: currentUserData!.currentUserId,
                comment_id: uuid,
                avatarUrl: currentUserData!.currentUserImg,
                userProfile: currentUserData!.currentUserProfile
                    ? currentUserData!.currentUserProfile
                    : undefined,
                fullName: currentUserData!.currentUserFullName,
                text: text,
                date: date,
            })
            setData(copyData)
            handleAction(comment_id, false)
        } else {
            const indexOfId = _.findIndex(copyData, {
                comment_id: comment_id
            })
            copyData[indexOfId].replies!.push({
                user_id: currentUserData!.currentUserId,
                comment_id: uuid,
                avatarUrl: currentUserData!.currentUserImg,
                userProfile: currentUserData!.currentUserProfile
                    ? currentUserData!.currentUserProfile
                    : undefined,
                fullName: currentUserData!.currentUserFullName,
                text: text,
                date: new Date().toString(),
            })
            setData(copyData)
            handleAction(comment_id, false)
        }
    }

    const onDelete = (comment_id: string, parentId: string) => {
        let copyData = [...data]
        if (parentId) {
            const indexOfParent = _.findIndex(copyData, { comment_id: parentId })
            const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
                comment_id: comment_id
            })
            copyData[indexOfParent].replies!.splice(indexOfId, 1)
            setData(copyData)
        } else {
            const indexOfId = _.findIndex(copyData, { comment_id: comment_id })
            copyData.splice(indexOfId, 1)
            setData(copyData)
        }
    }

    return (
        <CommentsContext.Provider
            value={{
                currentUserData: currentUserData,
                replyTop: replyTop,
                data: data,
                handleAction: handleAction,
                editArr: editArr,
                onSubmit: onSubmit,
                onEdit: onEdit,
                replyArr: replyArr,
                onReply: onReply,
                onDelete: onDelete,
                customImg: customImg,
                inputStyle: inputStyle,
                formStyle: formStyle,
                submitBtnStyle: submitBtnStyle,
                cancelBtnStyle: cancelBtnStyle,
                imgStyle: imgStyle,
                commentsCount: commentsCount,
                onSubmitAction: onSubmitAction,
                onDeleteAction: onDeleteAction,
                onReplyAction: onReplyAction,
                onEditAction: onEditAction,
                replyInputStyle: replyInputStyle,
                removeEmoji: removeEmoji,
                advancedInput: advancedInput
            }}
        >
            {children}
        </CommentsContext.Provider>
    )
}

export default CommentsProvider
