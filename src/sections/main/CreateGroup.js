import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { apifetch } from '../../utils/fetchApi';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { setUsers } from '../../redux/slices/usersSlice';
import { addChat } from '../../redux/slices/chatSlice';
import { setMessages } from '../../redux/slices/messageSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
    const { users } = useSelector((state) => state.users);
    const {chats} = useSelector((state) => state.chats);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);

    useEffect(() => {
        if (!users.data || users.data.length === 0) {
            setLoading(true);
            apifetch('/users', token).then((userData) => {
                dispatch(setUsers(userData.data));
                setLoading(false);
            }).catch((e) => console.log(e, 'error'));
        }
    }, []);

    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        members: Yup.array().min(2, 'Must have at least 2 members').required('Members are required')
    });

    const defaultValues = {
        title: '',
        members: []
    };

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    });

    const { handleSubmit, setValue } = methods;

    const onSubmit = async (data) => {
        const idss = data.members.map((res) => res.id);
        try {
                    // api call
                    setLoadingCreate(true);
                    apifetch("/chat/create",token,{user_ids:idss,group_name:data.title},"POST").then((res)=>{
                        if(res.success){
                            console.log(res.data,'data from chat create')
                            if(!res?.data?.already_exisists ){
                                const fromchats = chats.filter((resss) => {
                                    return resss.id == res?.data?.id;
                                });
                                if(fromchats.length === 0){
                                    dispatch(addChat(res.data));
                                }
                                
                            }
                            const data = apifetch("/chat/messages",token,{conversation_id:res?.data?.id}).then((data) => {
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
                setLoadingCreate(false)
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name='title' label='Title' />
                {!loading ? (
                    <RHFAutocomplete
                        name='members'
                        label='Members'
                        multiple
                        options={users?.data || []}
                        getOptionLabel={(option) => option?.name || ''}
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                        onChange={(event, value) => setValue('members', value)}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        )}
                    />
                ) : <></>}
                <Stack spacing={2} direction='row' alignItems='center' justifyContent='end'>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loadingCreate} type='submit' variant='contained'>
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

const CreateGroup = ({ open, handleClose }) => {
    return (
        <Dialog fullWidth maxWidth='xs' open={open} TransitionComponent={Transition} keepMounted sx={{ p: 4 }}>
            <DialogTitle sx={{ mb: 3 }}>Create New Group</DialogTitle>
            <DialogContent>
                <CreateGroupForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroup;