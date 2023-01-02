import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../app/store";
import { Loader } from "../loader/loader";
import '../../common/components/registration/style.auth.scss'
import { login } from "../../actions/user";
import { setError, setStatus } from "../../reducers/ui";

export const Auth = (): React.ReactElement => {
  const [email, setEmail] = useState('testben@gmail.com')
  const [password, setPassword] = useState('testben')
  const { user } = useSelector((state: RootState) => state.user)
  const { isCircular, errorMessage } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch()
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() =>{ dispatch(setError(''))
      dispatch(setStatus(''))
    }, 1500)
    }
  }, [errorMessage])

  return <div className={'auth-wrapper'}>
    <div className={"auth-container"}>
      <form onSubmit={(event) => onSubmit(event)} data-testid='loginform'>
        <TextField value={email}
          type='email'
          required
          size='small'
          fullWidth
          placeholder='Email'
          margin='normal'
          onChange={(event) => setEmail(event.target.value)} />
        <TextField
          value={password}
          type='password'
          required
          size='small'
          fullWidth
          placeholder='Пароль'
          margin='normal'
          onChange={(event) => setPassword(event?.target.value)} />

        { errorMessage && <Typography className='error-reg' align='center'>
          {errorMessage}
        </Typography>}
        <Button className='login-button' fullWidth variant='contained' disableElevation type='submit'>
          <Loader title='Войти' isLoading={isCircular} />
        </Button>
      </form>
      {user.role !== '' && <Redirect to='/main/table' />}
    </div>
  </div>
}