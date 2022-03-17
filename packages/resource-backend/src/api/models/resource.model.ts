import type { JsonApiModelInterface } from './../../json-api/interfaces/model.interface';
import { BeforeDelete, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import * as Fs from 'fs/promises';

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
