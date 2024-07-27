"use client";

import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedConversation, setSelectedConversation } from '../../../data/chat';
import { selectMyProfile } from '../../../data/me';
import { tokenFactory } from '../../../utils/chat';
import { WyMessenger, useWeavy } from '@weavy/uikit-react';
import { CHAT_SERVER_URL } from '../../../utils/env_vars';

export default function Chat() {

  const selectedConversation = useSelector(selectSelectedConversation)
  const selected = selectedConversation;

  useEffect(() => {
    if (selected == selectedConversation) {
      setSelectedConversation(null)
    }
  }, [selected])

  return (
    <Box sx={{ background: "#fafafa" }} className="products" >
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
        <Grid container
          sx={{
            m: '32px 0 32px 0',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={12}>
            <WyMessenger
              style={{ height: '80dvh' }}
              noMeetings
              noPolls
              noComments
              noWebDAV
              noConfluence
              conversationId={selected || null}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}