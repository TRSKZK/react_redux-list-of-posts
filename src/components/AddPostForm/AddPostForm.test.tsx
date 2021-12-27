import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import  store from "../../app/store";
import AddPostForm from './AddPostForm';

describe('AddPostForm component', () => {
  const produceComponent = () =>(
    render(
      <Provider store={store}>
        <AddPostForm />
      </Provider>
    )
  ); 

  test('should render a form', () => {
    produceComponent();
    expect(screen.getByText(/Add new post/i)).toBeInTheDocument();
  });
});
