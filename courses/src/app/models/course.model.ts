export class Course {
   id?: number
   name!: string
   categoryId?: number
   lessons?: number
   start!: Date
   cilibus?: string[]
   type?: number
   lecturerId?: number
   //    static instructions: string[] = [];
   img!: string
}

export enum LearningType {
   Frontal,
   Zoom
}
// export enum EHowToLearn{
//     זום,פרונטלי
// }
// export class Course{
// id!: number
// name!: string
// categoryId!: number
// count!: number
// syllabus: string[]=[]
// learningWay!: EHowToLearn
// startDate!: Date
// static instructions: string[] = [];
// lecturerId!: number
// img!: string
//  }