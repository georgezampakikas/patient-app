export interface PatientDto {
  id: number;
  patientIdentity: PatientIdentity;
  demographicInfo: DemographicInfo;
  contactInfo: ContactInfo;
}

export interface PatientIdentity {
  code: string;
  amka: string;
  lastName: string;
  firstName: string;
  status: string;
}

export interface DemographicInfo {
  birthDate: string;
  birthPlace: string;
  gender: NamedEntity;
  maritalStatus: NamedEntity;
  fatherName: string;
  motherName: string;
  language: string;
  nationality: NamedEntity;
  profession: NamedEntity;
  education: NamedEntity;
}

export interface ContactInfo {
  phone1TypeId: number;
  phone1: string;  
  phone1Label: string;
  phone2TypeId: number;
  phone2: string; 
  phone2Label: string;
  phone3TypeId: number;
  phone3: string;  
  phone3Label: string;
  addressTypeId: number;
  addressLabel: string;
  address: string;
  email: string;
}

export interface NamedEntity {
  id: number;
  name: string;
}




export interface GenderDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface MaritalStatusDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface EducationLevelDto {
  id: number;
  name: string;
  order: number;
  years: number;
  isActive: boolean;
}

export interface NationalityDto {
  id: number;
  name: string;
  countryCode: string;
  isActive: boolean;
}

export interface ProfessionDto {
  id: number;
  name: string;
  category: string;
  isActive: boolean;
}

export interface PhoneTypeDto {
  id: number;
  name: string;
}

export interface AddressTypeDto {
  id: number;
  name: string;
}

export interface LabTestDto {
  id: number;
  name: string;
  unit: string;
  normalRange: string;
}

export interface PatientTestResultDto {
  patientId: number;
  issueDate: string;
  testId: number;
  result: number;
}

export interface PatientResultTableDto {
  id: number;
  name: string;
  unit: string;
  normalRange: string;
  testId?: number;
  result?: number;
  patientId?: number;
  issueDate?: Date;
}

export interface LabTestV2Dto {
  id: number;
  code: string;
  name: string;
  unit: string;
  normalValues: string;
  category: string;
}

export interface LabTestGroup {
  category: string;
  tests: LabTestV2Dto[];
}

export interface PatientV2Dto {
  id: number;
  patientIdentity: PatientIdentity;
  demographicInfo: DemographicInfoV2;
  contactInfo: ContactInfoV2;
}

export interface DemographicInfoV2 {
  birthDate: string;
  birthPlace: string;
  gender: NamedEntity;
  maritalStatus: NamedEntity;
}

export interface ContactInfoV2 {
  mobilePhone: number;
  email: string;
}