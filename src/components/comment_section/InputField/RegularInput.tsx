import React from 'react'
import './InputField.scss'
import { useContext } from 'react'
import { CommentsContext } from '@/context/comments'
import EmojiInput from './EmojiInput'
import Buttons from '@/components/buttons'
import { SxProps } from '@mui/system'

interface RegularInputProps {
  formStyle?: SxProps
  comment_id?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
  handleSubmit: Function
  text: string
  setText: Function
}

const RegularInput = ({
  formStyle,
  imgDiv,
  imgStyle,
  customImg,
  mode,
  inputStyle,
  cancelBtnStyle,
  comment_id,
  submitBtnStyle,
  handleSubmit,
  text,
  setText
}: RegularInputProps) => {
  const globalStore: any = useContext(CommentsContext)

  if (mode) formStyle = {
    paddingBottom: '0 !important',
    ...formStyle
  }

  return (
    <form
      className='form'
      style={globalStore.formStyle || formStyle}
      onSubmit={() => handleSubmit}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        marginBottom: '16px',
      }}>
        <div className='userImg' style={imgDiv}>
          <a
            target='_blank'
            href={globalStore.currentUserData.currentUserProfile}
          >
            <img
              src={
                globalStore.customImg ||
                customImg ||
                globalStore.currentUserData.currentUserImg
              }
              style={globalStore.imgStyle || imgStyle}
              alt='userIcon'
              className='imgdefault'
            />
          </a>
        </div>
        {globalStore.removeEmoji ? (
          <input
            className='postComment'
            style={
              mode === 'replyMode' || mode === 'editMode'
                ? globalStore.replyInputStyle
                : globalStore.inputStyle || inputStyle
            }
            type='text'
            placeholder='Напишите свой комментарий здесь.'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <EmojiInput
            text={text}
            setText={setText}
            mode={mode}
            inputStyle={inputStyle}
          />
        )}

      </div>

      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        {mode &&
          <Buttons
            className='borderless__btn'
            sx={globalStore.cancelBtnStyle ||
            {
              ...cancelBtnStyle,
            }
            }
            type='button'
            onClick={() =>
              mode === 'editMode'
                ? globalStore.handleAction(comment_id, true)
                : globalStore.handleAction(comment_id, false)
            }
          >
            Отмена
          </Buttons>
        }

        <Buttons
          className={text != '' ? 'login__btn' : 'login__btn--disabled'}
          type='submit'
          disabled={text != '' ? false : true}
          sx={globalStore.submitBtnStyle ||
          {
            ...submitBtnStyle,
            marginLeft: '5px'
          }
          }
          onClick={(e) => (text ? handleSubmit(e) : null)}
        >
          Отправлять
        </Buttons>
      </div>
    </form>
  )
}

export default RegularInput
