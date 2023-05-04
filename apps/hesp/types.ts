import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const modelRelations: any = {
  User: ["Trainee"],
  WOLcheckpoint: ["User"],
  PDCcheckpoint: ["User", "SessionNotes"],
  SessionNotes: ["PDCcheckpoint"],
  Trainee: [
    "User",
    "TraineeMetaData",
    "ProvidedSoloutions",
    "PDCcheckpoint",
    "WOLcheckpoint",
  ],
  TraineeMetaData: ["Trainee"],
  ProvidedSoloutions: ["Trainee", "Soloutions"],
  Soloutions: ["ProvidedSoloutions"],
  InviteLink: [],
};
export interface ModelMapInterface {
  Trainee: typeof prisma.trainee;
  User: typeof prisma.user;
  // Comment: typeof prisma.comment;
  WOL: typeof prisma.wOLcheckpoint;
  PDC: typeof prisma.pDCcheckpoint;
  Solutions: typeof prisma.soloutions;
  ProvidedSoloutions: typeof prisma.providedSoloutions;
  InviteLink: typeof prisma.inviteLink;
  SessionNotes: typeof prisma.sessionNotes;
  TraineeMetaData: typeof prisma.traineeMetaData;
}

export const modelMap: ModelMapInterface = {
  Trainee: prisma.trainee,
  User: prisma.user,
  // Comment: prisma.comment,
  WOL: prisma.wOLcheckpoint,
  PDC: prisma.pDCcheckpoint,
  Solutions: prisma.soloutions,
  ProvidedSoloutions: prisma.providedSoloutions,
  InviteLink: prisma.inviteLink,
  SessionNotes: prisma.sessionNotes,
  TraineeMetaData: prisma.traineeMetaData,
};

export interface IUserRole {
  ADMIN: "ADMIN";
  STAFF: "STAFF";
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
  email: string;
  password: string;
  role: keyof IUserRole;
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

export interface IWOLcheckpoint {
  id: number;
  health: number;
  healthFeel: string;
  healthImprove: string;
  work: number;
  workFeel: string;
  workImprove: string;
  finances: number;
  financesthFeel: string;
  financesthImprove: string;
  environment: number;
  environmentFeel: string;
  environmentImprove: string;
  love: number;
  loveFeel: string;
  loveImprove: string;
  familyFriends: number;
  familyFriendsFeel: string;
  familyFriendsImprove: string;
  personalDevelopment: number;
  personalDevelopmentFeel: string;
  personalDevelopmentImprove: string;
  fun: number;
  funFeel: string;
  funImprove: string;
  userId?: number;
  User: IUser;
}

export interface IPDCcheckpoint {
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
