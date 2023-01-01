import { BadRequestError } from '@hackathonskilldb/common-middlewares';
import { Request, Response } from 'express';
import { addSkill, getSkillByUserId, updateSkillById } from '../handlers/skill';

async function addUserSkill(req: Request, res: Response) {
  try {
    const { domainName, skillName } = req.body;
    const skill = await addSkill(req.currentUser!.id, domainName, skillName);
    res.status(201).send({ message: 'New User skill added', response: skill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function getUserSkill(req: Request, res: Response) {
  try {
    const skill = await getSkillByUserId(req.currentUser.id);
    res.status(200).send({ message: 'All User Skills', response: skill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function updateUserSkill(req: Request, res: Response) {
  const id = req.query.id as string;
    if(!id){
      throw new BadRequestError('Id should be prsent')
      
    }
  try {
    const { domainName, skillName } = req.body;
    await updateSkillById(id,req.currentUser.id,domainName,skillName)
    res.status(200).send({ message: 'User Skill updated'});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export { getUserSkill, addUserSkill , updateUserSkill};
