import { expect, test } from './my-test';
import { StatusCodes } from 'http-status-codes';
import { Training } from "../apis/academy-planner/models/training";
import { Guid } from "guid-typescript";
import { fakerNL as faker } from '@faker-js/faker';

test('Retrieve a training by name', async ({ academyPlannerClient}) => {
    const trainingResponse = await academyPlannerClient.getTrainingInformationByName('Acceptatietest');

    expect(trainingResponse.status()).toBe(StatusCodes.OK);

    const trainingBody = await trainingResponse.text();
    const training = JSON.parse(trainingBody);

    expect(training.Naam).toEqual('Acceptatietest');
});

test('Create a new training', async ({ academyPlannerClient }) => {
    const training = new Training();
    training.Naam = Guid.raw();
    training.Omschrijving = faker.hacker.phrase();
    training.Voorkennis = faker.music.songName();
    training.Opzet = faker.location.state();
    training.Leerdoel = faker.music.genre();
    training.MaxCapaciteit = faker.number.int({ min: 1, max: 12});
    training.TrainingCategorieId = faker.number.int({ min: 1, max: 9});
    training.DoelgroepId = faker.number.int({ min: 1, max: 5 });
    training.Eigenaar = 23;
    training.CreatedOn = new Date();

    const creationResult = await academyPlannerClient.createNewTraining(training);

    expect(creationResult.status(), await creationResult.text()).toBe(StatusCodes.OK);
    const creationResultBody = await creationResult.text();
    const creationResultJson = JSON.parse(creationResultBody);

    expect(creationResultJson.IsSuccess).toBeTruthy();
    expect(creationResultJson.ResultMessage).not.toBeUndefined();
});
