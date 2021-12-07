import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FILES_UPLOADING_START, LOGIN_REQUEST, LOGOUT, requestUserPosts, USER_POSTS_FETCH_REQUESTED } from './store/actions';

function App() {
  const dispatch = useDispatch()
  const isLoginPending = useSelector((state) => state.user.isLoginPending)
  const token = useSelector((state) => state.user.token)
  const error = useSelector((state) => state.user.error)
  const filesUploadingProgress = useSelector((state) => state.global.filesUploadingProgress)
  
  const handleGetPosts = () => {
    try{
      for (let dispatchId = 1; dispatchId <= 4; dispatchId++) {
        dispatch(
          requestUserPosts({
            userId: 3,
            dispatchId
          })
        )
      }
    } catch(err) {
      console.log('%cqqq: ERROR', 'color: red;', err.message);
    }
    

    // dispatch({
    //   type: USER_POSTS_FETCH_REQUESTED,
    //   payload: { userId: 3, actionId: 1 }
    // })

    // setTimeout(() => {
    //   dispatch({
    //     type: USER_POSTS_FETCH_REQUESTED,
    //     payload: { userId: 3, actionId: 4 }
    //   })
    // }, 1000)
  }

  // LOGIN / LOGOUT
  const handleLogin = () => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        username: 'user1',
        password: 'user1password',
      },
    })
  }
  const handleLogout = () => {
    dispatch({ type: LOGOUT })
  }
  const handleUpload = () => {
    dispatch({ type: FILES_UPLOADING_START })
  }

  return (
    <div className="App">
     <Button onClick={handleGetPosts}> Get posts</Button>
  
     <Row className="app__login-container p-3">
       <Col className="col-2"> 
        <Button onClick={handleLogin} >Log in</Button>
       </Col>
       <Col className="col-2"> 
        <Button onClick={handleLogout}>Log out</Button>
       </Col>
        {isLoginPending && <p> Logging in..</p>}
        {token && <p> {token} </p>}
        {error && <p> {error} </p>}
      </Row>
      <Row className="app__login-container p-3">
        <Col className="col-2"> 
          <Button onClick={handleUpload}>Upload</Button>
          {<p> Uploading progress {filesUploadingProgress}% </p>}
        </Col>
      </Row>
    </div>
  );
}

export default App;
