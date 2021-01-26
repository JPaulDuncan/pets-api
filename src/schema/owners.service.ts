import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { Utils } from '../utils/utils';
import { schemas } from './db/schema.data';

import { Owner, Owners, OwnersAPI } from './owners.interface';
import { owners } from './db/owner.data';
import { PetsAPI } from '../pet/pets.interface';
import { PetsService } from '../pet/pets.service';

@Injectable()
export class OwnersService {
  owners = schemas;

  constructor(private petService: PetsService) {}

  getOwners(search?: string, page?: string, pageSize?: string): OwnersAPI {
    let filteredOwners = this.filter(search);
    filteredOwners = this.paginate(
      filteredOwners,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: filteredOwners,
      hasNext: this.owners.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getOwner(id: string): Owner {
    return this.owners.find(conference => conference.id === id);
  }

  delete(id: string): { message: string } {
    const index = this.owners.findIndex(conference => conference.id === id);

    if (index === -1) {
      throw new NotFoundException(`Conferência ${id} não existe!`);
    }

    this.owners[index] = Utils.softDelete(this.owners[index]);
    return { message: 'Conferência removida com sucesso' };
  }

  deleteAll(ownersToDelete: Owners): void {
    ownersToDelete.forEach(owner => this.delete(owner.id));
  }

  save(owner: Owner): Owner {
    const ownerSaved = { ...Utils.completePost(), ...owner };
    this.owners.push(ownerSaved);
    return ownerSaved;
  }

  update(id: string, updatedOwner: Owner): void {
    const owner = this.getOwner(id);
    Object.assign(owner, updatedOwner);
  }

  private paginate(filteredOwner, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredOwner, page, pageSize);
    }

    return filteredOwner;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.owners) : this.owners;
  }

  ownersDiffDate(date: string, page?: string, pageSize?: string): OwnersAPI {
    let ownersDiff = this.owners.filter(owner => {
      return new Date(owner.updatedDate) >= new Date(date);
    });

    ownersDiff = this.paginate(
      ownersDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: ownersDiff,
      hasNext: this.owners.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.owners.length };
  }
}
