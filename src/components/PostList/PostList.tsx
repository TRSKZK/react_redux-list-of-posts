import React from 'react';
import './PostList.scss';
import { Post } from '../../react-app-env';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { deletePost } from '../../app/store';
import { connect, ConnectedProps } from 'react-redux';


const mapDispatch = {
  delete: deletePost,
}

const connector = connect(null, mapDispatch)

type Props = ConnectedProps<typeof connector> & {
  posts: Post[],
  getPostId: (postId: number) => void,
}

const PostList: React.FC<Props> = React.memo(
  (props) => {

    const capitalize = (title: string) => {
      return title.slice(0,1).toUpperCase() + title.slice(1)
    }

    return (
      <div className='card-container'>
        {props.posts.map((post: Post) => (
          <Card
            className="card"
            key={post.id}
            sx={{ maxWidth: 275 }}
          >
            <CardHeader
              className="card__title"
              title={capitalize(post.title)}
              fontSize="12px"
            />
            <CardContent>
              <Typography
                variant="body1"
                className="card__body"
              >
                {post.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Stack direction="row" spacing={2}>
                <NavLink
                  className="card__details-link"
                  to="/details"
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => props.getPostId(post.id)}
                  >
                    Details
                  </Button>
                </NavLink>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => props.delete(post.id)}
                >
                  Delete
                </Button>
              </Stack>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  },
);

export default connector(PostList);
