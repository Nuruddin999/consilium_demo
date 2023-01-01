import { Document, Page, PDFViewer, Text, StyleSheet, View, Font, Image } from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import hopedoc from '../../../hopedoc.png'
import sell from '../../../sign.jpeg'
import TimesNewRomanFont from '../../../TimesNewRomanPSMT.ttf'
import TimesNewRomanBoldFont from '../../../TimesNewRomanPS-BoldMT.ttf'
import Table from './Table'
import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/ru';


const hyphenator = hyphen(pattern);

const hyphenationCallback = (word) => {
  return hyphenator(word).split('\u00AD');
}


Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

Font.register({
  family: "Times New Roman Reg",
  src: TimesNewRomanFont
});
Font.register({
  family: "Times New Roman Bold",
  src: TimesNewRomanBoldFont
});
const probDiagns = {
  width: '100%',
  margin: '0 auto 0',
  flexDirection: 'row',
  alignItems: 'center',
}
const examineStyle = {
  textAlign: 'center',
  borderRight: '1px solid black',
  padding: '5px'
}
const trow = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
}
const styles = StyleSheet.create({
  body: {
    margin: '8px',
  },
  hdr: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    fontSize: '11px',
    margin: '10px auto',
    paddingBottom: '10px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hdrimg: {
    width: '150px'
  },
  title: {
    margin: '8px',
    paddingBottom: '16px',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Times New Roman Reg"
  },
  recomenTitle: {
    fontWeight: 700,
    fontSize: '12px',
    fontFamily: "Times New Roman Bold",
    marginTop: 12,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 8,
    marginTop: 8,
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    textAlign: 'center',
    color: 'red',
    margin: '0 auto'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: "Times New Roman Reg"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  birth: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    padding: 0,
    width: '50%',
    fontSize: '12px'
  },
  birthWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24
  },
  birthText: {
    borderTop: '1px solid black',
    width: '100%',
    fontFamily: "Times New Roman Reg",
    fontSize: '8px'
  },
  anamnesisSection: {
    textAlign: 'center',
    marginTop: '7px'
  },
  reasonTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    fontSize: '12px',
    marginTop: '14px'
  },
  reasonSubTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    fontSize: 7
  },
  complaintTitle: {
    flexDirection: 'row',
    width: '100%',
    textAlign: 'justify',
    fontSize: '12px'
  },
  complaintTitleAnamnesis: {
    width: '100%',
    textAlign: 'left',
  },
  complaintTitleFirstWord: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
  },
  tabl: {

  },
  tableRow: {
    ...(trow),
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
  tablHeaderNum: {
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    padding: '5px',
    width: '50px',
    height: '100%'
  },
  tablHeaderFIO: {
    width: '500px',
    ...(examineStyle),
  },
  tablHeaderDiagnosis: {
    width: '1000px',
    ...(examineStyle),
  },
  probableDiagnosis: {
    ...(probDiagns),
    borderBottom: '1px solid black',
    textAlign: 'justify'
  },
  secondaryDiagnosis: {
    ...(probDiagns),
    textAlign: 'justify'
  },
  probableDiagnosisText: {
    width: '750px',
    textAlign: 'justify',
    fontFamily: "Times New Roman Reg",
    fontSize: '12px',
  },
  probableDiagnosisNum: {
    ...(examineStyle),
    borderRight: 'unset',
    fontFamily: "Times New Roman Bold",
    fontSize: '12px',
    width: '350px',
    textAlign: 'start'
  },
  tablHeaderTypeExamine: {
    ...(examineStyle),
    height: '100%',
    fontFamily: "Times New Roman Bold",
    width: '100%',
    flex: '1'
  },
  tablHeaderPlaceExamine: {
    ...(examineStyle),
    height: '100%',
    fontFamily: "Times New Roman Bold",
    flex: '1'
  },
  tablHeaderTargetExamine: {
    ...(examineStyle),
    fontFamily: "Times New Roman Bold",
    flexWrap: 'wrap',
    flex: '1'
  },
  commentsWrapper: {
    ...(trow),
    alignItems: 'start'
  },
  commentsNum: {
    width: '50px',
    textAlign: 'left',
    padding: '0px'
  },
  commentsSecText: {
    width: '100%',
    borderBottom: '1px solid black',
    fontFamily: "Times New Roman Reg",
    fontSize: '12px',
    textAlign: 'justify'
  },
  commonSize: {
    width: '80%',
    marginHorizontal: 'auto'
  },
  finalDateAndFio: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  finalDateAndFioText: {
    textDecoration: 'underline'
  },
  exeDateText: { width: '150px', marginHorizontal: '10px' },
  managerAndSpeciality: { display: 'flex', flexDirection: 'column', width: '150px', alignItems: 'center', marginHorizontal: '10px', flexWrap: 'wrap' }

});

