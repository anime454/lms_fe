import axios from "@/app/_axios/axios";
import { CustomerData, CustomerEducation, CustomerEmployment, defaultCustomerData, titleName } from "@/app/models/customer";

interface fetchEducationsResp {
    code: number;
    message: string;
    data: {
        Education: {
        eid: string;
        th_name: string;
        en_name: string;
        details: string;
        created_date: string;
        updated_date: string;
        }[];
    };
}

interface fetchEmploymentsResp {
    code: number;
    message: string;
    data: {
        Employment: {
            emid: string;
            th_name: string;
            en_name: string;
            details: string;
            created_date: string;
            updated_date: string;
        }[];
    };
}

interface GetCustomerDashboardDetailResp {
    total: number
    data: CustomerData[]
}

interface fetchCustomersResp {
    code: number;
    message: string;
    data: {
        customers: {
            cid: string;
            th_name: string;
            th_lastname: string;
            id_card: string;
            passport_no: string;
            mobile_no: string;
            status: string;
            created_date: string;
        }[],
        total: number;
    };
}


export const fetchCustomers = async (rowsPerPage: number, page: number):Promise<GetCustomerDashboardDetailResp> => {
    
    const requestBody = {
        limit: rowsPerPage,
        offset: rowsPerPage * page , 
    }

    try {
        const response = await axios.post<fetchCustomersResp>(
            '/customer/get-all',
            requestBody,
        );

        if (response.status === 200 || response.status === 201) {
            const custs: CustomerData[] = response.data.data.customers.map((c) => ({
                ...defaultCustomerData,
                id: c.cid,
                information: {
                    ...defaultCustomerData.information,
                    thName: c.th_name,
                    thLastname: c.th_lastname,
                    idcard: c.id_card,
                    passportNo: c.passport_no,
                },
                address: {
                    ...defaultCustomerData.address,
                    mobilePhone: c.mobile_no,
                },
                status: c.status,
            }));

            return Promise.resolve({
                total: response.data.data.total,
                data: custs
            })
        } else {
            return Promise.reject({})
        }
    } catch(e) {
        console.error(e)
        return Promise.reject({})
    }
};



interface fetchCustomerResp {
    code: number;
    message: string;
    data: {
        cid: string,
        title: {
            tid: string,
            th_name: string,
            en_name: string,
            created_date: string,
            updated_date: string,
        },
        th_name: string,
        en_name: string,
        th_lastname: string,
        en_lastname: string,
        ic_card: string,
        passport_no: string,
        address: {
            contact_name: string,
            building_no: string,
            building_name: string,
            floor: string,
            room_no: string,
            village_no: string,
            alley: string,
            street: string,
            sub_district: string,
            district: string,
            province: string,
            postal_code: string,
            home_phone: string,
        },
        mobile_no: string,
        email: string,
        education: {
            eid: string,
            th_name: string,
            en_name: string,
            details: string,
            created_date: string,
            updated_date: string,
        },
        employment: {
            emid: string,
            th_name: string,
            en_name: string,
            details: string,
            created_date: string,
            updated_date: string,
        },
        salary: number,
        status: string,
        other_income: number,
    };
}
export const fetchCustomer = async(cid: string): Promise<CustomerData> => {
    const resp = await axios.post<fetchCustomerResp>("/customer/view", {cid: cid})
    return {
        id: resp.data.data.cid,
        createdDate: "",
        information: {
            title: {
                ...defaultCustomerData.information.title,
                tid: resp.data.data.title.tid,
                thName: resp.data.data.title.th_name ,
                enName: resp.data.data.title.en_name,
            },
            thName: resp.data.data.th_name,
            thLastname: resp.data.data.th_lastname,
            enName: resp.data.data.en_name,
            enLastname: resp.data.data.en_lastname,
            idcard: resp.data.data.ic_card,
            passportNo: resp.data.data.passport_no,
        },
        address: {
            contactName: resp.data.data.address.contact_name,
            houseNumber: resp.data.data.address.building_no,
            building: resp.data.data.address.building_name,
            floor: resp.data.data.address.floor,
            roomNumber: resp.data.data.address.room_no,
            village: resp.data.data.address.village_no,
            alley: resp.data.data.address.alley,
            street: resp.data.data.address.street,
            subDistrict: resp.data.data.address.sub_district,
            district: resp.data.data.address.district,
            province: resp.data.data.address.province,
            postalCode: resp.data.data.address.postal_code,
            homePhone: resp.data.data.address.home_phone,
            mobilePhone: resp.data.data.mobile_no,
            email: resp.data.data.email,
        },
        education: {
            ...defaultCustomerData.education,
            eid: resp.data.data.education.eid,
            thName: resp.data.data.education.th_name,
            enName: resp.data.data.education.en_name,
            details: resp.data.data.education.details,
        },
        employment: {
            ...defaultCustomerData.employment,
            emid: resp.data.data.employment.emid,
            thName: resp.data.data.employment.th_name,
            enName: resp.data.data.employment.en_name,
            details: resp.data.data.employment.details,
        },
        income: {
            salary: resp.data.data.salary,
            other: resp.data.data.other_income,
        },
        status: resp.data.data.status,
    }
}


