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

export const getSkillByUserId = async (userId: string): Promise<Skill[]> => {
  const skills = await prisma.skill.findMany({ where: { userId } });
  return skills;
};

export const getSkillByUserIdAndSkillId = async (id: string, userId: string): Promise<Skill> => {
  console.log(id);
  const skills = await prisma.skill.findFirst({
    where: {
      id: id,
      AND: {
        userId: userId,
      },
    },
  });
  return skills;
};

export const updateSkillById = async (
  id: string,
  userId: string,
  domainName: string,
  skillName: Array<string>,
) => {
  const skill = await prisma.skill.updateMany({
    where: {
      id,
      AND: {
        userId: userId,
      },
    },
    data: {
      domainName,
      skillName,
    },
  });

  return skill;
};

export const deleteUserSkillById = async (id: string) => {
  return prisma.skill.delete({ where: { id } });
};
