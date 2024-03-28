import { test as base, request } from '@playwright/test';
import { OpenWeatherClient } from '../apis/open-weather/open-weather-client';
import { TvMazeClient } from '../apis/tv-maze/tv-maze-client';
import {AcademyPlannerClient} from "../apis/academy-planner/academy-planner-client";

type MyFixtures = {
    openWeatherClient: OpenWeatherClient;
    tvMazeClient: TvMazeClient;
    academyPlannerClient: AcademyPlannerClient;
};

export const test = base.extend<MyFixtures>({
    openWeatherClient: async ({}, use) => {
        const context = await request.newContext({
            baseURL: process.env.OPEN_WEATHER_BASE_URL,
          });

        await use(new OpenWeatherClient(context));
        context.dispose();
    },
    tvMazeClient: async ({}, use) => {
        const context = await request.newContext({
            baseURL: process.env.TV_MAZE_API_BASE_URL,
        });

        await use(new TvMazeClient(context));
        context.dispose();
    },
    academyPlannerClient: async ({}, use) => {
        const context = await request.newContext({
            baseURL: process.env.VALORI_OUTSYSTEMS_BASE_URL,
            extraHTTPHeaders: {
                'Token': process.env.VALORI_OUTSYSTEMS_TOKEN!
            }
        });

        await use(new AcademyPlannerClient(context));
        context.dispose();
    }
});
export { expect } from '@playwright/test';