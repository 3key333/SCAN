import { createSlice } from "@reduxjs/toolkit";
import { searchData, searchDocuments, searchPublications } from "./searchThunk";

interface DocumentAttributes {
    isTechNews: boolean;
    isAnnouncement: boolean;
    isDigest: boolean;
    wordCount: boolean;
}

interface DocumentContent {
    markup: string;
}

interface DocumentTitle {
    text: string;
    markup: string;
}

interface DocumentSourse{
    id: number;
    name: string;
    categoryId: number;
    levelId: number;
    groupId: number;
}

interface DocumentAuthor{
    name: string;
}

interface ScanDoc {
    schemaVersion: string;
    id: string;
    version: number;
    issueDate: string;
    url: string;
    author: DocumentAuthor;
    source: DocumentSourse;
    dedupClusterId: string;
    title: DocumentTitle;
    content: DocumentContent;
    attributes: DocumentAttributes;
    language: 'Russian' | 'other' | 'unknown '; 
}

interface SearchDocuments{
    ok: ScanDoc;
    fail?: {
        errorCode: string;
        errorMessage: string;
    };
}

interface SearchResultPublicationsItem {
    encodedId: string;
    influence: number;
    similarCount: number;
}

interface SearchResultPublications {
    items: SearchResultPublicationsItem[];
    mappings: [];
}

interface IntervalPoint {
    date: string
    value: number
}

interface HistogramItem {
    data: IntervalPoint[]
    histogramType: 'totalDocuments' | 'riskFactors'
}

interface HistogramsResponse {
    data: HistogramItem[]
}

interface SearchState {
    data: HistogramsResponse | null;
    loading: boolean;
    error: string | null;

    publicationsId: SearchResultPublications | null;
    publicationsIdLoading: boolean;

    documents: SearchDocuments[] | null;
    documentsLoading: boolean;
}

const initialState: SearchState = {
    data: null,
    loading: false,
    error: null,

    publicationsId: null,
    publicationsIdLoading: false,

    documents: null,
    documentsLoading: false,
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(searchData.pending, (state) => {
                state.data = null;
                state.loading = true;
                state.error = null;
            })

            .addCase(searchData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })

            .addCase(searchData.rejected, (state) => {
                state.data = null;
                state.loading = false;
                state.error = 'Запрос завершился неудачно';
            })


            .addCase(searchPublications.pending, (state) => {
                state.publicationsId = null;
                state.publicationsIdLoading = true;
            })

            .addCase(searchPublications.fulfilled, (state, action) => {
                state.publicationsId = action.payload;
                state.loading = false;
            })

            .addCase(searchPublications.rejected, (state) => {
                state.publicationsId = null;
                state.publicationsIdLoading = false;
            })


            .addCase(searchDocuments.pending, (state) => {
                state.documents = null;
                state.documentsLoading = true;
            })

            .addCase(searchDocuments.fulfilled, (state, action) => {
                state.documents = action.payload;
                state.documentsLoading = false;
            })

            .addCase(searchDocuments.rejected, (state) => {
                state.documents = null;
                state.documentsLoading = false;
            })

    }
})

export default searchSlice.reducer