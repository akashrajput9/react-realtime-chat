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
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TextMsg } from './MsgTypes';  // Assuming you're rendering TextMsg

const Message = ({ menu }) => {
  const { messages } = useSelector((state) => state.messages);
  
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
