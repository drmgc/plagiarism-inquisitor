import {
  Length,
} from 'class-validator'

export class CreateAssignmentDto {
  @Length(3, 36)
  readonly id!: string
  readonly contents!: string

  constructor(fields: CreateAssignmentDto) {
    Object.assign(this, fields)
  }
}
