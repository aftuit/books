import { Card, CardContent, Chip, Typography } from "@mui/material"
import { Flex, CardWrap, IconEdit, IconDelete, Icons } from "./style"
import PropTypes from 'prop-types';
const Item = ({ book, deleteBook, startEditBook }) => {

    return (
        <CardWrap>
            <Card variant="outlined" sx={{ border: '1px solid #EBEBEB', boxShadow: '0px 4px 24px 0px #33333314' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {book.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {book.cover}
                    </Typography>
                    <Flex>
                        <div>{book.author}: {book.published}-year</div>
                        <Chip label={`${book.pages} pages`} variant="filled" />
                    </Flex>
                </CardContent>
            </Card>
            <Icons>
                <IconDelete onClick={() => deleteBook(book.id)}>
                    <img src="/icons/delete.svg" alt="" />
                </IconDelete>
                <IconEdit onClick={() => startEditBook(book)}>
                    <img src="/icons/edit.svg" alt="" />
                </IconEdit>
            </Icons>

        </CardWrap>
    )
}

Item.propTypes = {
    book: PropTypes.object,
    deleteBook: PropTypes.function,
    startEditBook: PropTypes.function
}

export default Item