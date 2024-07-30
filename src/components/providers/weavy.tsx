"use client"

import { WyContext } from '@weavy/uikit-react'
import { CHAT_SERVER_URL } from '../../utils/env_vars'
import { tokenFactory } from '../../utils/chat'
import { createContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppTypeGuid } from '../../types/weavy';
import { setSelectedConversation } from '../../data/chat';
import { selectMyProfile } from '../../data/me';

const WeavyContext = createContext({});

export default function WeavyProvider({ children }) {

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const profile = useSelector(selectMyProfile)

  document.addEventListener("wy:link", (e: any) => {
    e.preventDefault()
    const appType = e.detail.app.type;
    const appId = e.detail.app.id;
    if (
      appType == AppTypeGuid['PrivateChat'] &&
      pathname != 'chat'
    ) {
      dispatch(setSelectedConversation(appId))
      router.push(`/chat`)
    }
  });

  return (
    <WeavyContext.Provider value={{}}>
      {
        !!profile &&
        <WyContext
          url={CHAT_SERVER_URL}
          tokenFactory={tokenFactory}
          locales={[
            ["ru-RU", import("../../chat_locales/locales/ru-RU")] // Async pre-loading, started instantly.
          ]}
          locale='ru-RU'
        />
      }
      {children}
    </WeavyContext.Provider>
  );
}
