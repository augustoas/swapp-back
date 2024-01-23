import { PartialType } from '@nestjs/mapped-types';
import { CreateTycDto } from './create-tyc.dto';

export class UpdateTycDto extends PartialType(CreateTycDto) {}
