import Skill from '../interface/skill';
import prisma from '../utils/db';

export const addSkill = async (
  userId: string,
  domainName: string,
  skillName: string[],
): Promise<Skill> => {
  const skill = await prisma.skill.create({
    data: {
      userId,
      domainName,
      skillName,
    },
  });
  return skill;
};

export const getSkill = async (
  userId: string,
  domainName: string,
  skillName: Array<string>,
): Promise<Skill> => {
  const skill = await prisma.skill.findFirst({
    where: {
      userId: userId,
      domainName: domainName,
      skillName: {
        equals: skillName,
      },
    },
  });
  return skill;
};
