import instance, { chatApi, setChatToken } from "./axios"

export const tokenFactory = async (): Promise<string> => {
  try {
    const response = await instance.get('/chat/token')
    setChatToken(response?.data?.access_token)
    return response?.data?.access_token
  } catch (error) {
    console.error(error)
    return ''
  }
}

export const initApp = ({ user_id, type }): any => {
  instance.get(`/chat/contextual/${user_id}/?type=${type}`)
    .then(response => {
      console.log(response?.data);
      return response?.data
    })
    .catch(err => console.error(err))
  return null
}

// export const sendMessage = ({ id, text, token = '' }) => {
//   const response = chatApi.post(`/api/apps/${id}/messages`,
//     { text: text },
//     // {
//     //   headers: {
//     //     "content-type": "application/json",
//     //     Authorization: `Bearer ${token}`,
//     //   }
//     // }
//   );

//   if (!response?.data?.ok) {
//     throw new Error("Could not send message with api!", { cause: response });
//   }

//   return response?.data;
// };