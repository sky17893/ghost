import symptom1 from "../assets/symptom/symptom1.jpg";
import symptom2 from "../assets/symptom/symptom2.jpg";
import symptom3 from "../assets/symptom/symptom3.jpg";
import symptom4 from "../assets/symptom/symptom4.jpg";
import symptom5 from "../assets/symptom/symptom5.jpg";
import symptom6 from "../assets/symptom/symptom6.jpg";
import symptom7 from "../assets/symptom/symptom7.jpg";

// 메인 헤더 카테고리
export const navItems = [
  { label: "챗봇", to: "/chat" },
  { label: "약품정보", to: "/mediinfo" },
  { label: "건강정보", to: "/healthinfo" },
  { label: "건의사항", to: "/service" },
];

// 메인 자주 나타나는 증상
export const symptom = [
  {
    id: 0,
    image: symptom1,
    text: "#두통",
    to: "/Symptomdetail",
  },
  {
    id: 1,
    image: symptom2,
    text: "#기침",
    to: "/Symptomdetail",
  },
  {
    id: 2,
    image: symptom3,
    text: "#피부발진",
    to: "/Symptomdetail",
  },
  {
    id: 3,
    image: symptom4,
    text: "#미열",
    to: "/Symptomdetail",
  },
  {
    id: 4,
    image: symptom5,
    text: "#근육통",
    to: "/Symptomdetail",
  },
  {
    id: 5,
    image: symptom6,
    text: "#불면증",
    to: "/Symptomdetail",
  },
  {
    id: 6,
    image: symptom7,
    text: "#변비",
    to: "/Symptomdetail",
  },
];

// 마이페이지 사이드바
export const navMenus = [
  {
    label: "회원정보 수정",
    to: "/memberinfo",
    idx: 1,
  },
  {
    label: "약품 관리",
    to: "/mymedi_list",
    idx: 2,
  },
  {
    label: "열람 목록",
    to: "/",
    idx: 3,
  },
];

// 테스트용
export const mediDetailTest = [
  {
    id: 1,
    number: 197900277,
    name: "게보린정(수출명:돌로린정)",
    company_name: "삼진제약(주)",
    main_ingredient: "아세트아미노펜,카페인무수물,이소프로필안티피린",
    efficacy:
      "이 약은 두통, 치통, 발치(이를 뽑음)후 동통(통증), 인후(목구멍)통, 귀의 통증, 관절통, 신경통, 요(허리)통, 근육통, 견통(어깨통증), 타박통, 골절통, 염좌통(삔 통증), 월경통(생리통), 외상(상처)통의 진통과 오한(춥고 떨리는 증상), 발열시의 해열에 사용합니다.",
    use: "성인은 1회 1정 1일 3회까지 공복시를 피해 복용합니다. 복용간격은 4시간 이상으로 합니다. 이 약은 원칙적�� 로 단기간 복용합니다.",
    precaution:
      "매일 세잔 이상 정기적 음주자가 이 약 또는 다른 해열진통제를 복용할 때는 의사 또는 약사와 상의하십시오. 간손상을 일으킬 수 있습니다. 아세트아미노펜으로 일일 최대 용량(4,000 mg)을 초과하여 복용하지 마십시오. 간손상을 일으킬 수 있습니다. 아세트아미노펜을 포함하는 다른 제품과 함께 복용하지 마십시오.",
    caution_on:
      "이 약에 과민증 환자, 다른 해열진통제(비스테로이드성 소염제), 감기약 복용시 천식발작 유발 또는 그 경험자, 글루코스-6-인산 탈수소효소결핍증, 급성 간헐성(시간 간격을 두고 되풀이하여) 포르피린증, 과립백혈구감소증, 중증 간장애, 중증 신장애, 출혈 소인, 15세 미만의 소아, 소화성궤양, 심한 혈액 이상, 심한 심장기능저하, 바르비탈계 약물, 삼환계 항우울제, 알코올을 복용한 환자는 이 약을 복용하지 마십시오.이 약을 복용하기 전에 수두 또는 인플루엔자에 감염되어 있거나 또는 의심되는 15세 이상의 청소년, 갑상샘질환, 당뇨병, 고혈압, 몸이 약한 사람, 고열, 고령자, 임부 또는 임신하고 있을 가능성이 있는 여성, 수유부, 속쓰림, 위부불쾌감, 위통과 같은 위장문제가 지속 혹은 재발되는 사람, 간장애, 신장(콩팥)장애, 소화성궤양, 혈액이상, 출혈경향이 있는 환자, 심장기능이상, 기관지천식 환자는 의사 또는 약사와 상의하십시오.",
    side_effect:
      "쇽 증상(호흡곤란, 온몸이 붉어짐, 혈관부기, 두드러기 등), 천식발작, 혈소판 감소, 과립구감소, 용혈성빈혈, 메트헤모글로빈혈증, 혈소판기능 저하(출혈시간 연장), 청색증, 구역, 구토, 식욕부진, 위장출혈, 소화성궤양, 천공(뚫림), 발진, 피부점막안증후군(스티븐스-존슨증후군), 독성표피괴사용해(리엘증후군: 고열을 수반하며 발진, 발적 충혈되어 붉어짐, 화상모양 수포 등의 격렬한 증상이 전신피부, 입 및 눈의 점막에 나타난 경우), 전신의 나른함, 황달, 간질성폐렴(기침, 숨이참, 호흡곤란, 발열), 간기능이상, 고정발진 등이 나타나는 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.",
    storage:
      "습기와 빛을 피해 실온에서 보관하십시오.어린이의 손이 닿지 않는 곳에 보관하십시오.",
    image: require("../assets/mediDetailTest/게보린정.jpg"),
  },
];
// 테스트용2
export const mediDetailTest2 = [
  {
    id: 2,
    number: 199400883,
    name: "겔포스엠현탁액",
    company_name: "(주)보령",
    main_ingredient: "인산알루미늄겔,수산화마그네슘,시메티콘",
    efficacy:
      "이 약은 위과다(위염, 위·십이지장궤양에 관련된 것도 포함), 속쓰림, 위부불쾌감, 위부팽만감, 체함, 구역, 구토, 위통, 신트림에 사용합니다.",
    use: "성인 1회 1포씩, 1일 3회 식간(식사 때와 식사 때 사이) 및 취침 시 복용합니다. 복용간격은 4시간 이상으로 합니다.",
    precaution:
      "3개월 미만의 영아는 이 약을 복용하지 마십시오. 이 약을 복용하기 전에 1세 미만의 영아, 신장애 환자는 의사 또는 약사와 상의하십시오. 정해진 용법과 용량을 잘 지키십시오.",
    caution_on: "테트라사이클린계 항생제를 함께 복용하지 마십시오.",
    side_effect:
      "변비 또는 설사 등이 나타나는 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.",
    storage:
      "습기와 빛을 피해 실온에서 보관하십시오. 어린이의 손이 닿지 않는 곳에 보관하십시오.",
    manufactured_date: "2020-12-24",
    expiration_date: "2024-01-17",
    image: require("../assets/mediDetailTest/겔포스엠현탁액.jpg"),
  },
];

