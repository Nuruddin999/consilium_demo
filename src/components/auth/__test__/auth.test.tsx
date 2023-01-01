import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { Auth } from '../auth';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { loginApi } from '../../../api/user';

jest.mock('../../../api/index')
jest.mock('../../../api/user')

describe('Auth ', () => {
  const renderAuth = () => (
    <Provider store={store}>
      <Router>
        <Auth />
      </Router>
    </Provider>
  )
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders properly', () => {
    const { container } = render(renderAuth())
    expect(container).toMatchSnapshot()
  })

  it('changes email and password properly', async () => {
    const { container, getByPlaceholderText } = render(renderAuth())
    const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = getByPlaceholderText('Пароль') as HTMLInputElement;
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'testdoc@toctor.ru' } })
    fireEvent.change(getByPlaceholderText('Пароль'), { target: { value: '12345' } })
    expect(emailInput).toBeTruthy()
    expect(emailInput.value).toBe('testdoc@toctor.ru')
    expect(passwordInput.value).toBe('12345')
    expect(passwordInput).toBeTruthy()
    expect(container).toMatchSnapshot()
  })
  it('sends login request', async () => {
    (loginApi as unknown as jest.Mock).mockResolvedValue({
      accessToken: '12345',
      refreshToken: '5678',
      user: {
        id: '12',
        email: 'testdoc@test.ru',
        name: 'doctor',
        phone: '12345678',
        speciality: 'doctor',
        role: 'doctor',
        rights: [{ entity: 'applications', create: true, update: true, read: true, delete: false }, { entity: 'users', create: false, update: false, read: false, delete: false }, { entity: 'checkupPlanPlace', create: false, update: false, read: false, delete: false }],
        isDeletedPlace: false
      }
    })
    const { getByPlaceholderText, getByTestId, findByTestId } = render(renderAuth())
    const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = getByPlaceholderText('Пароль') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'testdoc@toctor.ru' } })
    fireEvent.change(passwordInput, { target: { value: '12345' } })
    expect(emailInput.value).toBe('testdoc@toctor.ru')
    expect(passwordInput.value).toBe('12345')
    fireEvent.submit(getByTestId('loginform'))
    const loaded = await findByTestId('loaded')
    expect(loaded).toBeInTheDocument()
    expect(screen.queryByText('Неизвестаня ошибка')).not.toBeInTheDocument()

  })
  it('failed request', async () => {
    (loginApi as unknown as jest.Mock).mockResolvedValue({})
    const { getByPlaceholderText, getByTestId, findByText } = render(renderAuth())
    const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = getByPlaceholderText('Пароль') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'testdoc@toctor.ru' } })
    fireEvent.change(passwordInput, { target: { value: '12345' } })
    expect(emailInput.value).toBe('testdoc@toctor.ru')
    expect(passwordInput.value).toBe('12345')
    fireEvent.submit(getByTestId('loginform'))
    const loaded = screen.queryByTestId('loaded')
    expect(loaded).not.toBeInTheDocument()
    expect(await findByText('Произошла ошибка, попробуйте позже')).toBeInTheDocument()
  })
})
