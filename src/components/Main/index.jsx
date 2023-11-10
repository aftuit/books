import { Count, Title, Desc, Head, Content, Bottom } from './styled'
import Item from '../Item'
import { useEffect, useState } from 'react';
import { useRegister } from '../../context/context';
import ModalForm from '../ModalForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SERVER_URL } from '../../util/api';
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Modal,
    Pagination,
    PaginationItem,
    Snackbar,
    Stack
} from '@mui/material'
const Main = () => {

    const [books, setBooks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [length, setLength] = useState(0);
    const [item, setItem] = useState({
        id: '',
        title: '',
        author: '',
        cover: '',
        published: '',
        pages: null,
    });
    const [open, setOpen] = useState(false);
    const [openDrop, setOpenDrop] = useState(false);
    const [page, setPage] = useState(1);
    const [state, setState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'right',
        message: '',
        status: 'success',
    });
    const { openSnack, vertical, horizontal, message, status } = state;
    const closeSnack = () => setState({ ...state, openSnack: false });
    const prevNextPage = (e, val) => {
        setPage(val)
    }

    const resetForm = () => {
        setItem({
            id: '',
            title: '',
            author: '',
            cover: '',
            published: '',
            pages: null,
        })
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        resetForm();
    };

    const { search } = useRegister();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#fff',
        border: '1px solid transparent',
        pt: 2,
        px: 4,
        pb: 3,
    };

    const getBooksLength = async () => {
        fetch(`${SERVER_URL}/books`)
            .then(response => response.json())
            .then(result => {
                setLength(result.length);
            })
    }

    const getAllBooks = (query = '') => {
        setOpenDrop(true);
        fetch(`${SERVER_URL}/books?_limit=6&_page=${page}&q=${query}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(result => {
                setOpenDrop(false);
                setBooks(result);
                console.log(result);

            })
            .catch(error => {
                setOpenDrop(false);
                console.log('error', error)
            });
    }

    const deleteBook = (id) => {
        setOpenDrop(true)
        fetch(`${SERVER_URL}/books/${id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(() => {
                getAllBooks();
                getBooksLength();
            })
            .catch(error => {
                setOpenDrop(false);
                console.log('error', error)
            });
    }

    const startEditBook = (book) => {
        setItem({
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            published: book.published,
            pages: book.pages,
        })
        setIsEditing(true);
        handleOpen();
    }

    useEffect(() => {
        getAllBooks();
        getBooksLength();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    useEffect(() => {
        getAllBooks(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <Container sx={{ mt: 4, overflowX: 'hidden' }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '430px' }}>
                    <ModalForm
                        handleClose={handleClose}
                        getAllBooks={getAllBooks}
                        item={item}
                        setItem={setItem}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        resetForm={resetForm}
                        getBooksLength={getBooksLength}
                        state={state}
                        setState={setState}
                    />
                </Box>
            </Modal>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Head>
                <Title>
                    {
                        length ?
                            <>You&apos;ve got <Count>{length} books</Count></> :
                            <>You have no books!</>
                    }
                </Title>
                <Content>
                    <Button
                        onClick={handleOpen}
                        variant='contained'
                        color="secondary"
                        startIcon={<span>+</span>}
                        sx={{
                            px: 5,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Create a book
                    </Button>
                </Content>
            </Head>
            <Desc>
                Your task today
            </Desc>
            <Grid container sx={{ mt: 3 }} rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                {
                    books.map(book => <Grid item md={4} sm={6} key={book.id}> <Item
                        book={book}
                        deleteBook={deleteBook}
                        startEditBook={startEditBook}
                    /> </Grid>)
                }
            </Grid>
            <Bottom>
                <Stack spacing={2} sx={{ mt: 3, mb:3  }}>
                    <Pagination
                        count={Math.ceil(length / 6)}
                        color={'secondary'}
                        page={page}
                        onChange={prevNextPage}
                        on
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon
                                }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </Bottom>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                onClose={closeSnack}
                onClick={closeSnack}
                key={vertical + horizontal}
                autoHideDuration={3000}
            >
                <Alert severity={status} variant="filled">{message}</Alert>
            </Snackbar>

        </Container>
    )
}

export default Main