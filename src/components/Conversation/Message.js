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
import { TextMsg } from './MsgTypes';  // Assuming you're rendering TextMsg
import { socket } from '../../socket';
import { dispatch } from '../../redux/store';
import { addMessage } from '../../redux/slices/messageSlice';
import { moveChatToTop, setRead } from '../../redux/slices/chatSlice';

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

  socket.emit("register", user.id); // Send user ID to the server

  socket.on("receive_message", (data) => {
      data = data.data;
      dispatch(moveChatToTop(data));

      if (data.conversation_id === messages.conversation_element?.id && data.user_id !== user.id) {
          dispatch(addMessage(data));
          dispatch(setRead(data.conversation_id));
      }
  });

  return () => {
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
          switch (el.type) {
            case 'text':
              return <TextMsg key={index} el={el} menu={menu} />;
            // Add more cases for other message types (e.g., Media, Link, etc.)
            default:
              return <></>;
          }
        })}
      </Stack>
      {/* This empty div will serve as the scroll target */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default Message;
