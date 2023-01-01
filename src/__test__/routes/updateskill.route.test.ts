import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skill';

describe('Update Skill Route', () => {
  const userId = '1390266c-ddc8-445d-a1d0-66c5e9e1f759';
  const skillId = 'b4d995c5-15e8-4ee4-bf4e-62186e804c34';
  it('can only be accessed if the user is signed in', async () => {
    await request(app).put(`/skill?id=${skillId}`).send({}).expect(401);
  });

  it('returns a status 400 if the skill id is not provided', async () => {
    const response = await request(app)
      .put(`/skill?id=`)
      .set('Cookie', global.signin(userId))
      .send({});

    expect(response.status).not.toEqual(401);
    expect(response.status).toEqual(400);
  });

  it('returns an error if an domainName is not provided', async () => {
    await request(app)
      .put(`/skill?id=${skillId}`)
      .set('Cookie', global.signin(userId))
      .send({
        domainName: '',
        skillName: ['Javascript'],
      })
      .expect(400);

    await request(app)
      .put(`/skill?id=${skillId}`)
      .set('Cookie', global.signin(userId))
      .send({
        skillName: ['Javascript'],
      })
      .expect(400);
  });

  it('returns an error if skillName is not provided', async () => {
    await request(app)
      .put(`/skill?id=${skillId}`)
      .set('Cookie', global.signin(userId))
      .send({
        domainName: 'tech',
        skillName: '',
      })
      .expect(400);

    await request(app)
      .put(`/skill?id=${skillId}`)
      .set('Cookie', global.signin(userId))
      .send({
        domainName: 'tech',
      })
      .expect(400);
  });

  it('return 400 if invalid skill id is provided', async () => {
    const payload = {
      domainName: 'Tech',
      skillName: ['C++', 'python'],
    };

    const isSkillExist = jest
      .spyOn(handlers, 'getSkillByUserIdAndSkillId')
      //@ts-ignore
      .mockReturnValueOnce();

    const response = await request(app)
      .put(`/skill?id=sadadasdas`)
      .set('Cookie', global.signin(userId))
      .send(payload)
      .expect(400);

    expect(isSkillExist).toBeCalledWith('sadadasdas', userId);
  });

  it('Update a skill with valid inputs', async () => {
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
      .spyOn(handlers, 'updateSkillById')
      //@ts-ignore
      .mockReturnValueOnce();

    const response = await request(app)
      .put(`/skill?id=${skillId}`)
      .set('Cookie', global.signin(userId))
      .send(payload)
      .expect(200);

    expect(skill).toBeCalledWith(payload.id, payload.userId, payload.domainName, payload.skillName);
    expect(response.body.message).toEqual('User Skill updated');
  });
});
