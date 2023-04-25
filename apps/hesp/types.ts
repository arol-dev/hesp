import {
  PrismaClient,
  Trainee,
  User,
  Comment,
  WOLcheckpoint,
  PDCcheckpoint,
  Soloutions,
} from "@prisma/client";

const prisma = new PrismaClient();

export const modelRelations: any = {
  User: ["Comment", "WOLcheckpoint", "PDCcheckpoint", "Trainee"],
  Comment: ["User", "WOLcheckpoint"],
  WOLcheckpoint: ["User", "Comment"],
  PDCcheckpoint: ["user"],
  Trainee: ["User", "TraineeMetaData", "ProvidedSoloutions"],
  TraineeMetaData: ["trainee"],
  ProvidedSoloutions: ["Trainee", "Soloutions"],
  Soloutions: ["ProvidedSoloutions"],
};

export interface ModelMapInterface {
  Trainee: typeof prisma.trainee;
  User: typeof prisma.user;
  Comment: typeof prisma.comment;
  WOL: typeof prisma.wOLcheckpoint;
  PDC: typeof prisma.pDCcheckpoint;
  Solutions: typeof prisma.soloutions;
  ProvidedSoloutions: typeof prisma.providedSoloutions;
}

export const modelMap: ModelMapInterface = {
  Trainee: prisma.trainee,
  User: prisma.user,
  Comment: prisma.comment,
  WOL: prisma.wOLcheckpoint,
  PDC: prisma.pDCcheckpoint,
  Solutions: prisma.soloutions,
  ProvidedSoloutions: prisma.providedSoloutions,
};

export interface IUserRole {
  ADMIN: "ADMIN";
  STAFF: "STAFF";
  TRAINEE: "TRAINEE";
}

export interface IWorkingSituation {
  WORKING: "WORKING";
  NOT_WORKING: "NOT_WORKING";
}

export interface IHousingSituation {
  HOMELESS: "HOMELESS";
  HOUSE: "HOUSE";
  APARTMENT: "APARTMENT";
  OTHER: "OTHER";
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  role: keyof IUserRole;
  Comment: IComment[];
  WOLcheckpoint: IWOLcheckpoint[];
  PDCcheckpoint: IPDCcheckpoint[];
  Trainee: ITrainee[];
}

export interface IComment {
  id: number;
  message: string;
  relatedUser: number;
  User?: IUser;
  WOLcheckpoint?: IWOLcheckpoint;
}

interface IWOLcheckpoint {
  id: number;
  health: number;
  work: number;
  finances: number;
  environment: number;
  love: number;
  familyFriends: number;
  personalDevelopment: number;
  fun: number;
  relatedUser: number;
  User: IUser;
  commentID?: number;
  Comment?: IComment;
}

interface IPDCcheckpoint {
  id: number;
  trust: number;
  willFollow: number;
  retention: number;
  commitment: number;
  cv: number;
  readyForInterviews: number;
  advancement: number;
  userId?: number;
  user?: IUser;
}

export interface ITrainee {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  registerNumber?: string;
  role: keyof IUserRole;
  TraineeMetaData: ITraineeMetaData[];
  userId?: number;
  User?: IUser;
  ProvidedSoloutions: IProvidedSoloutions[];
}

interface ITraineeMetaData {
  traineeId: number;
  trainee: ITrainee;
  workingSituation: keyof IWorkingSituation;
  housingSituation: keyof IHousingSituation;
  needWork: boolean;
  needTraining: boolean;
  needHousing: boolean;
  needCommunication: boolean;
  needLegal: boolean;
  needTransportation: boolean;
  needBasicAssistance: boolean;
  needSOS: boolean;
  helpCandidate: boolean;
  filledForms: boolean;
  helpAccepted: boolean;
}

interface IProvidedSoloutions {
  id: number;
  code: string;
  Trainee?: ITrainee;
  Soloutions: ISoloutions[];
}

interface ISoloutions {
  id: number;
  code: string;
  providedID?: number;
  ProvidedSoloutions?: IProvidedSoloutions;
}
