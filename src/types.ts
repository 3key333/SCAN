export interface EventFiltersInfo {
    eventFiltersInfo:{
        usedCompanyCount: number;
        companyLimit: number;
    }
}

export interface getDataFormMarks {
    fullness: boolean;
    businessContext: boolean;
    mainRole: boolean;
    riskFactors: boolean;
    techNews: boolean;
    announcements: boolean;
    newsDigest: boolean;
}

export interface getDataSearchDate {
    searchFrom: string;
    searchTo: string;
}

export interface getDataFormValidate {
    INN: boolean;
    docs: boolean;
    dateSearch: boolean;
}

interface DateInterval {
    searchFrom: string;
    searchTo: string;
}

interface MarksData {
    fullness: boolean;
    businessContext: boolean;
    mainRole: boolean;
    riskFactors: boolean;
    techNews: boolean;
    announcements: boolean;
    newsDigest: boolean;
}

export interface SearchParams {
    inn: string;
    tonality: string;
    limit: number;
    searchDate: DateInterval;
    marks: MarksData;
}

export interface DataListCard {
    period: string;
    total: number;
    risk: number;
}