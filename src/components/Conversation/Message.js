import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react';
import {Chat_History} from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';
import { useSelector } from 'react-redux';

const Message = ({menu}) => {
  const { messages } = useSelector((state) => state.messages);
  // useEffect(()=>{
  //   console.log(messages)
  // },[messages])
  return (
    <Box p={3}>
        <Stack spacing={3}>
            {messages?.data.map((el,index)=>{
              switch(el.type){
                case 'text': 
                  return <TextMsg key={index} el={el} menu={menu} />
              }
                // switch (el.type) {
                //     case 'divider':
                //       return <TimeLine key={index} el={el}/>
                        
                //     case 'msg':
                //         switch (el.subtype) {
                //             case 'img':
                //               return <MediaMsg key={index} el={el} menu={menu}/>
                //             case 'doc':
                //                 return <DocMsg key={index} el={el} menu={menu}/>
                                
                //             case 'link':
                //                 return <LinkMsg key={index} el={el} menu={menu}/>
                //             case 'reply':
                //                 return <ReplyMsg key={index} el={el} menu={menu}/>
                        
                //             default:
                //                return <TextMsg key={index} el={el} menu={menu}/>
                //         }
                //         break;
                
                //     default:
                //       return <></>;
                // }
            })}
        </Stack>
    </Box>
  )
}

export default Message