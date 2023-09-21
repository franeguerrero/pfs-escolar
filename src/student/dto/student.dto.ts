export class StudentDTO {
    readonly idStudent?: number;
    readonly fullName: string;
    readonly birth: string;
    readonly dni: number
    readonly address: string;
    readonly idCity: number;
    readonly idsTeacher: number[];
}
