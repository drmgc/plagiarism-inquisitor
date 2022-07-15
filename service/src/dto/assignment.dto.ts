
export class AssignmentDto {
  readonly id!: string

  constructor(fields: AssignmentDto) {
    Object.assign(this, fields)
  }
}