// 테스트용3
export const mediDetailTest3 = [
  {
    id: 3,
    number: 197400207,
    name: "겔포스현탁액(인산알루미늄겔)",
    company_name: "(주)보령",
    main_ingredient: "인산알루미늄겔,콜로이드성인산알루미늄",
    efficacy:
      "이 약은 위·십이지장 궤양, 위염, 위산과다(속쓰림, 위통, 구역, 구토)의 제산작용 및 증상의 개선에 사용합니다.",
    use: "성인은 1회 1포씩, 1일 3~4회 식간(식사 때와 식사 때 사이) 및 취침 시 복용합니다. 연령 또는 증상에 따라 적절히 증감합니다.",
    precaution:
      "이 약을 복용하기 전에 신장장애, 변비 환자는 의사 또는 약사와 상의하십시오.",
    caution_on: "테트라사이클린계 항생물질과 함께 사용하지 마십시오.",
    side_effect: "변비 등이 나타날 수 있습니다.",
    storage: "빛을 피해 실온에서 보관하십시오.",
    manufactured_date: "2021-02-25",
    expiration_date: "2024-01-17",
    image: require("../assets/mediDetailTest/겔포스현탁액.jpg"),
  },
];

// 테스트용4
export const mediDetailTest4 = [
  {
    id: 4,
    number: 200300406,
    name: "닥터베아제정",
    company_name: "(주)대웅제약",
    main_ingredient:
      "디아스타제·프로테아제·셀룰라제,판셀라제,크리아제-PEG,디아스타제·프로테아제100,판프로신,리파제,브로멜라인,우르소데옥시콜산,시메티콘파우더",
    efficacy:
      "이 약은 소화불량, 식욕감퇴(식욕부진), 과식, 체함, 소화촉진, 소화불량으로 인한 위부팽만감에 사용합니다.",
    use: "성인 1회 1��을 1일 3회 식후에 복용합니다.",
    precaution:
      "만 7세 이하의 소아는 이 약을 복용하지 마십시오.이 약을 복용하기 전에 알레르기 체질인 사람, 임부 또는 임신하고 있을 가능성이 있는 여성, 이 약 또는 황색4호에 과민증 환자는 의사 또는 약사와 상담하십시오.정해진 용법과 용량을 잘 지키십시오.2주 정도 복용하여도 증상의 개선이 없을 경우 즉각 복용을 중지하고 의사 또는 약사와 상담하십시오.",
    storage:
      "습기와 빛을 피해 실온에서 보관하십시오.어린이의 손이 닿지 않는 곳에 보관하십시오.",
    manufactured_date: "2020-12-24",
    expiration_date: "2021-01-29",
    image: require("../assets/mediDetailTest/닥터베아제정.jpg"),
  },
];
