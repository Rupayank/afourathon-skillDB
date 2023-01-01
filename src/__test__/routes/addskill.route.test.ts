import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skill'

describe('Add Skill Route', () => {
  const userId = "1390266c-ddc8-445d-a1d0-66c5e9e1f759"
  it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/skill').send({}).expect(401);
  });

  it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
      .post('/skill')
      .set('Cookie', global.signin(userId))
      .send({});
  
    expect(response.status).not.toEqual(401);
  });

  it('returns an error if an invalid domainName is provided', async () => {
    await request(app)
      .post('/skill')
      .set('Cookie', global.signin(userId))
      .send({
        domainName: '',
        skillName: ['Javascript'],
      })
      .expect(400);
  
    await request(app)
      .post('/skill')
      .set('Cookie', global.signin(userId))
      .send({
        skillName: ['Javascript'],
      })
      .expect(400);
  });
  
  it('returns an error if an invalid skillName is provided', async () => {
    await request(app)
      .post('/skill')
      .set('Cookie', global.signin(userId))
      .send({
        domainName: 'tech',
        skillName: '',
      })
      .expect(400);
  
    await request(app)
      .post('/skill')
      .set('Cookie', global.signin(userId))
      .send({
        domainName: 'tech',
      })
      .expect(400);
  });
  
  it('creates a skill with valid inputs', async () => {
    const payload = {
        id: "63810918-a966-4f31-bdd6-f873c7a8ad86",
        userId: userId,
        domainName: "Tech",
        skillName: [
            "C++",
            "python"
        ]
    }
    const skill= jest
    .spyOn(handlers,'addSkill')
      //@ts-ignore
    .mockReturnValueOnce(payload)
  
  
    const response = await request(app)
      .post('/skill')
      .set('Cookie', global.signin(userId))
      .send({
        domainName: "Tech",
        skillName: [
            "C++",
            "python"
        ]
      })
      .expect(201);
    
    expect(skill).toBeCalledWith(payload.userId,payload.domainName,payload.skillName)  
    expect(response.body.response).toEqual(payload);
  });

});
