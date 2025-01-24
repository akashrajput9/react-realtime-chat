import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import { useSelector } from 'react-redux';
import { apifetch } from '../../utils/fetchApi';
import { dispatch } from '../../redux/store';
import { setUsers } from '../../redux/slices/usersSlice';
import { addChat } from '../../redux/slices/chatSlice';
import { setMessages } from '../../redux/slices/messageSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateChatForm = ({ handleClose }) => {
    const {users} = useSelector((state) => state.users);
    const {chats} = useSelector((state) => state.chats);
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);
    
    useEffect(()=>{
        try{
            if(typeof users.data === "undefined" ||  users?.data?.length < 1 || 1 == 1 ){
                setLoading(true);
                apifetch('/users',token).then((userData) => {
                    dispatch(setUsers(userData.data));
                    setLoading(false);
                });
                
            }
                
        }catch(e){
            console.log(e,'errror')
        }
    },[])
    const NewGroupSchema = Yup.object().shape({
        // message: Yup.string().required('Message is required'),
        user: Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string().required(),
        }).nullable().required('User is required'),
    });

    const defaultValues = {
        // message: '',
        user: null,
    };

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    });

    const { handleSubmit, setValue, watch, formState: { errors } } = methods;

    
    
    const onSubmit = async (data) => {
        try {
            // api call
            apifetch("/chat/create",token,{user_id:data?.user?.id},"POST").then((res)=>{
                if(res.success){
                    if(!res?.data?.already_exisists ){
                        const fromchats = chats.filter((resss) => {
                            return resss.id == res?.data?.id;
                        });
                        console.log(fromchats);
                        if(!fromchats){
                            dispatch(addChat(res.data));
                        }
                        
                    }
                    console.log('processing ',res.data);
                    const data = apifetch("/chat/messages",token,{conversation_id:res?.data?.id}).then((data) => {
                        console.log('processing dispatch ',data);
                        let dispatch_data = data?.data;
                        dispatch_data.conversation_element = res.data;
                        dispatch(setMessages(dispatch_data));
                        handleClose();
                    })
                    
                }
            })
            console.log('Data', data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(users?.data,'users data')
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!loading ? <RHFAutocomplete
                    name="user"
                    label="User"
                    options={users?.data} 
                    getOptionLabel={(option) => option?.name || ''}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    onChange={(event, value) => setValue('user', value)}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )}
                />: <></> }
                
                {/* <RHFTextField name="message" label="Message" /> */}
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="end">
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

const CreateChat = ({ open, handleClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            sx={{ p: 4 }}
        >
            {/* Title */}
            <DialogTitle sx={{ mb: 3 }}>New Chat</DialogTitle>
            {/* Content */}
            <DialogContent>
                {/* Form */}
                <CreateChatForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};

export default CreateChat;
