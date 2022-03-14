import type { JsonApiModelInterface } from './../../json-api/interfaces/model.interface';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({
  tableName: 'resources',
  // customRepository: () => ResourceRepository,
})

export class ResourceModel implements JsonApiModelInterface {
    @PrimaryKey()
      id: string = v4();

    @Property()
    declare firstName: string;

    @Property()
    declare lastName: string;

    @Property()
    declare email1: string;

    @Property()
    declare email2?: string;

    @Property()
    declare phone1: string;

    @Property()
    declare phone2?: string;

    @Property()
    declare cost?: number;

  // @OneToOne({
  //   entity: () => ResourcePictureModel,
  //   mappedBy: 'user',
  //   nullable: false,
  // })
  //   resourcePicture?: ResourcePictureModel;

  //   @OneToMany('DocumentModel')
  //     documents = new Collection<EnterpriseModel>(this);
}
