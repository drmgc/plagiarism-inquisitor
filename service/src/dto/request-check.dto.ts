import {
  Length,
} from 'class-validator'

export class RequestCheckDto {
  @Length(3, 36)
  readonly assignmentId!: string
  @Length(3, 36)
  readonly contextId!: string

  constructor(fields: RequestCheckDto) {
    Object.assign(this, fields)
  }
}
