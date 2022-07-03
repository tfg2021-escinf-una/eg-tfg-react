import { useState, forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Box, Card, Button, TextField, Typography, SnackbarOrigin } from "@mui/material";
import { StyledDiv, StyledCardActions, StyledCardContent, StyledLogoWrapper } from "./Login.styles";
import { ISessionState } from 'apps/tfg-frontend/src/redux/reducers/sessionReducer';
import { login } from 'apps/tfg-frontend/src/redux/actions';
import { Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux';
import SnackBar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import imgSrc from './../../../assets/logo.png';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ISnackState extends SnackbarOrigin {
  open?: boolean,
  message: string
}

export const Login = () => {
  const session : ISessionState = useSelector((state : RootState)  => state.sessionReducer);
  const dispatch : AppDispatch = useDispatch();
  const [ emailAddress, setEmailAddress ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ error, setError ] = useState<boolean>(false);
  const [ snackState, setSnackState] = useState<ISnackState>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: '',
  });
  const { vertical, horizontal, message,  open } = snackState;

  const handleClick = (newState: ISnackState ) => () => {
    setSnackState({ open: true, ...newState });
  };

  const handleSubmit = () => {
    if(emailAddress.length > 0 && password.length > 0){
      setError(false);
      dispatch(login({
        emailAddress: emailAddress,
        password : password
      }));
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    let message = ""
    const snackState = {
      open: true,
      vertical : "bottom",
      horizontal: "left"
    }

    if(session.isInvalidPassword){
      session.isInvalidPassword = false;
      message = "The entered password is incorrect"
    } else if (session.isNotFound) {
      session.isNotFound = false
      message = "The entered user is not found"
    } else if(session.failure){
      session.failure = false
      message = "An error unexpected error has occurred, please try again"
    }

    if(message.length > 1) {
      handleClick({
        ...snackState,
        message: message
      } as ISnackState)();
    }
  }, [session])

  return (
    (!session.isAuthenticated) ?
      <StyledDiv>
        <Card sx={{ minWidth: 400 }} className="card">
          <StyledCardContent>
            <StyledLogoWrapper>
              <img src={imgSrc} />
            </StyledLogoWrapper>
            <Box component="div"
                sx={{ marginBottom: '20px',
                      width: '100%'}}>
              <TextField required
                        error={error}
                        id="outlined-error"
                        label="Email Address"
                        sx={{ width: '100%'}}
                        onChange={(event) => setEmailAddress(event.target.value)}/>
            </Box>
            <Box component="div">
              <TextField required
                        error={error}
                        id="outlined-password-input-error"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        sx={{ width: '100%'}}
                        onChange={(event) => setPassword(event.target.value)} />
            </Box>
          </StyledCardContent>
          <StyledCardActions>
            <Box component="div"
                sx={{ display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      width: '100%'}}>
              {
                (session.isRequestingLogin) ?
                  <CircularProgress /> :
                  <Button variant="contained"
                          size="large"
                          color="primary"
                          sx={{ width: '100%' }}
                          onClick={handleSubmit}>
                    <Typography variant="h6"
                                sx={{fontWeight: 'normal',
                                    textTransform: 'capitalize'}}>
                      Continue
                    </Typography>
                  </Button>
              }
            </Box>
          </StyledCardActions>
      </Card>
      <SnackBar anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={() => setSnackState({ ...snackState, open: false })}
                key={vertical + horizontal}
                autoHideDuration={5000}>
          <Alert severity="error">{message}</Alert>
        </SnackBar>
      </StyledDiv> :
      <Navigate to="/" />
  );
}
