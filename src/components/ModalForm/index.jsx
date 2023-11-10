import { Button, IconButton, InputLabel, OutlinedInput } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Control, Form, Actions, Head } from './style'
import PropTypes from 'prop-types';
import { SERVER_URL } from '../../util/api';
import { useState } from 'react';
const ModalForm = ({
    handleClose,
    getAllBooks,
    item,
    setIsEditing,
    isEditing,
    resetForm,
    getBooksLength,
    state,
    setState
}) => {

    const [loading, setLoading] = useState(false);


    const createBook = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = e.target.elements;
        const raw = {
            title: data.title.value,
            author: data.author.value,
            cover: data.cover.value,
            published: data.published.value,
            pages: data.pages.value,
        }

        fetch(`${SERVER_URL}/books${isEditing ? `/${item.id}` : ''}`, {
            method: isEditing ? 'PUT' : 'POST',
            body: JSON.stringify(raw),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                handleClose();
                getAllBooks();
                getBooksLength();
                setIsEditing(false);
                resetForm();
                console.log(result)
                let msg = isEditing ? "updated" : "created";
                setState({ ...state, openSnack: true, message: `Successfully ${msg}!`, status: 'success' })

            })
            .catch(error => {
                handleClose()
                setLoading(false);
                setState({ ...state, openSnack: true, message: `error occured!`, status: 'error' })
                console.log('error', error)
            });
    }

    return (
        <Form onSubmit={createBook}>
            <Head >
                <h3>
                    {
                        isEditing ? <>Editing</> : <>Create a book</>
                    }
                </h3>
                <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                    <img src="/icons/close.svg" alt="" />
                </IconButton>
            </Head>
            <Control>
                <InputLabel htmlFor="input-with-icon-adornment">
                    Title
                </InputLabel>
                <OutlinedInput required defaultValue={item.title} name="title" id='input-with-icon-adornment' fullWidth placeholder='Enter your title' />
            </Control>
            <Control>
                <InputLabel htmlFor="input-with-icon-adornment-2">
                    Author
                </InputLabel>
                <OutlinedInput required defaultValue={item.author} name="author" id='input-with-icon-adornment-2' fullWidth placeholder='Enter your author' />
            </Control>
            <Control>
                <InputLabel htmlFor="input-with-icon-adornment-3">
                    Cover
                </InputLabel>
                <OutlinedInput required defaultValue={item.cover} name="cover" id='input-with-icon-adornment-3' fullWidth placeholder='Enter your cover' />
            </Control>
            <Control>
                <InputLabel htmlFor="input-with-icon-adornment-4">
                    Published
                </InputLabel>
                <OutlinedInput required defaultValue={item.published} name="published" type='number' id='input-with-icon-adornment-4' fullWidth placeholder='Enter your published' />
            </Control>
            <Control>
                <InputLabel htmlFor="input-with-icon-adornment-5">
                    Pages
                </InputLabel>
                <OutlinedInput required defaultValue={item.pages} name="pages" type='number' id='input-with-icon-adornment-5' fullWidth placeholder='Enter your {Pages}' />
            </Control>

            <Actions>
                <Button fullWidth variant='outlined' color='secondary' onClick={handleClose}>Cancel</Button>
                <LoadingButton fullWidth variant='contained' color='secondary' type='submit' loading={loading}>Save</LoadingButton>
            </Actions>
        </Form>
    )
}

ModalForm.propTypes = {
    handleClose: PropTypes.function,
    getAllBooks: PropTypes.function,
    item: PropTypes.object,
    setIsEditing: PropTypes.boolean,
    isEditing: PropTypes.boolean,
    resetForm: PropTypes.function,
    getBooksLength: PropTypes.function,
    state: PropTypes.object,
    setState: PropTypes.functione
}


export default ModalForm