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
  [x: string]: any;
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

export interface AuthContext {
  req: {
    headers: {
      host: string;
      cookie?: string;
    };
  };
}

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
  email: string;
  phone: string;
  reference: string;
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  role: keyof IUserRole;
  WOLcheckpoint: IWOLcheckpoint[];
  PDCcheckpoint: IPDCcheckpoint[];
  Trainee: ITrainee[];
  picture: string;
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
  userId?: string;
  User: IUser;
  traineeId: string;
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
  SessionNotes?: SessiontNotes;
  createdAt: Date;
  traineeId: string;
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
  PDCcheckpoint: IPDCcheckpoint[];
  WOLcheckpoint: IWOLcheckpoint[];
}

export interface IinviteLink {
  id: number;
  code: string;
  used: boolean;
  expiresAt: any;
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

export type WOLTopic = {
  name: string;
  body: string;
  value: number;
  feel: string;
  improve: string;
};

export type WOLTopics = WOLTopic[];

export type WOLCheckpointProps = {
  onDataChange: (list: WOLTopics) => void;
  WOLSaved: boolean;
  lastWOLCheckpoint: IWOLcheckpoint | null;
};

export type SessionNote = {
  id: string;
  edit: boolean;
  saved: boolean;
  topic: string;
  objective: string;
  actions: string;
  notes: string;
  results: string;
  evaluation: string;
};

export type SessiontNotes = SessionNote[];

export type SessionNotesProps = {
  onSessionNotesChange: (notes: SessiontNotes) => void;
  PDSaved: boolean;
  lastPDCheckpoint: IPDCcheckpoint;
};

export type NewCheckpointProps = {
  person: ITrainee;
  id: Number;
  lastPDCheckpoint: IPDCcheckpoint;
  lastWOLCheckpoint: IWOLcheckpoint;
};

export type Rating = {
  name: string;
  body: string;
  description: string;
  value: number;
};

export type Ratings = Rating[];

export type PDFormProps = {
  onRatingChange: (ratings: Ratings) => void;
  PDSaved: boolean;
  lastPDCheckpoint: IPDCcheckpoint;
};
