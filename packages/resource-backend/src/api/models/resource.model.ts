import type { JsonApiModelInterface } from './../../json-api/interfaces/model.interface.js';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ResourceRepository } from '../repositories/resource.repository.js';

@Entity({
  tableName: 'resources',
  customRepository: () => ResourceRepository,
})

export class ResourceModel implements JsonApiModelInterface {
    @PrimaryKey()
      id: string = v4();

    @Property()
    declare firstName: string;

    @Property()
    declare lastName: string;

    @Property()
    declare emailAddress: string;

    @Property({ nullable: true })
    declare emailAddress2?: string;

    @Property()
    declare phoneNumber: string;

    @Property({ nullable: true })
    declare phoneNumber2?: string;

    @Property({ nullable: true })
    declare cost?: string;

    @Property()
    declare image: string;

    @Property()
    declare enterprise: string;

  // @OneToOne({
  //   entity: () => ResourcePictureModel,
  //   mappedBy: 'user',
  //   nullable: false,
  // })
  //   resourcePicture?: ResourcePictureModel;

  // @ManyToOne('EnterpriseModel')
  //   enterprises = new Collection<EnterpriseModel>(this);
}
