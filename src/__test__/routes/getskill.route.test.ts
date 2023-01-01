import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skill';

describe('Get Skill Route', () => {
  const userId = '1390266c-ddc8-445d-a1d0-66c5e9e1f759';

  it('can only be accessed if the user is signed in', async () => {
    await request(app).get('/skill').expect(401);
  });

  it('can fetch a list of domain and skill', async () => {
    const payload = [
      {
        id: userId,
        userId: 'b61b2e0e-a3a1-45d5-b2ec-5fc2a10874e8',
        domainName: 'Tech',
        skillName: ['C++', 'java'],
      },
      {
        id: userId,
        userId: 'b61b2e0e-a3a1-45d5-b2ec-5fc2a10874e8',
        domainName: 'Leadership',
        skillName: ['Reliability', 'Scrum master'],
      },
    ];

    const skills = jest
      .spyOn(handlers, 'getSkillByUserId')
      //@ts-ignore
      .mockReturnValueOnce(payload);

    const response = await request(app).get('/skill').set('Cookie', global.signin(userId));

    expect(response.status).not.toEqual(401);
    expect(skills).toBeCalledWith(userId)
    expect(response.body.response).toEqual(payload);
  });
  
});
