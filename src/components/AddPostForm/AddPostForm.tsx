import React, {useState} from 'react';
import './AddPostForm.scss';
import { Box, Typography, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { addNewPost } from '../../api/posts';
import { loadPosts } from '../../app/store';
import { connect, ConnectedProps } from 'react-redux';

const mapDispatch = {
  load: loadPosts,
};

const connector = connect(null, mapDispatch);

type Props = ConnectedProps<typeof connector>

const AddPostForm:React.FC<Props> = React.memo(
  ({ load }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'title':
          setTitle(event.target.value);
          break;

        case 'body':
          setBody(event.target.value);
          break;

        default:
          return;
      }
    };

    const clearForm = () => {
      setBody('');
      setTitle('');
    }

    const handleSubmitButton = async(event: React.FormEvent) => {
      event.preventDefault();

      if (title.length > 0 && body.length > 0) {
        const newPost = await addNewPost({ title, body });
        if (newPost) {
          load();
          clearForm();
        }
      }
    }

    return (
      <Box
        className="add-post-form"
        component="form"
        action="POST"
        autoComplete="off"
        onSubmit={handleSubmitButton}
      >
        <Typography component="h3">
          Add new post
        </Typography>
        <TextField
          className="add-post-form__title"
          name="title"
          onChange={handleInputChange}
          required
          label="Title"
          id="outlined-required"
          data-testid="title"
          value={title}
        />

        <TextField
          className="add-post-form__body"
          name="body"
          onChange={handleInputChange}
          required
          id="outlined-required"
          label="Body"
          value={body}
        />
        <Button
          type="submit"
          className="add-post-form__submit-button"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    )
  },
);
export default connector(AddPostForm);
