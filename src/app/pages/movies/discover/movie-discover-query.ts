import { ParseResult, QueryObject, QueryObjectStatic, QueryViolation, resolveConflict, validBoolean, validDate, validId, validOption, validVote } from '@app/discover';
import { MOVIE_SORT_OPTIONS, MovieDiscoverFilters, MovieSortOrder } from './movie-discover-filters.interface';

export class MovieDiscoverQuery implements QueryObject<MovieDiscoverQuery>, MovieDiscoverFilters {

    readonly genresAll: number[]
    readonly genresAny: number[]
    readonly includeAdult: boolean
    readonly includeVideo: boolean
    readonly keywordsAll: number[]
    readonly keywordsAny: number[]
    readonly releaseDateGte: Date | null
    readonly releaseDateLte: Date | null
    readonly voteAverageGte: number | null
    readonly voteAverageLte: number | null
    readonly sortOrder: MovieSortOrder | null

    static fromParams: QueryObjectStatic<MovieDiscoverFilters>

    constructor(params: Partial<MovieDiscoverFilters>) {
        this.genresAll = params.genresAll ?? []
        this.genresAny = params.genresAny ?? []
        this.includeAdult = params.includeAdult ?? false
        this.includeVideo = params.includeVideo ?? false
        this.keywordsAll = params.keywordsAll ?? []
        this.keywordsAny = params.keywordsAny ?? []
        this.releaseDateGte = params.releaseDateGte ?? null
        this.releaseDateLte = params.releaseDateLte ?? null
        this.voteAverageGte = params.voteAverageGte ?? null
        this.voteAverageLte = params.voteAverageLte ?? null
        this.sortOrder = params.sortOrder ?? null
    }


    toParams() {
        const params: Record<string, string> = {}
        if (this.genresAll.length) params['genresAll'] = this.genresAll.join(",")
        if (this.genresAny.length) params['genresAny'] = this.genresAny.join(",")
        if (this.keywordsAll.length) params['keywordsAll'] = this.keywordsAll.join(",")
        if (this.keywordsAny.length) params['keywordsAny'] = this.keywordsAny.join(",")
        if (this.releaseDateGte) params['releaseDateGte'] = this.releaseDateGte.toISOString()
        if (this.releaseDateLte) params['releaseDateLte'] = this.releaseDateLte.toISOString()
        if (this.voteAverageGte) params['voteAverageGte'] = String(this.voteAverageGte)
        if (this.voteAverageLte) params['voteAverageLte'] = String(this.voteAverageLte)
        if (this.includeAdult) params['includeAdult'] = 'true'
        if (this.includeVideo) params['includeVideo'] = 'true'
        if (this.sortOrder) params['sortOrder'] = String(this.sortOrder)

        return params
    }

    with(partial: Partial<MovieDiscoverQuery>): MovieDiscoverQuery {
        return new MovieDiscoverQuery({ ...this, ...partial })
    }
}

export const MovieDiscoverQueryFactory: QueryObjectStatic<MovieDiscoverFilters> = {
    fromParams(params): ParseResult<MovieDiscoverQuery> {
        const violations: QueryViolation[] = []
        let filters: Partial<MovieDiscoverFilters> = {
            genresAll: (params["genresAll"] ?? "").split(",").map(g => validId(g, { key: "genresAll", violations })).filter(g => g !== null),
            genresAny: (params["genresAny"] ?? "").split(",").map(g => validId(g, { key: "genresAny", violations })).filter(g => g !== null),
            keywordsAll: (params["keywordsAll"] ?? "").split(",").map(g => validId(g, { key: "keywordsAll", violations })).filter(g => g !== null),
            keywordsAny: (params["keywordsAny"] ?? "").split(",").map(g => validId(g, { key: "keywordsAny", violations })).filter(g => g !== null),
            releaseDateGte: validDate(params["releaseDateGte"], { key: "releaseDateGte", violations }),
            releaseDateLte: validDate(params["releaseDateLte"], { key: "releaseDateLte", violations }),
            voteAverageGte: validVote(params["voteAverageGte"], { key: "voteAverageGte", violations }),
            voteAverageLte: validVote(params["voteAverageLte"], { key: "voteAverageLte", violations }),
            includeAdult: validBoolean(params["includeAdult"], { key: "includeAdult", violations }),
            includeVideo: validBoolean(params["includeVideo"], { key: "includeVideo", violations }),
            sortOrder: validOption<MovieSortOrder>(params["sortOrder"], MOVIE_SORT_OPTIONS, { key: "sortOrder", violations })
        }

        filters = resolveConflict(filters, "genresAll", "genresAny", { key: "genresAll", violations })
        filters = resolveConflict(filters, "keywordsAll", "keywordsAny", { key: "keywordsAll", violations })


        return { query: new MovieDiscoverQuery(filters), violations: violations }
    }
}


