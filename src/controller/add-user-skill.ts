import { Request, Response } from 'express';
import { addSkill } from '../handlers/skill';

export default async function addUserSkill(req: Request, res: Response) {
  try {
    const { domainName, skillName } = req.body;
    const skill = await addSkill(req.currentUser!.id, domainName, skillName);
    res.status(201).send({ message: 'New User skill added', response: skill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
