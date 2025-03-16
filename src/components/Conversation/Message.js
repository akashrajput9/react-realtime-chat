// import { Box, Stack } from '@mui/material'
// import React, { useEffect } from 'react';
// import {Chat_History} from '../../data'
// import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';
// import { useSelector } from 'react-redux';

// const Message = ({menu}) => {
//   const { messages } = useSelector((state) => state.messages);
  
//   return (
//     <Box p={3}>
//         <Stack spacing={3}>
//             {[...messages?.data].reverse().map((el,index)=>{
//               switch(el.type){
//                 case 'text': 
//                   return <TextMsg key={index} el={el} menu={menu} />
//               }
//                 // switch (el.type) {
//                 //     case 'divider':
//                 //       return <TimeLine key={index} el={el}/>
                        
//                 //     case 'msg':
//                 //         switch (el.subtype) {
//                 //             case 'img':
//                 //               return <MediaMsg key={index} el={el} menu={menu}/>
//                 //             case 'doc':
//                 //                 return <DocMsg key={index} el={el} menu={menu}/>
                                
//                 //             case 'link':
//                 //                 return <LinkMsg key={index} el={el} menu={menu}/>
//                 //             case 'reply':
//                 //                 return <ReplyMsg key={index} el={el} menu={menu}/>
                        
//                 //             default:
//                 //                return <TextMsg key={index} el={el} menu={menu}/>
//                 //         }
//                 //         break;
                
//                 //     default:
//                 //       return <></>;
//                 // }
//             })}
//         </Stack>
//     </Box>
//   )
// }

// export default Message


import { Box, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg } from './MsgTypes';  // Assuming you're rendering TextMsg
import { socket } from '../../socket';
import { dispatch } from '../../redux/store';
import { addMessage } from '../../redux/slices/messageSlice';
import { addChat, handleNewMessage, moveChatToTop, setRead } from '../../redux/slices/chatSlice';

const Message = ({ menu }) => {
const { messages } = useSelector((state) => state.messages);
const { user } = useSelector((state) => state.auth);
// useEffect(() => {

//   socket.on("connection", (socket) => {
//       console.log(`User connected: ${socket.id}`);

//       // Handle user authentication (you should pass userId when connecting)
//       socket.on("register", (userId) => {
//           socket.join(`user_${userId}`);
//           socket.userId = userId; // Store userId in socket object
//           console.log(userId,'user id')
//       });
//       socket.on("receive_message", (data) => {
//           console.log("Message received from server:", data.data.conversation_id,messages.conversation_element.id,data.data.user_id,user.id);
//           dispatch(moveChatToTop(data.data))
//           if(data.data.conversation_id === messages.conversation_element.id  && data.data.user_id != user.id){
//             dispatch(addMessage(data.data))
//             dispatch(setRead(data.data?.conversation_id))
//           }
//       });

//       socket.on("disconnect", () => {
//           console.log(`User disconnected: ${socket.id}`);
//       });
//     });

//     // Listen for 'receive_message' event
    
//     return () => {
//         // Clean up the event listener on component unmount
//         socket.off("receive_message");
//     };
// }, [messages.conversation_element?.id, user.id, dispatch]);

useEffect(() => {
  if (!user?.id) return; // Ensure user is logged in before proceeding
  if (!socket.connected) {
    console.log("Socket is not connected. Waiting to connect...");
    socket.connect(); // Ensure connection is established
  }

  console.log("Socket connected:", socket.connected);

  socket.emit("register", user.id); // Send user ID to the server
  console.log("Register event emitted:", user.id);

  socket.on("receive_message", (data) => {
      console.log("Socket received:", data);

      data = data.data;

      // Extract conversation details
      const conversation = data.conversation;
      const lastMessage = {
          id: data.id,
          conversation_id: data.conversation_id,
          user_id: data.user_id,
          content: data.content,
          created_at: data.created_at,
      };

      // Ensure messages.chats is defined before accessing it
      const chats = messages?.chats || [];

      // Check if the chat already exists in state
      const chatExists = chats.some(chat => chat.id === conversation.id);

      if (!chatExists) {
          // If chat does not exist, add it
          dispatch(addChat({ ...conversation, last_message: lastMessage }));
      } else {
          // If chat exists, update last message & move to top
          dispatch(handleNewMessage(data));
      }

      // If the message is for the currently open chat and not from the logged-in user
      if (data.conversation_id === messages?.conversation_element?.id && data.user_id !== user.id) {
          dispatch(addMessage(data));
          dispatch(setRead(data.conversation_id));
      }
  });



  return () => {
    console.log("Cleaning up socket listener...");
    socket.off("receive_message");
  };
}, [user?.id, messages.conversation_element?.id, dispatch]);


  // Ref to the messages container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Re-run this effect when `messages` change

  return (
    <Box p={3}>
        <Stack spacing={3}>
        {[...messages?.data].reverse().map((el, index) => {
          const { attachments } = el;
          let hasAttachments = attachments && attachments.length > 0;

          if (hasAttachments) {
            const file = attachments[0]; 

            if (file.file_type.startsWith("image/")) {
              return <MediaMsg key={index} el={{ ...el, img: file.file_path }} menu={menu} />;
            } 
            if (file.file_type === "application/pdf" || file.file_type.startsWith("application/")) {
              return <DocMsg key={index} el={{ ...el, file }} menu={menu} />;
            }
          }

          // Handle message types without attachments
          switch (el.type) {
            case 'link':
              return <LinkMsg key={index} el={el} menu={menu} />;
            case 'reply':
              return <ReplyMsg key={index} el={el} menu={menu} />;
            default:
              return <TextMsg key={index} el={el} menu={menu} />;
          }
        })}
      </Stack>
      {/* This empty div will serve as the scroll target */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default Message;
