import { BadRequestError } from '@hackathonskilldb/common-middlewares';
import { Request, Response } from 'express';
import {
  addSkill,
  deleteUserSkillById,
  getSkillByUserId,
  getSkillByUserIdAndSkillId,
  updateSkillById,
} from '../handlers/skill';
import { Sessions, Subject } from '../interface/asb-events';
import { sendMessage } from '../utils/asb-events';

async function addUserSkill(req: Request, res: Response) {
  try {
    const { domainName, skillName } = req.body;
    const skill = await addSkill(req.currentUser!.id, domainName, skillName);

    const messageContent = {
      id: skill.id,
      userName: req.currentUser.name,
      userEmain: req.currentUser.email,
      userId: skill.userId,
      skill: skill.skillName,
      domainName: skill.domainName,
    };
    await sendMessage(Subject.skillCreate, Sessions.skillCreate, messageContent);
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
  if (!id) {
    throw new BadRequestError('Id should be prsent');
  }

  const isSkillExist = await getSkillByUserIdAndSkillId(id, req.currentUser.id);
  if (!isSkillExist) {
    throw new BadRequestError('Invalid skill Id');
  }
  try {
    const { domainName, skillName } = req.body;
    await updateSkillById(id, req.currentUser.id, domainName, skillName);
    const messageContent = {
      id: id,
      userName: req.currentUser.name,
      userEmain: req.currentUser.email,
      userId: isSkillExist.userId,
      skill: skillName,
      domainName: domainName,
    };
    await sendMessage(Subject.skillUpdate, Sessions.skillUpdate, messageContent);
    res.status(200).send({ message: 'User Skill updated' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function deleteUserSkill(req: Request, res: Response) {
  const id = req.query.id as string;

  if (!id) {
    throw new BadRequestError('Id should be prsent');
  }
  const isSkillExist = await getSkillByUserIdAndSkillId(id, req.currentUser.id);
  if (!isSkillExist) {
    throw new BadRequestError('Invalid Id');
  }

  try {
    const deleteUserSkill = await deleteUserSkillById(isSkillExist.id);

    const messageContent = {
      id: deleteUserSkill.id,
      userName: req.currentUser.name,
      userEmain: req.currentUser.email,
      userId: deleteUserSkill.userId,
      skill: deleteUserSkill.skillName,
      domainName: deleteUserSkill.domainName,
    };
    await sendMessage(Subject.skillDelete, Sessions.skillDelete, messageContent);

    res.status(200).send({ message: 'Deleted User skill', response: deleteUserSkill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export { getUserSkill, addUserSkill, updateUserSkill, deleteUserSkill };
