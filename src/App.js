import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, LOGOUT, USER_POST_FETCH_REQUEST } from './store/actions';

function App() {
  const dispatch = useDispatch()
  const isLoginPending = useSelector((state) => state.user.isLoginPending)
  const token = useSelector((state) => state.user.token)
  const error = useSelector((state) => state.user.error)


  const handleClick = () => {
    dispatch({
      type: USER_POST_FETCH_REQUEST,
      payload: { userId: 3, actionId: 1 }
    })
    dispatch({
      type: USER_POST_FETCH_REQUEST,
      payload: { userId: 3, actionId: 2 }
    })
    dispatch({
      type: USER_POST_FETCH_REQUEST,
      payload: { userId: 3, actionId: 3 }
    })
    setTimeout(() => {
      dispatch({
        type: USER_POST_FETCH_REQUEST,
        payload: { userId: 3, actionId: 4 }
      })
    }, 1000)
  }
  // LOGIN / LOGOUT
  const handleLoginClick = () => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        username: 'user1',
        password: 'user1password',
      },
    })
  }
  const handleLogoutClick = () => {
    dispatch({ type: LOGOUT })
  }

  return (
    <div className="App">
     <Button onClick={handleClick}> Get posts</Button>
  
     <Row className="app__login-container p-3">
       <Col className="col-2"> 
        <Button onClick={handleLoginClick} >Log in</Button>
       </Col>
       <Col className="col-2"> 
        <Button onClick={handleLogoutClick}>Log out</Button>
       </Col>
        {isLoginPending && <p> Logging in..</p>}
        {token && <p> {token} </p>}
        {error && <p> {error} </p>}
      </Row>
    </div>
  );
}

export default App;
