import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skill';

describe('Delete Skill Route', () => {
  const userId = '1390266c-ddc8-445d-a1d0-66c5e9e1f759';
  const skillId = 'b4d995c5-15e8-4ee4-bf4e-62186e804c34';
  it('can only be accessed if the user is signed in', async () => {
    await request(app).delete(`/skill?id=${skillId}`).send({}).expect(401);
  });

  it('returns a status 400 if the skill id is not provided', async () => {
    const response = await request(app)
      .delete(`/skill?id=`)
      .set('Cookie', global.signin(userId))
      .send({});

    expect(response.status).not.toEqual(401);
    expect(response.status).toEqual(400);
  });

  it('return a status 400 if invalid skill id provided', async () => {
    const isSkillExist = jest
      .spyOn(handlers, 'getSkillByUserIdAndSkillId')
      //@ts-ignore
      .mockReturnValueOnce();

    const response = await request(app)
      .delete(`/skill?id=sasasas`)
      .set('Cookie', global.signin(userId))
      .expect(400);

    expect(isSkillExist).toBeCalledWith("sasasas", userId);
  });

  it('Delete a skill with valid id', async () => {
    const payload = {
      id: skillId,
      userId: userId,
      domainName: 'Tech',
      skillName: ['C++', 'python'],
    };

    const isSkillExist = jest
      .spyOn(handlers, 'getSkillByUserIdAndSkillId')
      //@ts-ignore
      .mockReturnValueOnce(payload);

    const skill = jest
      .spyOn(handlers, 'deleteUserSkillById')
      //@ts-ignore
      .mockReturnValueOnce(payload);

    const response = await request(app)
      .delete(`/skill?id=${skillId}`)
      .set('Cookie', global.signin(userId))
      .expect(200);

    expect(isSkillExist).toBeCalledWith(skillId, userId);
    expect(skill).toBeCalledWith(skillId);
    expect(response.body.response).toEqual(payload);
  });
});
