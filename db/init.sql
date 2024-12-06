CREATE SCHEMA IF NOT EXISTS lms;

CREATE TABLE IF NOT EXISTS lms.customers(
    id SERIAL UNIQUE,
    cid VARCHAR(36) PRIMARY KEY,
    title_id VARCHAR(36) NOT NULL,
    th_name VARCHAR(100) NOT NULL,
    en_name VARCHAR(100),
    th_lastname VARCHAR(100) NOT NULL,
    en_lastname VARCHAR(100), 
    id_card VARCHAR(20) NOT NULL,
    passport_no VARCHAR(20),
    mobile_no VARCHAR(20) NOT null,
    email VARCHAR(50), 
    education_id VARCHAR(36),
    employment_id VARCHAR(36),
    salary BIGINT,
    status VARCHAR(20) NOT NULL,
    other_income BIGINT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lms.addresses(
    id SERIAL UNIQUE,
    aid VARCHAR(36) PRIMARY KEY,
    cid VARCHAR(36) NOT NULL,
    contact_name VARCHAR(255),         -- ชื่อสถานที่ติดต่อ
    building_no VARCHAR(50),           -- เลขที่
    building_name VARCHAR(255),        -- อาคาร
    floor VARCHAR(10),                 -- ชั้น
    room_no VARCHAR(50),               -- ห้องเลขที่
    village_no VARCHAR(50),            -- หมู่ที่
    alley VARCHAR(255),                -- ตรอก/ซอย
    street VARCHAR(255),               -- ถนน
    subdistrict VARCHAR(255),          -- แขวง/ตำบล
    district VARCHAR(255),             -- เขต/อำเภอ
    province VARCHAR(255),             -- จังหวัด
    postal_code VARCHAR(10),           -- รหัสไปรษณีย์
    home_phone VARCHAR(20),            -- โทรศัพท์บ้าน
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lms.loans(
    id SERIAL UNIQUE,
    lid VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    criteria TEXT,
    characteristic_type VARCHAR(25) NOT NULL,
    amortization_duration BIGINT,
    amortization_period_type VARCHAR(25) NOT NULL,
    interest_rate_type VARCHAR(25) NOT NULL,
    interest_rate_value BIGINT,
    maximum_loan_amount BIGINT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lms.loan_criteria(
    id SERIAL UNIQUE,
    cid VARCHAR(36) PRIMARY KEY,
    risk_profile VARCHAR(50) NOT NULL,        
    asset_nature VARCHAR(50) NOT NULL,        
    min_asset_value BIGINT NOT NULL,          
    credit_score INT NOT NULL,                
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lms.payments (
    id SERIAL UNIQUE,                      
    pid VARCHAR(36) PRIMARY KEY,
    cid VARCHAR(36) NOT NULL,              
    lid VARCHAR(36)NOT NULL,               
    due_date DATE NOT NULL,                
    status VARCHAR(50) NOT NULL,        
    amount BIGINT NOT NULL,             
    interest_rate INT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lms.education_list (
    id SERIAL UNIQUE,
    eid VARCHAR(36) PRIMARY KEY,
    th_name  VARCHAR(500) NOT NULL,
    en_name  VARCHAR(500),
    details TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO lms.education_list (eid, th_name, en_name, details) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'ต่ำกว่ามัธยมศึกษา', 'Lower than High School', 'Education level below high school'),
('550e8400-e29b-41d4-a716-446655440001', 'มัธยมศึกษา', 'High School', 'High school education level'),
('550e8400-e29b-41d4-a716-446655440002', 'ปวช./ปวส.', 'Vocational Certificate', 'Vocational education level'),
('550e8400-e29b-41d4-a716-446655440003', 'ปริญญาตรี', 'Bachelor''s Degree', 'Undergraduate education level'),
('550e8400-e29b-41d4-a716-446655440004', 'ปริญญาโท', 'Master''s Degree', 'Graduate education level'),
('550e8400-e29b-41d4-a716-446655440005', 'ปริญญาเอก', 'Doctoral Degree', 'Doctorate education level');

CREATE TABLE IF NOT EXISTS lms.employment_list (
    id SERIAL UNIQUE,
    emid VARCHAR(36) PRIMARY KEY,
    th_name  VARCHAR(500) NOT NULL,
    en_name  VARCHAR(500),
    details TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO lms.employment_list (emid, th_name, en_name, details) VALUES
('61ad200-e29a-21d2-a715-333322110000' , 'ข้าราชการ', 'Government Official', 'Works in a government office'),
('61ad200-e29a-21d2-a715-333322109999' , 'พนักงานรัฐวิสาหกิจ', 'State Enterprise Employee', 'Works in a state-owned enterprise'),
('61ad200-e29a-21d2-a715-333322109998' , 'พนักงานบริษัทเอกชน', 'Private Company Employee', 'Works in a private company'),
('61ad200-e29a-21d2-a715-333322109997' , 'เจ้าของธุรกิจที่จดทะเบียน', 'Registered Business Owner', 'Owns a registered business'),
('61ad200-e29a-21d2-a715-333322109996' , 'เจ้าของธุรกิจที่ไม่ได้จดทะเบียน', 'Unregistered Business Owner', 'Owns an unregistered business'),
('61ad200-e29a-21d2-a715-333322109995' , 'แรงงานรายวันหรือลูกจ้างชั่วคราว', 'Daily Wage Worker or Temporary Employee', 'Works on a daily wage or temporary basis'),
('61ad200-e29a-21d2-a715-333322109994' , 'แม่บ้าน', 'Housewife', 'Responsible for household management'),
('61ad200-e29a-21d2-a715-333322109993' , 'ฟรีแลนซ์', 'Freelancer', 'Works as a freelancer'),
('61ad200-e29a-21d2-a715-333322109992' , '-', 'Other', 'Other or not specified');

CREATE TABLE IF NOT EXISTS lms.customer_title_list (
    id SERIAL UNIQUE,
    tid VARCHAR(36) PRIMARY KEY,
    th_name  VARCHAR(500) NOT NULL,
    en_name  VARCHAR(500),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO lms.customer_title_list (tid, th_name, en_name)
VALUES
    ('550e8422-e29b-41d4-b111-446655440000', 'นาย', 'Mr.'),
    ('550e8422-e29b-41d4-b111-446655440001', 'นาง', 'Mrs.'),
    ('550e8422-e29b-41d4-b111-446655440002', 'นางสาว', 'Miss'),
    ('550e8422-e29b-41d4-b111-446655440003', 'ด็อกเตอร์', 'Dr.'),
    ('550e8422-e29b-41d4-b111-446655440004', 'ศาสตราจารย์', 'Professor');
