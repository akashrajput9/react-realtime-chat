// import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { styled, useTheme } from "@mui/material/styles";
// import { LinkSimple, PaperPlaneTilt, Smiley,Camera, File, Image, Sticker, User } from 'phosphor-react';
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import { apifetch } from '../../utils/fetchApi';
// import { useSelector } from 'react-redux';
// import { setMessages } from '../../redux/slices/messageSlice';
// import { dispatch } from '../../redux/store';

// const StyledInput = styled(TextField)(({ theme }) => ({
//     "& .MuiInputBase-input": {
//       paddingTop: '12px',
//       paddingBottom: '12px',
//     }  
//   }));


//   const Actions = [
//     {
//         color:'#4da5fe',
//         icon: <Image size={24}/>,
//         y:102,
//         title:'Photo/Video'
//     },
//     {
//         color:'#1b8cfe',
//         icon: <Sticker size={24}/>,
//         y:172,
//         title:'Stickers'
//     },
//     {
//         color:'#0172e4',
//         icon: <Camera size={24}/>,
//         y:242,
//         title:'Image'
//     },
//     {
//         color:'#0159b2',
//         icon: <File size={24}/>,
//         y:312,
//         title:'Document'
//     },
//     {
//         color:'#013f7f',
//         icon: <User size={24}/>,
//         y:382,
//         title:'Contact'
//     }
//   ];
  
// let inputField = "";
// const ChatInput = ({setOpenPicker}) =>{
//     const [openAction, setOpenAction] = useState(false);
    
//     const handleInputChange = (e) => {
//         inputField = e.target.value;
//     }
//     return (
//         <StyledInput  onChange={handleInputChange} fullWidth placeholder='Write a message...' variant='filled' InputProps={{
//             disableUnderline: true,
//             startAdornment: 
//             <Stack sx={{width:'max-content'}}>
//                 <Stack sx={{position:'relative', display: openAction ? 'inline-block' : 'none'}}>
//                     {Actions.map((el,index)=>(
//                         <Tooltip placement='right' title={el.title} key={index}>
//                             <Fab sx={{position:'absolute', top: -el.y, backgroundColor: el.color}}>
//                                 {el.icon}
//                             </Fab>
//                         </Tooltip>
                      
//                     ))}
//                 </Stack>
//                 <InputAdornment position="start">
//                     <IconButton onClick={()=>{
//                         setOpenAction((prev)=>!prev)
//                     }}>
//                         <LinkSimple/>
//                     </IconButton>
//                 </InputAdornment>
//             </Stack>
//             ,
//             endAdornment: <InputAdornment position="start">
//             <IconButton onClick={()=>{
//                 setOpenPicker((prev)=> !prev);
//             }}>
//                 <Smiley/>
//             </IconButton>
//             </InputAdornment>
//         }}/>
//     )
// }

// const Footer = () => {
//     const theme = useTheme();
//     const [openPicker, setOpenPicker] = useState(false);
//     const {token} = useSelector((state) => state.auth);
//     const {messages} = useSelector((state) => state.messages);
//     // const handleInputChange  = (e) => {
//     //     setInputMessage(e.target.value);
//     // }
//     // useEffect(() => {

//     //     console.log(messages,'new message')
//     // },[messages])
//     const handleSendMessage = async () => {
//         const apiRes = await apifetch("/chat/send",token,{conversation_id: messages.conversation_element.id,message: inputField },"POST")
//         if(apiRes.success){
//             inputField = "";
            
//             // messages.data[] = apiRes.data;
  
            
//             const updatedMessages = {
//                 ...messages, // Copy the previous state
//                 data: [...messages.data, apiRes.data], // Append the new message to 'data'
//               };
            
//               // Dispatch the action to update the state
//               dispatch(setMessages(updatedMessages));
            
            
//         }
//     }
//   return (
//     <Box p={2} sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' :
//      theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
//     <Stack direction='row' alignItems={'center'} spacing={3}>

//         <Stack sx={{width:'100%'}}> 
//              {/* Chat Input */}
//             <Box sx={{ display: openPicker ? 'inline' : 'none' , zIndex:10, position:'fixed',bottom:81, right:100}}>
//                 <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log}/>
//             </Box> 
//             <ChatInput  setOpenPicker={setOpenPicker} />
//         </Stack>
        
//         <Box onClick={handleSendMessage} sx={{height:48, width: 48, backgroundColor:theme.palette.primary.main, 
//         borderRadius: 1.5}}>
//             <Stack sx={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
//                 <IconButton>
//                     <PaperPlaneTilt color='#fff'/>
//                 </IconButton>
//             </Stack>
            
//         </Box>
//     </Stack>
// </Box>
//   )
// }

// export default Footer


import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import { LinkSimple, Smiley, Camera, File, Image, Sticker, User, X } from 'phosphor-react';
import { useSelector } from 'react-redux';
import { PaperPlaneTilt } from 'phosphor-react';
import { apifetch } from '../../utils/fetchApi';
import { addMessage, setMessages } from '../../redux/slices/messageSlice';
import { dispatch } from '../../redux/store';
import {  handleSendMessage as handleSendSlice } from '../../redux/slices/chatSlice';
import LoadingScreen from '../LoadingScreen';


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: '12px',
      paddingBottom: '12px',
    }  
  }));

