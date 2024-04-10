import './InputField.scss'
import { useContext, useEffect, useState } from 'react'
import { CommentsContext } from '@/context/comments'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import RegularInput from './RegularInput'
import AdvancedInput from './AdvancedInput'

interface InputFieldProps {
  formStyle?: object
  comment_id?: string
  fillerText?: string
  parentId?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
}

const InputField = ({
  formStyle,
  comment_id,
  fillerText,
  parentId,
  mode,
  customImg,
  inputStyle,
  cancelBtnStyle,
  submitBtnStyle,
  imgStyle,
  imgDiv
}: InputFieldProps) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (fillerText) {
      setText(fillerText)
    }
  }, [fillerText])

  const globalStore: any = useContext(CommentsContext)

  const editMode = async (advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onEdit(textToSend, comment_id, parentId),
      globalStore.onEditAction &&
      (await globalStore.onEditAction({
        user_id: globalStore.currentUserData.currentUserId,
        comment_id: comment_id,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        parentOfEditedCommentId: parentId
      }))
    )
  }

  const replyMode = async (replyUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      // await globalStore.onReply(textToSend, comment_id, parentId, replyUuid),
      globalStore.onReplyAction &&
      (await globalStore.onReplyAction({
        user_id: globalStore.currentUserData.currentUserId,
        repliedToCommentId: comment_id,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        parentOfRepliedCommentId: parentId,
        comment_id: replyUuid
      }, globalStore))
    )
  }
  const submitMode = async (createUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      // await globalStore.onSubmit(textToSend, createUuid),
      globalStore.onSubmitAction &&
      (await globalStore.onSubmitAction({
        user_id: globalStore.currentUserData.currentUserId,
        comment_id: createUuid,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        replies: []
      }, globalStore))
    )
  }

  const handleSubmit = async (event: any, advText?: string) => {
    event.preventDefault()
    const createUuid = uuidv4()
    const replyUuid = uuidv4()
    mode === 'editMode'
      ? editMode(advText)
      : mode === 'replyMode'
        ? replyMode(replyUuid, advText)
        : submitMode(createUuid, advText)
    setText('')
  }

  return (
    <div>
      {globalStore.advancedInput ? (
        <AdvancedInput
          handleSubmit={handleSubmit}
          text={mode === 'editMode' ? text : ''}
          formStyle={formStyle}
          mode={mode}
          cancelBtnStyle={cancelBtnStyle}
          submitBtnStyle={submitBtnStyle}
          comment_id={comment_id}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
        />
      ) : (
        <RegularInput
          formStyle={formStyle}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          mode={mode}
          inputStyle={inputStyle}
          cancelBtnStyle={cancelBtnStyle}
          comment_id={comment_id}
          submitBtnStyle={submitBtnStyle}
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
        />
      )}
    </div>
  )
}
export default InputField
