import { TmdbDetailedSeasonResponse } from "../interfaces/tmdb/tmdb-detailed-season-response";
import { TmdbDetailedSeason } from "./tmdb-detailed-season";

describe('TmdbDetailedSeason', () => {
  it('should create an instance', () => {
    expect(new TmdbDetailedSeason({ episodes: [] } as unknown as TmdbDetailedSeasonResponse)).toBeTruthy();
  });
});
