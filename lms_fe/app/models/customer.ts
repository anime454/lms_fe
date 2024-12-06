export type customerPageQueryParams = {
  params: {
    cid: string;
  };
  searchParams: "";
};

export type viewCustomerPageQueryParams = {
  cid: string;
  // searchParams: {};
};

export type editCustomerPageQueryParams = {
  cid: string;
};

export type titleName = {
  tid: string;
  thName: string;
  enName: string;
  createdDate: string;
  updatedDate: string;
};

export type CustomerInformationData = {
  title: titleName;
  thName: string;
  thLastname: string;
  enName: string;
  enLastname: string;
  idcard: string;
  passportNo: string;
};

export type CustomerAddressData = {
  contactName: string; // ชื่อสถานที่ติดต่อ
  houseNumber: string; // เลขที่
  building: string; // อาคาร
  floor: string; // ชั้น
  roomNumber: string; // ห้องเลขที่
  village: string; // หมู่ที่
  alley: string; // ตรอก/ซอย
  street: string; // ถนน
  subDistrict: string; // แขวง/ตำบล
  district: string; // เขต/อำเภอ
  province: string; // จังหวัด
  postalCode: string; // รหัสไปรษณีย์
  homePhone: string; // โทรศัพท์บ้าน
  mobilePhone: string; // โทรศัพท์มือถือ
  email: string;
};

export type CustomerIncome = {
  salary: number;
  other: number;
};

export type CustomerData = {
  id: string;
  information: CustomerInformationData;
  address: CustomerAddressData;
  education: CustomerEducation;
  employment: CustomerEmployment;
  income: CustomerIncome;
  status: string;
  createdDate: string;
};

export type CustomerEducation = {
  eid: string;
  thName: string;
  enName: string;
  details: string;
  createdDate: string;
  updatedDate: string;

  // LowerThanHighSchool = "ต่ำกว่ามัธยมศึกษา",
  // HighSchool = "มัธยมศึกษา",
  // Vocational = "ปวช./ปวส.",
  // Bachelor = "ปริญญาตรี",
  // Master = "ปริญญาโท",
  // Doctorate = "ปริญญาเอก",
  // None = "-"
};

export type CustomerEmployment = {
  emid: string;
  thName: string;
  enName: string;
  details: string;
  createdDate: string;
  updatedDate: string;

  // GovernmentEmployee = "ข้าราชการ",
  // StateEnterpriseEmployee = "พนักงานรัฐวิสาหกิจ",
  // PrivateCompanyEmployee = "พนักงานบริษัทเอกชน",
  // RegisteredBusinessOwner = "เจ้าของธุรกิจที่จดทะเบียน",
  // UnregisteredBusinessOwner = "เจ้าของธุรกิจที่ไม่ได้จดทะเบียน",
  // DailyOrTemporaryWorker = "แรงงานรายวันหรือลูกจ้างชั่วคราว",
  // Homemaker = "แม่บ้าน",
  // Freelancer = "ฟรีแลนซ์",
  // None = "-"
};

export const defaultCustomerData: CustomerData = {
  id: "", // Default empty string
  createdDate:"",
  information: {
    title: {
      tid: "",
      thName: "",
      enName: "",
      createdDate: "",
      updatedDate: "",
    },
    thName: "",
    thLastname: "",
    enName: "",
    enLastname: "",
    idcard: "",
    passportNo: "",
  },
  address: {
    contactName: "",
    houseNumber: "",
    building: "",
    floor: "",
    roomNumber: "",
    village: "",
    alley: "",
    street: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    homePhone: "",
    mobilePhone: "",
    email: "",
  },
  education: {
    eid: "",
    thName: "",
    enName: "",
    details: "",
    createdDate: "",
    updatedDate: "",
  },
  employment: {
    emid: "",
    thName: "",
    enName: "",
    details: "",
    createdDate: "",
    updatedDate: "",
  },
  income: {
    salary: 0, // Default numeric values to 0
    other: 0,
  },
  status: "inactive", // Default status
};
