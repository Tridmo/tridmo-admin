import CommentStructure from '../CommentStructure.tsx/Index'
import InputField from '../InputField/Index'
import './CommentSection.css'
import { useContext, useState } from 'react'
import _ from 'lodash'
import React from 'react'
import LoginSection from '../LoginSection/LoginSection'
import NoComments from './NoComments'
import { CommentsContext } from '@/context/comments'
import { useSelector } from 'react-redux'
import { selectMyProfile } from '../../../data/me'
import { IMAGES_BASE_URL } from '../../../utils/image_src'
import { Box } from '@mui/system'
import { Divider } from '@mui/material'

interface CommentSectionProps {
  overlayStyle?: object
  logIn: {
    loginLink: string
    signupLink: string
  }
  hrStyle?: object
  titleStyle?: object
  customNoComment?: Function
}

const CommentSection = ({
  overlayStyle,
  logIn,
  hrStyle,
  titleStyle,
  customNoComment
}: CommentSectionProps) => {
  const globalStore: any = useContext(CommentsContext)

  const loginMode = () => {
    return (
      <LoginSection
        loginLink={logIn!.loginLink}
        signUpLink={logIn!.signupLink}
      />
    )
  }

  const totalComments = () => {
    let count = 0
    globalStore.data.map((i: any) => {
      count = count + 1
      i.replies.map(() => (count = count + 1))
    })
    return count
  }

  return (
    <div className='overlay' style={overlayStyle}>
      <span className='comment-title' style={titleStyle}>
        {`Комментарии (${globalStore.commentsCount || totalComments()})`}
      </span>
      {globalStore.currentUserData === null ? (
        loginMode()
      ) : (
        <InputField formStyle={{ margin: '10px 0px', padding: '0' }} imgDiv={{ margin: 0 }} />
      )}

      {globalStore.data.length > 0 ? (
        globalStore.data.map(
          (i: {
            user_id: string
            comment_id: string
            fullName: string
            avatarUrl: string
            text: string
            userProfile: string
            date: string
            replies: Array<any> | undefined
          }) => {
            return (
              <div key={i.comment_id}>
                <CommentStructure
                  info={i}
                  editMode={
                    _.indexOf(globalStore.editArr, i.comment_id) === -1
                      ? false
                      : true
                  }
                  replyMode={
                    _.indexOf(globalStore.replyArr, i.comment_id) === -1
                      ? false
                      : true
                  }
                  logIn={logIn}
                />
                {i.replies &&
                  i.replies.length > 0 &&
                  i.replies.map((j) => {
                    return (
                      <Box className='replySection' key={j.comment_id}
                        sx={{
                          marginTop: '32px'
                        }}
                      >
                        <CommentStructure
                          info={j}
                          parentId={i.comment_id}
                          editMode={
                            _.indexOf(globalStore.editArr, j.comment_id) === -1
                              ? false
                              : true
                          }
                          replyMode={
                            _.indexOf(globalStore.replyArr, j.comment_id) === -1
                              ? false
                              : true
                          }
                          logIn={logIn}
                        />
                      </Box>
                    )
                  })}
              </div>
            )
          }
        )
      ) : customNoComment ? (
        customNoComment()
      ) : (
        <NoComments />
      )}
    </div>
  )
}

export default CommentSection
