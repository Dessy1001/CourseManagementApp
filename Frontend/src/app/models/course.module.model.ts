import { ICourseModuleLecture } from "./course-module.lecture.model";

export interface ICourseModule {
    id?: string;
    title: string;
    description: string;
    lectures: ICourseModuleLecture[];
    startDate: Date;
    endDate: Date;
}