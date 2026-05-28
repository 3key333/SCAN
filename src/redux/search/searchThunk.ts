import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { SearchParams } from "../../types";

export const searchData = createAsyncThunk(
    'search/data',
    async (params: SearchParams, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('accessToken')

            const tonalityMap = {
                'Любая': 'any',
                'Позитивная': 'positive',
                'Негативная': 'negative',
            }

            const startDate = `${params.searchDate.searchFrom}T00:00:00+03:00`
            const endDate = `${params.searchDate.searchTo}T23:59:59+03:00`

            const body = {
                "issueDateInterval": {
                  "startDate": startDate,
                  "endDate": endDate
                },
                "searchContext": {
                  "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                      {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": Number(params.inn),
                        "maxFullness": params.marks.fullness,
                        "inBusinessNews": params.marks.businessContext ? true : null
                      }
                    ],
                    "onlyMainRole": params.marks.mainRole,
                    "tonality": tonalityMap[params.tonality as keyof typeof tonalityMap],
                    "onlyWithRiskFactors": params.marks.riskFactors,
                        "riskFactors": {
                          "and": [],
                          "or": [],
                          "not": []
                        },
                        "themes": {
                          "and": [],
                          "or": [],
                          "not": []
                        }
                    },
                    "themesFilter": {
                      "and": [],
                      "or": [],
                      "not": []
                    }
                },
                "searchArea": {
                  "includedSources": [],
                  "excludedSources": [],
                  "includedSourceGroups": [],
                  "excludedSourceGroups": []
                },
                "attributeFilters": {
                  "excludeTechNews": !params.marks.techNews,
                  "excludeAnnouncements": !params.marks.announcements,
                  "excludeDigests": !params.marks.newsDigest
                },
                "similarMode": "duplicates",
                "limit": params.limit,
                "sortType": "sourceInfluence",
                "sortDirectionType": "desc",
                "intervalType": "month",
                "histogramTypes": [
                  "totalDocuments",
                  "riskFactors"
                ]
            }

            const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/v1/objectsearch/histograms`, body, { 
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            return data
            
        } catch (error) {
            return rejectWithValue('ошибка отправки запроса на поиск данных')
        }
    }
)


export const searchPublications = createAsyncThunk(
  'search/publications',
  async (params: SearchParams, {rejectWithValue}) => {

    try {
      const token = localStorage.getItem('accessToken')

      const tonalityMap = {
        'Любая': 'any',
        'Позитивная': 'positive',
        'Негативная': 'negative'
      }

      const startDate = `${params.searchDate.searchFrom}T00:00:00+03:00`
      const endDate = `${params.searchDate.searchTo}T23:59:59+03:00`

      const body = {
        "issueDateInterval": {
          "startDate": startDate,
          "endDate": endDate
        },
        "searchContext": {
          "targetSearchEntitiesContext": {
            "targetSearchEntities": [
              {
                "type": "company",
                "sparkId": null,
                "entityId": null,
                "inn": Number(params.inn),
                "maxFullness": params.marks.fullness,
                "inBusinessNews": params.marks.businessContext ? true : null
              }
            ],
            "onlyMainRole": params.marks.mainRole,
            "tonality": tonalityMap[params.tonality as keyof typeof tonalityMap],
            "onlyWithRiskFactors": params.marks.riskFactors,
                "riskFactors": {
                  "and": [],
                  "or": [],
                  "not": []
                },
                "themes": {
                  "and": [],
                  "or": [],
                  "not": []
                }
            },
            "themesFilter": {
              "and": [],
              "or": [],
              "not": []
            }
        },
        "searchArea": {
          "includedSources": [],
          "excludedSources": [],
          "includedSourceGroups": [],
          "excludedSourceGroups": []
        },
        "attributeFilters": {
          "excludeTechNews": !params.marks.techNews,
          "excludeAnnouncements": !params.marks.announcements,
          "excludeDigests": !params.marks.newsDigest
        },
        "similarMode": "duplicates",
        "limit": params.limit,
        "sortType": "sourceInfluence",
        "sortDirectionType": "desc",
        "intervalType": "month",
        "histogramTypes": [
          "totalDocuments",
          "riskFactors"
        ]
      }

      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/v1/objectsearch`, body, {
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })

      return data

    } catch (error) {
      return rejectWithValue('ошибка запроса на получение списка документов')
    }

  }
)


export const searchDocuments = createAsyncThunk(
  'search/documents',
  async (params: {ids: string[]}, {rejectWithValue}) => {

    try {

      const token = localStorage.getItem(`accessToken`)

      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/v1/documents`, params, {
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      
      return data

    } catch (error) {
      return rejectWithValue('ошибка получения документов по id')
    }

  }
)