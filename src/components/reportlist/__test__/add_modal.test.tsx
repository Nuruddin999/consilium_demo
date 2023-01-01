import React from 'react'
import { render, fireEvent, screen, getByPlaceholderText, getByLabelText } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootReducer, store } from '../../../app/store';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import AddModal from '../add_modal';
import { createStore } from '@reduxjs/toolkit';
import { addApplicationApi  } from '../../../api/application';

jest.mock('../../../api/application',)

describe('add modal works properly', () => {
  beforeAll(() => {
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
        matches: query === "(pointer: fine)",
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  afterAll(() => {
    // @ts-ignore
    delete window['matchMedia'];
  })
  const renderAuth = () => (
    <Provider store={createStore(rootReducer, {})}>
      <Router>
        <AddModal />
      </Router>
    </Provider>
  )
  it('renders properly', () => {
    const { container } = render(renderAuth())
    expect(container).toMatchSnapshot()
  })
  it('creates new request by doctor correctly', () => {
    (addApplicationApi as unknown as jest.Mock).mockResolvedValue({
      status:'ok'
    })
    const { getByPlaceholderText, getByTestId } = render(renderAuth())
    const fioTextField = getByPlaceholderText('ФИО пациента') as HTMLInputElement;
    expect(fioTextField).not.toBeNull()
    fireEvent.change(fioTextField, { target: { value: 'Aliev Ali Alievich' } })
    expect(fioTextField.value).toBe('Aliev Ali Alievich')
    const startDateInput = getByPlaceholderText('dd.mm.y')
    fireEvent.change(startDateInput, { target: { value: "19.06.1987" } });
    expect((startDateInput as HTMLInputElement).value).toBe("19.06.1987");
    const patientRequest = getByPlaceholderText('Запрос пациента') as HTMLInputElement;
    expect(patientRequest).not.toBeNull()
    fireEvent.change(patientRequest, { target: { value: 'Нужны лекарства от астмы' } })
    expect(patientRequest.value).toBe('Нужны лекарства от астмы')
    const fundName = getByPlaceholderText('Название фонда') as HTMLInputElement;
    expect(fundName.value).toBe('')
    expect(fundName).not.toBeNull()
    fireEvent.change(fundName, { target: { value: 'Закят' } })
    expect(fundName.value).toBe('Закят')
    const fundRequest = getByPlaceholderText('Запрос фонда') as HTMLInputElement;
    expect(fundRequest.value).toBe('')
    expect(fundRequest).not.toBeNull()
    fireEvent.change(fundRequest, { target: { value: 'Нужны лекарства' } })
    expect(fundRequest.value).toBe('Нужны лекарства')
    expect(screen.queryByTestId('manager-filed')).not.toBeInTheDocument()
    fireEvent.submit(getByTestId('addrequest-form'))
    expect(fundRequest.value).toBe('')
    expect(fundName.value).toBe('')
    expect(patientRequest.value).toBe('')
    expect(fioTextField.value).toBe('')
  })
})