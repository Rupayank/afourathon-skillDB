import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
async function getUserSkill(req: Request, res: Response) {
  try {
    const userId = req.query.id as string;
    const skill = await prisma.skill.findMany({ where: { userId } });
    res.status(200).send({ message: 'All User Skills', response: skill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
async function addUserSkill(req, res) {
  try {
    const { userId, domainName, skillName } = req.body;
    const skill = await prisma.skill.create({
      data: {
        userId,
        domainName,
        skillName,
      },
    });
    res.status(201).send({ message: 'New User skill added', response: skill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
async function updateUserSkill(req: Request, res: Response) {
  try {
    const id = req.query.id as string;
    const { domainName, skillName } = req.body;
    const updateUserSkill = await prisma.skill.update({
      where: {
        id,
      },
      data: {
        domainName,
        skillName,
      },
    });
    res.status(200).send({ message: 'User Skill updated', response: updateUserSkill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
async function deleteUserSkill(req: Request, res: Response) {
  try {
    const id = req.query.id as string;
    const deleteUserSkill = await prisma.skill.delete({ where: { id } });
    res.status(200).send({ message: 'Deleted User skill', response: deleteUserSkill });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
export { getUserSkill, addUserSkill, updateUserSkill, deleteUserSkill };
