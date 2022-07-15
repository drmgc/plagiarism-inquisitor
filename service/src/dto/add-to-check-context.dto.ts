import {
  Length,
} from 'class-validator'

export class AddToCheckContextDto {
  @Length(3, 36)
  readonly assignmentId!: string

  constructor(fields: AddToCheckContextDto) {
    Object.assign(this, fields)
  }
}
