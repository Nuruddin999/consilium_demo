import { Text, View } from '@react-pdf/renderer'
import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/ru';
import { unset } from 'lodash'

const hyphenator = hyphen(pattern);

const hyphenationCallback = (word) => {
  return hyphenator(word).split('\u00AD');
}

const TablePdf = ({ headers, dataContent, contentKeys, title, subTitle, status, isDeletedPlace }) => {
  const renderPlaceView = (hdr) => {
    const hdrView = <View
    style={{
      flexBasis: hdr === '№' ? '5%' : `${(status || isDeletedPlace) ? 95 / (headers.length - 2) : 95 / (headers.length - 1)}%`,
      height: '100%',
      border: '1px solid black',
      padding:'7px'
    }}>
    <Text hyphenationCallback={hyphenationCallback} style={{ fontFamily: "Times New Roman Bold", fontSize: '12px' }}>
      {hdr}
    </Text>
  </View>
    if (hdr !== 'Место') {
      return  hdrView
    }
    else if (status !== undefined && !status) {
      return  hdrView
    }
    else if (!isDeletedPlace) {
      return  hdrView
    }
    else {
      return null
    }
  }
  const renderPlaceContentView = (val, content) => {
    const placeView = <View style={{
      flexBasis:  `${(status || isDeletedPlace) ? 95 / (headers.length - 2) : 95 / (headers.length - 1)}%`,
      flexWrap: 'wrap',
      fontSize: '12px',
      fontFamily: val !== 'place' ? 'Times New Roman Reg' : 'Times New Roman Bold',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px'
    }}>
      <Text hyphenationCallback={hyphenationCallback}
      >
        {content}
      </Text>
    </View>
    if (val !== 'place') {
      return placeView
    }
    else if (status !== undefined && !status) {
      return placeView
    }
    else if (!isDeletedPlace) {
      return placeView
    }
    else {
      return null
    }
  }
  return <View>
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
      wrap={false}>
      <Text
        style={{ fontFamily: "Times New Roman Bold", fontSize: '12px' }}>
        {title}
      </Text>
      <Text
        style={{ fontSize: '7px', marginBottom: 10, fontFamily: "Times New Roman Bold", }}>
        {subTitle}
      </Text>
      {headers.length > 0 ?
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}>
          {headers.map((hdr, hdrIndex) =>
            renderPlaceView(hdr))}
        </View>
        : null}
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }} >
        <View style={{
          flexBasis: '5%',
          height: '100%',
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5px'
        }}>
          <Text style={{ fontFamily: "Times New Roman Reg", fontSize: '12px' }}>1</Text>
        </View>
        {dataContent && dataContent.length > 0 && contentKeys.length > 0 ? contentKeys.map((val, valIndex) => renderPlaceContentView(val, dataContent[0][val])) : headers.map((hdr, hdrIndex) => {
          if (hdrIndex !== 0) {
            return <View style={{ flexBasis: `${95 / (headers.length - 1)}%`, border: '1px solid black', }}></View>
          }
        })}
      </View>
    </View>
    {dataContent.length > 0 ?
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }} >
        {dataContent && dataContent.length > 0 ? dataContent.map((dataObj, index) => index > 0 ?
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
            wrap={false} >
            <View style={{
              flexBasis: '5%', border: '1px solid black', display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5px'
            }}>
              <Text style={{ fontFamily: "Times New Roman Reg", fontSize: '12px' }}>{index + 1}</Text>
            </View>
            {contentKeys.length > 0 ? contentKeys.map((val, valIndex) => renderPlaceContentView(val, dataObj[val])) : null}
          </View> : null) : null}
      </View> : null}
  </View>
}
export default TablePdf