function MyDocContent({ applItem, isDeletedPlace, status }) {
  let list = []

  for (let index = 0; index < 50; index++) {
    let consdoc = {
      name: `док${index + 1}`,
      speciality: `уролог${index + 1}`
    }
    list.push(consdoc)
  }

  const { mostProblDiagnosis, secondaryDiagnosis, patientBirthDate, patientName, complaint, anamnesis, consiliumDoctors, diagnostic, checkupPlans, diagnosticData, comments, execDate, manager, managerSpeciality, managerSignUrlPath } = applItem

  const currentYear = new Date().getFullYear()
  const yearsOld = new Date(patientBirthDate).getFullYear()
  const month = new Date(patientBirthDate).getMonth() + 1
  const date = new Date(patientBirthDate).getDate().toLocaleString()
  const age = currentYear - yearsOld
  const currentMonth = new Date().getMonth()
  const yearsInMonth = new Date(patientBirthDate).getMonth()
  const birthInMonthDifference = currentMonth - yearsInMonth
  const ageInMonth = age * 12 + birthInMonthDifference
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.title}>
          <View style={{ ...styles.commonSize, ...styles.hdr, marginBottom: 5 }} fixed>
            <Image src={hopedoc} style={styles.hdrimg} />
            <View style={{ fontSize: '10px', fontFamily: 'Times New Roman Reg' }}>
              <Text>г Махачкала, ул Батырая 11</Text>
              <Text>7 этаж 709 кабинет</Text>
              <Text>Тел. +7(964)0067007</Text>
            </View>
          </View>
          <Text style={styles.recomenTitle}>
            РЕКОМЕНДАЦИИ ВРАЧА
          </Text>
          <Text style={{ ...styles.commonSize, ...styles.subtitle }}>
            (ВНИМАНИЕ! ДОКУМЕНТ ИСКЛЮЧИТЕЛЬНО ДЛЯ ВНУТРЕННЕГО ПОЛЬЗОВАНИЯ ОРГАНИЗАЦИИ)
          </Text>
          <View style={{ ...styles.commonSize, ...styles.birthWrapper }}>
            {patientName ? <View style={styles.birth}>
              <Text>
                {patientName}
              </Text>
              <Text style={styles.birthText}>
                ФИО
              </Text>
            </View> : <View></View>}
            {patientBirthDate ? <View style={styles.birth}>
              <Text>
                {`${date > 9 ? date : '0' + date}.${month > 9 ? month : '0' + month}.${yearsOld} г.р. (${age > 0 ? age + 'лет' : ageInMonth + 'мес'})`}
              </Text>
              <Text style={styles.birthText}>
                Дата рождения
              </Text>
            </View> : <View></View>}
          </View>
          <Text style={styles.reasonTitle}>На основании: </Text>
          <Text style={styles.reasonSubTitle}> (указать основания: жалобы, симптомы, синдромы подозрения врача и пр.): </Text>
          <View style={{ ...styles.commonSize, ...styles.anamnesisSection }}>
            {complaint ? <Text style={styles.complaintTitle} wrap={false}><Text style={styles.complaintTitleFirstWord}>Жалоб: </Text>{complaint}</Text> : null}
            {anamnesis ? <Text style={{ ...styles.complaintTitle, marginTop: '10px' }} wrap={false}><Text style={styles.complaintTitleFirstWord}>Анамнеза- </Text>{anamnesis}
            </Text> : null}
            {diagnosticData ? <Text style={{ ...styles.complaintTitle, marginTop: '10px' }} wrap={false}><Text style={styles.complaintTitleFirstWord}>Данных обследования: </Text>{diagnosticData}</Text> : null}
          </View>
          <View style={{ ...styles.commonSize, marginTop: 10 }}>
            <Table
              title='Проведен дистанционный врачебный консилиум в составе:'
              subTitle='(указать ФИО и специальности врачей, которые участвовали в формировании заключения):'
              headers={['№', 'ФИО врача', 'Специальность']}
              dataContent={consiliumDoctors}
              contentKeys={['name', 'speciality']}
            />
          </View>
          <View style={{ marginTop: 14, ...styles.commonSize }}>
            <Table
              title='С целью проведения дифференциальной диагностики между'
              subTitle='(указать заболевания, факты и симптомы клинической картины, которых частично или полностью соответствуют заболеванию)'
              headers={['№', 'Диагноз']}
              dataContent={diagnostic}
              contentKeys={['diagnosis']}
            />
          </View>
          <View style={{ marginTop: 44, ...styles.commonSize }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid black', }} wrap={false}>
              <View style={{ width: '450px', borderRight: '1px solid black', padding: '5px' }}>
                <Text style={{ ...styles.probableDiagnosisNum, width: '100%', padding: '0px' }} hyphenationCallback={hyphenationCallback} >
                  Выявлен наиболее вероятный
                </Text>
                <Text style={{ ...styles.probableDiagnosisNum, width: '100%', padding: '0px' }} hyphenationCallback={hyphenationCallback} >
                  основной диагноз:
                </Text>
              </View>
              <View style={{ width: '650px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ ...styles.probableDiagnosisText, padding: 5 }} hyphenationCallback={hyphenationCallback}>
                  {mostProblDiagnosis}
                </Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTop: '1px solid black', }} wrap={false}>
              <View style={{ width: '450px', height: '100%', borderRight: '1px solid black', padding: '5px' }}>
                <Text style={{ ...styles.probableDiagnosisNum, width: '100%', padding: '0px' }} hyphenationCallback={hyphenationCallback} >
                  Выявлены сопутствующие
                </Text>
                <Text style={{ ...styles.probableDiagnosisNum, width: '100%', padding: '0px' }} hyphenationCallback={hyphenationCallback} >
                  диагнозы:
                </Text>
              </View>
              <View style={{ width: '650px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
                <Text style={{ ...styles.probableDiagnosisText, padding: 5, flexWrap: 'wrap' }} hyphenationCallback={hyphenationCallback}>
                  {secondaryDiagnosis}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 44, ...styles.commonSize }}>
            <Table
              headers={['№', 'Вид обследования', 'Место', 'Цель проведения']}
              dataContent={checkupPlans}
              contentKeys={['kind', 'place', 'target']}
              title='На основании проведенного консилиума рекомендован план лечения (ПЛ):'
              isDeletedPlace={isDeletedPlace}
              status={status}
            />
            {comments ? <View style={styles.tabl} wrap={false}>
              <Text style={{ fontFamily: 'Times New Roman Bold', marginTop: 14, textAlign: 'left', fontSize:'12px' }} orphans={10}>   Пояснения:</Text>
              <View style={{ ...styles.commentsWrapper, marginTop: 28 }} >
                <Text style={styles.commentsNum}>1</Text>
                <Text style={styles.commentsSecText} hyphenationCallback={hyphenationCallback}>{comments[0].comment}</Text>
              </View>
              {comments[1] ? <View style={{ ...styles.commentsWrapper, marginTop: 28 }} >
                <Text style={styles.commentsNum}>2</Text>
                <Text style={styles.commentsSecText} hyphenationCallback={hyphenationCallback}>{comments[1].comment}</Text>
              </View> : null}
            </View> : null}
            {comments.map((comment, index) => index > 1 ? <View style={{ ...styles.commentsWrapper, marginTop: 28 }} wrap={false}>
              <Text style={styles.commentsNum}>{index + 1}</Text>
              <Text style={styles.commentsSecText} hyphenationCallback={hyphenationCallback}>{comment.comment}</Text>
            </View> : null)}
          </View>
          {execDate && manager ?
            <View style={{ ...styles.commonSize, ...styles.finalDateAndFio, ...styles.finalDateAndFioText }} wrap={false}>
              <Text style={styles.exeDateText}>{new Date(execDate).toLocaleString().substring(0, 10)}</Text>
              {managerSignUrlPath ? <Image src={managerSignUrlPath} style={styles.hdrimg} /> : null}
              <Image src={sell} style={styles.hdrimg} />
              <View style={styles.managerAndSpeciality}>
                {managerSpeciality ? <Text >{managerSpeciality}</Text> : null}
                <Text>{manager}</Text>
              </View>
            </View> : null}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocContent;
