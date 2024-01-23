import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { JobLocation } from './jobLocation.entity';
import { Factory } from 'nestjs-seeder';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Factory((faker) => faker.location.state())
  administrative_area_level_1: string;

  @Column()
  @Factory((faker) => faker.location.county())
  administrative_area_level_2: string;

  @Column()
  @Factory((faker) => faker.location.country())
  country: string;

  @Column({ type: 'double precision' })
  @Factory((faker) => faker.location.latitude())
  latitude: number;

  @Column()
  @Factory((faker) => faker.location.city())
  locality: string;

  @Column({ type: 'double precision' })
  @Factory((faker) => faker.location.longitude())
  longitude: number;

  @Column()
  @Factory((faker) => faker.location.zipCode())
  postal_code: string;

  @Column()
  @Factory((faker) => faker.location.street())
  route: string;

  @Column()
  @Factory((faker) => faker.location.streetAddress())
  street_number: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @Column()
  @Factory((faker) => faker.string.alphanumeric(16))
  hash: string;

  @OneToMany(() => JobLocation, (jobLocations) => jobLocations.job)
  jobLocations: JobLocation[];
}