export const fetchEducations = async (): Promise<CustomerEducation[]> => {
    try {
        const resp = await axios.get<fetchEducationsResp>("/education/");
        if (resp.status === 200) {
            const edus: CustomerEducation[] = resp.data.data.Education.map((e) => ({
                eid: e.eid,
                thName: e.th_name,
                enName: e.en_name,
                details: e.details,
                createdDate: e.created_date,
                updatedDate: e.updated_date,
            }));
            return Promise.resolve(edus);
        } else {
            return Promise.reject({});
        }
    } catch (e) {
        console.error(e)
        return Promise.reject({});
    }
};

export const fetchEmployments = async (): Promise<CustomerEmployment[]> => {
    
    try {
        const response = await axios.get<fetchEmploymentsResp>("/employment/");
        if (response.status === 200 ) {
            const emps: CustomerEmployment[] = response.data.data.Employment.map((e) => ({
                emid: e.emid,
                thName: e.th_name,
                enName: e.en_name,
                details: e.details,
                createdDate: e.created_date,
                updatedDate: e.updated_date,
            }));
            return Promise.resolve(emps)
        } else {
            return Promise.reject({})
        }
    } catch (e) {
        console.error(e)
        return Promise.reject({})
    }
};


type newCustomerReq = {
    cid?: string;
    title_id: string;
    th_name: string;
    en_name: string;
    th_lastname: string;
    en_lastname: string;
    ic_card: string;
    passport_no: string;
    address: {
        contact_name: string;
        building_no: string;
        building_name: string;
        floor: string;
        room_no: string;
        village_no: string;
        alley: string;
        street: string;
        sub_district: string;
        district: string;
        province: string;
        postal_code: string;
        home_phone: string;
    };
    mobile_no: string;
    email: string;
    education_id: string;
    employment_id: string;
    salary: number;
    other_income: number;
}

type newCustomerResp = {
    code: number
    message: string
    data: {
        cid: string
    }
}

export const newCustomer = async (req: newCustomerReq): Promise<newCustomerResp> => {
    const resp = await axios.post<newCustomerResp>("/customer/new", req)
    return {
        code: resp.data.code,
        message: resp.data.message,
        data: resp.data.data
    }
}

export function convertCustomerDataToRequestBody(customerData: CustomerData, cid?: string): newCustomerReq {
    return {
        cid: cid,
        title_id: customerData.information.title.tid,
        th_name: customerData.information.thName,
        en_name: customerData.information.enName,
        th_lastname: customerData.information.thLastname,
        en_lastname: customerData.information.enLastname,
        ic_card: customerData.information.idcard,
        passport_no: customerData.information.passportNo,
        address: {
            contact_name: customerData.address.contactName,
            building_no: customerData.address.houseNumber,
            building_name: customerData.address.building,
            floor: customerData.address.floor,
            room_no: customerData.address.roomNumber,
            village_no: customerData.address.village,
            alley: customerData.address.alley,
            street: customerData.address.street,
            sub_district: customerData.address.subDistrict,
            district: customerData.address.district,
            province: customerData.address.province,
            postal_code: customerData.address.postalCode,
            home_phone: customerData.address.homePhone,
        },
        mobile_no: customerData.address.mobilePhone,
        email: customerData.address.email,
        education_id: customerData.education.eid, // assuming `eid` is numeric
        employment_id: customerData.employment.emid, // assuming `emid` is numeric
        salary: customerData.income.salary,
        other_income: customerData.income.other,
    };
}

interface fetchCustomerTitleResp {
    code: number;
    message: string;
    data: {
        Title: {
            tid: string;
            th_name: string;
            en_name: string;
            created_date: string;
            updated_date: string;
        }[]
    };
}

export const fetchCustomerTitles = async (): Promise<titleName[]> => {
    const response = await axios.get<fetchCustomerTitleResp>("/customer-title/");
    const tit: titleName[] = response.data.data.Title.map((t) => ({
        tid: t.tid,
        thName: t.th_name,
        enName:  t.en_name,
        createdDate: t.created_date,
        updatedDate: t.updated_date,
    }));
    return tit
};

export const removeCustomer = async (cid: string): Promise<string> =>{
    interface Resp {
        code: number;
        message: string;
        data: {
            cid: string;
        };
    }
    const response = await axios.post<Resp>(
        '/customer/remove',
        {
            cid: cid
        },
    );
    return response.data.data.cid
}