import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import { useSelector } from 'react-redux';
import { apifetch } from '../../utils/fetchApi';
import { dispatch } from '../../redux/store';
import { setUsers } from '../../redux/slices/usersSlice';
import { isNotReal } from '../../components/Conversation/Header';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateChatForm = ({ handleClose }) => {
    const {users} = useSelector((state) => state.users);
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);
    
    useEffect(()=>{
        try{
            if(typeof users.data === "undefined" ||  users?.data?.length < 1){
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
                console.log(res,'resss---')
                // if(res.success){
                //     handleClose();
                // }
                

            })
            console.log('Data', data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!loading? <RHFAutocomplete
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
