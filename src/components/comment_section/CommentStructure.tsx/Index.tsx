import './CommentStructure.scss'
import { useContext } from 'react'
import InputField from '../InputField/Index'
import { Menu, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css'
import DeleteModal from './DeleteModal'
import React from 'react'
import { CommentsContext } from '@/context/comments'
import getTimeDifference from '../../../utils/time_diff'
import Link from 'next/link'

interface CommentStructureProps {
  info: {
    user_id: string
    comment_id: string
    fullName: string
    avatarUrl: string
    text: string
    date: string
    userProfile: string
    replies?: Array<object> | undefined
  }
  editMode: boolean
  parentId?: string
  replyMode: boolean
  logIn: {
    loginLink: string
    signupLink: string
  }
}

const CommentStructure = ({
  info,
  editMode,
  parentId,
  replyMode
}: CommentStructureProps) => {
  const globalStore: any = useContext(CommentsContext)
  const currentUser = globalStore.currentUserData

  const optionsMenu = () => {
    return (
      <div className='userActions'>
        {info.user_id === currentUser.currentUserId && (
          <Menu
            menuButton={
              <button className='actionsBtn'>
                {' '}
                <div className='optionIcon' />
              </button>
            }
          >
            <MenuItem
              onClick={() => globalStore.handleAction(info.comment_id, true)}
            >
              edit
            </MenuItem>
            <MenuItem>
              <DeleteModal comment_id={info.comment_id} parentId={parentId} />
            </MenuItem>
          </Menu>
        )}
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div className='commentsTwo'>
        <Link className='userLink' target='_blank' href={info.userProfile}>

          <img
            src={info.avatarUrl}
            alt='userIcon'
            className='imgdefault'
            style={
              globalStore.imgStyle || {}
            }
          />

        </Link>
        <div className='infoSection'>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px'
          }}>
            <div className='fullName'>{info.fullName} </div>
            <div className='commentDate'>{getTimeDifference(info.date)}</div>
          </div>
          <div className='commentText'>{info.text}</div>
        </div>
      </div>
    )
  }

  const replyTopSection = () => {
    return (
      <div className='halfDiv'>
        <div className='userInfo'>
          {userInfo()}
          <div>{info.text}</div>
        </div>
        {currentUser && optionsMenu()}
      </div>
    )
  }

  const replyBottomSection = () => {
    return (
      <div className='halfDiv'>
        <div className='userInfo'>
          {userInfo()}
          {/* {globalStore.advancedInput ? (
            <div
              className='infoStyle'
              dangerouslySetInnerHTML={{
                __html: info.text
              }}
            />
          ) : (
            <div className='infoStyle'>{info.text}</div>
          )} */}
          <div style={{ marginLeft: 60 }}>
            {' '}
            {currentUser && !parentId ? (
              <div>
                <button
                  className='replyBtn'
                  onClick={() => globalStore.handleAction(info.comment_id, false)}
                >
                  <svg className='replyIcon' width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.91676 15.4167L0.833008 18.625V1.66667C0.833008 1.42355 0.929585 1.19039 1.10149 1.01849C1.2734 0.846577 1.50656 0.75 1.74967 0.75H18.2497C18.4928 0.75 18.726 0.846577 18.8979 1.01849C19.0698 1.19039 19.1663 1.42355 19.1663 1.66667V14.5C19.1663 14.7431 19.0698 14.9763 18.8979 15.1482C18.726 15.3201 18.4928 15.4167 18.2497 15.4167H4.91676ZM4.28243 13.5833H17.333V2.58333H2.66634V14.8529L4.28243 13.5833ZM9.08301 7.16667H10.9163V9H9.08301V7.16667ZM5.41634 7.16667H7.24968V9H5.41634V7.16667ZM12.7497 7.16667H14.583V9H12.7497V7.16667Z" fill="#686868" />
                  </svg>
                  <span style={{ marginLeft: '26px' }}>
                    Отвечать
                  </span>
                </button>
              </div>
            )
              : !parentId ? (
                <div style={{
                  padding: '10px'
                }} />
              )
                : null}
          </div>
        </div>
        {currentUser && optionsMenu()}
      </div>
    )
  }

  const actionModeSection = (mode: string) => {
    if (mode === 'reply') {
      return (
        <div className='replysection'>
          {globalStore.replyTop ? replyTopSection() : replyBottomSection()}
          <InputField
            formStyle={{
              backgroundColor: 'transparent',
              padding: '20px 0px 20px 50px',
            }}
            comment_id={info.comment_id}
            fillerText={''}
            mode={'replyMode'}
            parentId={parentId}
          />
        </div>
      )
    } else {
      return (
        <InputField
          formStyle={{
            backgroundColor: 'transparent',
            padding: '20px 0px',
            marginLeft: '-15px'
          }}
          comment_id={info.comment_id}
          fillerText={info.text}
          mode={'editMode'}
          parentId={parentId}
        />
      )
    }
  }

  return (
    <div style={!parentId ? { marginTop: '48px' } : {}}>
      {editMode
        ? actionModeSection('edit')
        : replyMode
          ? actionModeSection('reply')
          : globalStore.replyTop
            ? replyTopSection()
            : replyBottomSection()}
    </div>
  )
}

export default CommentStructure