const Actions = [
    {
        color:'#4da5fe',
        icon: <Image size={24}/>,
        y:102,
        title:'Photo/Video'
    },
    {
        color:'#1b8cfe',
        icon: <Sticker size={24}/>,
        y:172,
        title:'Stickers'
    },
    {
        color:'#0172e4',
        icon: <Camera size={24}/>,
        y:242,
        title:'Image'
    },
    {
        color:'#0159b2',
        icon: <File size={24}/>,
        y:312,
        title:'Document'
    },
    {
        color:'#013f7f',
        icon: <User size={24}/>,
        y:382,
        title:'Contact'
    }
];

const ChatInput = ({ setOpenPicker, inputField, setInputField, selectedFile, setSelectedFile,handleSendMessage }) => {
    const fileInputRef = useRef(null); // Reference for file input
    const {token} = useSelector((state) => state.auth);

    const handleInputChange = (e) => {
        setInputField(e.target.value);
    };

    const handleAttachment = () => {
        fileInputRef.current.click(); // Open file picker
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        // Show loading state
        setSelectedFile({ file, preview: "/loading.gif", isUploading: true, attachment_id: null });
    
        // Prepare FormData for file upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("attachment_for","message")

        
    
        try {
            const response = await apifetch("/attachment/attach", token, formData, "POST");
            if (response.success) {
                
                // Update state with uploaded file URL
                setSelectedFile({
                    file,
                    preview: file.type.startsWith('image/') ? response.data.file_url : "/file-icon.png",
                    url: response.data.file_url,
                    isUploading: false,
                    attachment_id: response?.data?.id
                });
    
            } else {
                console.error("Upload failed:", response);
                setSelectedFile(null); // Remove file on failure
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setSelectedFile(null);
        }
    };
    

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setInputField(""); // Reset input field
    };

    return (
        <>
            <Stack spacing={1}>
                {/* File Preview */}
                {selectedFile && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            position: 'relative',
                            maxWidth: '100%',
                        }}
                    >
                        {selectedFile.preview ? (
                            <img src={selectedFile.preview} alt="preview" style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }} />
                        ) : (
                            <File size={40} color="#555" style={{ marginRight: 10 }} />
                        )}
                        <Typography variant="body2" noWrap>{selectedFile.file.name}</Typography>
                        <IconButton onClick={handleRemoveFile} sx={{ position: 'absolute', top: -8, right: -8 }}>
                            <X size={18} />
                            
                        </IconButton>
                    </Box>
                )}

                {/* Chat Input */}
                <StyledInput
                    value={inputField}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    fullWidth
                    placeholder="Write a message..."
                    variant="filled"
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <Stack sx={{ width: 'max-content' }}>
                                <InputAdornment position="start">
                                    <IconButton onClick={handleAttachment}>
                                        <LinkSimple />
                                    </IconButton>
                                </InputAdornment>
                            </Stack>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
                                    <Smiley />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*,video/*,.pdf,.docx,.txt"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </Stack>
        </>
    );
};


const Footer = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const { token,user } = useSelector((state) => state.auth);
    
    const { messages } = useSelector((state) => state.messages);
    const [inputField, setInputField] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [sendLoading, setSendLoading] = useState(false);


    const handleSendMessage = async () => {
        if(sendLoading) return;
        setSendLoading(true)
        if (inputField.trim() || selectedFile) {
            const payload = {
                conversation_id: messages.conversation_element.id,
                message: String(inputField),
                selected_file: selectedFile?.attachment_id
            };
    
            const apiRes = await apifetch("/chat/send", token, payload, "POST");
    
            if (apiRes.success) {
                setInputField('');
                setSelectedFile(null);
    
                // Ensure last_message structure is correct
                const lastMessage = { ...apiRes.data, type: "text", conversation: undefined };
    
                // Dispatch to update message list
                dispatch(addMessage(apiRes.data));
    
                // Update chat and move to top without increasing unread count
                dispatch(handleSendSlice({ 
                    ...apiRes.data, 
                    last_message: lastMessage 
                }));
            }
        }
        setSendLoading(false)
    };
    


    return (
        <Box p={2} sx={{ width: '100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }}>
            <Stack direction='row' alignItems={'center'} spacing={3}>
                {user.user_permissions.includes('chat-message-create') ? <>
                    <Stack sx={{ width: '100%' }}>
                    <ChatInput
                        setOpenPicker={setOpenPicker}
                        inputField={inputField}
                        setInputField={setInputField}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        handleSendMessage={handleSendMessage} // Pass handleSendMessage
                    />

                </Stack>
                <Box onClick={handleSendMessage}  sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton disabled={sendLoading}>
                            {sendLoading? <LoadingScreen />:  <PaperPlaneTilt color='#fff' />}
                            
                        </IconButton>
                    </Stack>
                </Box>
                </>: null}
                

            </Stack>
        </Box>
    );
};

export default Footer;
