import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TmdbService {

    constructor() { }


    filtersToQueryParams(filters: Record<MovieFilter, any>[]): string {

    }


    queryParamsToFilters(params: string): Record<MovieFilter>[] {

    }


    private parseList(list: string[], operator: string): string {
        return list.join(operator)
    }

}

const operators = { and: ",", or: "|" }

const movieSort = {
    key: "sort_by",
    values: {
        originalTitleAsc: "original_title.asc",
        originalTitleDesc: "original_title.desc",
        popularityAsc: "popularity.asc",
        popularityDesc: "popularity.desc",
        revenueAsc: "revenue.asc",
        revenueDesc: "revenue.desc",
        primaryReleaseDateAsc: "primary_release_date.asc",
        primaryReleaseDateDesc: "primary_release_date.desc",
        titleAsc: "title.asc",
        titleDesc: "title.desc",
        voteAverageAsc: "vote_average.asc",
        voteAverageDesc: "vote_average.desc",
        voteCountAsc: "vote_count.asc",
        voteCountDesc: "vote_count.desc"
    }
}

const movieFilters = {
    certification: { key: "certification" }, //use in conjunction with region
    certificationGte: { key: "certification.gte" }, //use in conjunction with region
    certificationLte: { key: "certification.lte" }, //use in conjunction with region
    certificationCountry: { key: "certification_country" }, //use in conjunction with the certification, certification.gte and certification.lte filters
    includeAdult: { key: "include_adult" }, //Defaults to false
    includeVideo: { key: "include_video" }, //Defaults to false
    language: { key: "language" }, //Defaults to en- US
    page: { key: "page" }, //int32 Defaults to 1
    primaryReleaseYear: { key: "primary_release_year" }, //int32
    primaryReleaseDateGte: { key: "primary_release_date.gte" }, // date
    primaryReleaseDateLte: { key: "primary_release_date.lte" }, //date
    region: { key: "region" }, //string
    releaseDateGte: { key: "release_date.gte" }, // date
    releaseDateLte: { key: "release_date.lte" }, // date
    voteAverageGte: { key: "vote_average.gte" }, // float
    voteAverageLte: { key: "vote_average.lte" }, // float
    voteCountGte: { key: "vote_count.gte" }, //float
    voteCountLte: { key: "vote_count.lte" }, //float
    watchRegion: { key: "watch_region" }, // string use in conjunction with with_watch_monetization_types or with_watch_providers
    withCast: { //string can be a comma(AND) or pipe(OR) separated query
        key: "with_cast", operators: operators
    },
    withCompanies: { // string can be a comma(AND) or pipe(OR) separated query
        key: "with_companies", operators: operators
    },
    withCrew: { //string can be a comma(AND) or pipe(OR) separated query
        key: "with_crew", operators: operators
    },

    withGenres: { //string can be a comma(AND) or pipe(OR) separated query
        key: "with_genres", operators: operators
    },

    withKeywords: { // string can be a comma(AND) or pipe(OR) separated query
        key: "with_keywords", operators: operators
    },
    withOriginCountry: { key: "with_origin_country" }, //string
    withOriginalLanguage: { key: "with_original_language" }, // string
    withPeople: {//string can be a comma(AND) or pipe(OR) separated query
        key: "with_people", operators: operators
    },
    withReleaseType: {
        //int32 possible values are: [1, 2, 3, 4, 5, 6] can be a comma(AND) or pipe(OR) separated query, can be used in conjunction with region
        key: "with_release_type", values: [1, 2, 3, 4, 5, 6], operators: operators
    },

    withRuntimeGte: { key: "with_runtime.gte" }, //int32
    withRuntimeLte: { key: "with_runtime.lte" }, //int32
    withWatchMonetizationTypes: { // string possible values are: [flatrate, free, ads, rent, buy] use in conjunction with watch_region, can be a comma(AND) or pipe(OR) separated query
        key: "with_watch_monetization_types", values: {
            flatRate: "flatrate", free: "free", ads: "ads", rent: "rent", buy: "buy",
            operators: operators
        }
    },
    withWatchProviders: {//string use in conjunction with watch_region, can be a comma(AND) or pipe(OR) separated query
        key: "with_watch_providers", operators: operators
    },
    withoutCompanies: { key: "without_companies" }, //string
    withoutGenres: { key: "without_genres" }, //string
    withoutKeywords: { key: "without_keywords" }, //string
    withoutWatchProviders: { key: "without_watch_providers" }, // string
    year: { key: "year" }, // in32
} as const


type MovieFilter = keyof typeof movieFilters
