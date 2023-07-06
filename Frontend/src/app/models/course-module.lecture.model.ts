import { IUserGrade } from "./user-grade.model";

export interface ICourseModuleLecture {
    id?: string;
    title: string;
    date: Date;
    userGrades: IUserGrade[];
}