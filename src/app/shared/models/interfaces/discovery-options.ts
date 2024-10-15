export interface DiscoveryOptions {
    filter: {
        certification: {
            name: string
            gte: string
            lte: string
            country: string
            dependsOn: ["region"]
            default: {
                name: string
                gte: string
                lte: string
                country: string
            }
        }
        adult: {
            include: boolean,
            default: boolean
        }
        video: {
            include: boolean,
            default: boolean
        }
        language: {
            name: string
            default: string
        }
        primaryRelease: {
            year: number
            date: {
                gte: number
                lte: number
            }
            default: {
                year: number
                date: {
                    gte: number
                    lte: number
                }
            }
        }
        region: string
        release: {
            date: {
                gte: number
                lte: number
            }
            default: {
                date: {
                    gte: number
                    lte: number
                }
            }
        },
        vote_average: {
            gte: {
                number: number
                min: 0
                max: 10000
            }
            lte: {
                number: number
                min: 0
                max: 10000
            }
        }
        voteCount: {
            gte: {
                number: number
                min: 0
                max: 10000
            }
            lte: {
                numer: number
                min: 0
                max: 10000
            }
        }
    },
    sort: {
        originalTitle: {
            asc: "asc"
            dsc: "dsc"
        }
        popularity: {
            asc: "asc"
            dsc: "dsc"
        }
        revenue: {
            asc: "asc"
            dsc: "dsc"
        }
        primaryReleaseDate: {
            asc: "asc"
            dsc: "dsc"
        }
        title: {
            asc: "asc"
            dsc: "dsc"
        }
        voteAverage: {
            asc: "asc"
            dsc: "dsc"
        }
        voteCount: {
            asc: "asc"
            dsc: "dsc"
        }
    },
    pagination: {
        page: {
            number: number
            min: 0
            max: 500
        }
    }
}
