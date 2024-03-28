import { expect, test } from './my-test';
import { StatusCodes } from 'http-status-codes';

test('Retrieve show', async ({ tvMazeClient }) => {
    const responseShow = await tvMazeClient.getShowByTitle('breaking bad');

    expect(responseShow.status()).toBe(StatusCodes.OK);

    const show = await responseShow.text();
    const showJson = JSON.parse(show);
    const breakingBadId = showJson[0].show.id;

    const responseShowDetails = await tvMazeClient.getShowByShowId(breakingBadId);

    expect(responseShowDetails.status()).toBe(StatusCodes.OK);

    const showDetail = await responseShowDetails.text();
    const showDetailJson = JSON.parse(showDetail);

    expect(showDetailJson.url).toContain(`${breakingBadId}`);
});