import type { JsonApiModelInterface } from './../../json-api/interfaces/model.interface.js';
import { BeforeDelete, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import * as Fs from 'fs/promises';
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

    @Property()
    declare emailAddress2?: string;

    @Property()
    declare phoneNumber: string;

    @Property()
    declare phoneNumber2?: string;

    @Property()
    declare cost?: string;

    @BeforeDelete()
    public removeFromDisk (): Promise<void> {
      return Fs.unlink(this.id);
    }

  // @OneToOne({
  //   entity: () => ResourcePictureModel,
  //   mappedBy: 'user',
  //   nullable: false,
  // })
  //   resourcePicture?: ResourcePictureModel;

  //   @ManytoOne('EnterpriseModel')
  //     enterprises = new Collection<EnterpriseModel>(this);
}
