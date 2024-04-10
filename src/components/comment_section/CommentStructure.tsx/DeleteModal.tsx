import { useState, useContext } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { CommentsContext } from '@/context/comments'

interface DeleteModalProps {
  comment_id: string
  parentId?: string
}

const DeleteModal = ({ comment_id, parentId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const globalStore: any = useContext(CommentsContext)

  return (
    <div>
      <div style={{ width: '100%' }} onClick={onOpenModal}>
        delete
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Are you sure?</h2>
        <p>Once you delete this comment it will be gone forever.</p>
        <div className='deleteBtns'>
          <button
            className='delete'
            onClick={async () => (
              await globalStore.onDelete(comment_id, parentId),
              globalStore.onDeleteAction &&
              (await globalStore.onDeleteAction({
                comIdToDelete: comment_id,
                parentOfDeleteId: parentId
              }))
            )}
          >
            Delete
          </button>
          <button className='cancel' onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
