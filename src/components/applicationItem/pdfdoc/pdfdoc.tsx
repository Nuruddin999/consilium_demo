import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Font } from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import { useParams } from "react-router-dom";
import MyDocContent from "./pdfcontent";
import { checkUser } from "../../../actions/user";
import { getListItemAction } from "../../../common/actions/common";
import { saveApplicationItem } from "../../../reducers/applicationItemSlice";



Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

function MyDoc() {
  const { id } = useParams<{ id: string }>()
  const applItem = useSelector((state: RootState) => state.applicationItem)
  const { isDeletedPlace } = useSelector((state: RootState) => state.user.user)
  const [status, setStatus] = useState<boolean | undefined>(undefined)
  const bc = useMemo(() => new BroadcastChannel('pdf_channel'), [status]);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUser())
    dispatch(getListItemAction(id, 'applications', saveApplicationItem))
  }, [])
  useEffect(() => {
    bc.onmessage = ev => {
      setStatus(!ev.data)
    };

    return () => {
      bc.close();
    };
  }, [bc, status]);

  return (
    <MyDocContent applItem={applItem} isDeletedPlace={applItem.checkUpPlaceIsDeleted} status={status} />
  );
}

export default MyDoc;
