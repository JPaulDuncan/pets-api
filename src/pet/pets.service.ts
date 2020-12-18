import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { Utils } from '../utils/utils';

import {
  Pet,
  Pets,
  PetsAPI,
} from './pets.interface';
import { pets } from "./db/pet.data";

@Injectable()
export class PetsService {
  pets = pets;

  getPets(
    search?: string,
    page?: string,
    pageSize?: string,
  ): PetsAPI {
    // let filteredPets = this.filter(search);
      let filteredPets = this.pets.filter(pet => pet.ownerId === search);
      filteredPets = this.paginate(
      filteredPets,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: filteredPets,
      hasNext:
        this.pets.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getPet(id: string): Pet {
    return this.pets.find(pet => pet.id === id);
  }

  delete(id: string): { message: string } {
    const index = this.pets.findIndex(
      pet => pet.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(`Pet ${id} não existe!`);
    }

    this.pets[index] = Utils.softDelete(this.pets[index]);
    return { message: 'Pet removido com sucesso' };
  }

  deleteAll(petsToDelete: Pets): void {
    petsToDelete.forEach(owner => this.delete(owner.id));
  }

  save(pet: Pet): Pet {
    const petSaved = { ...Utils.completePost(), ...pet };
    this.pets.push(petSaved);
    return petSaved;
  }

  update(id: string, updatedPet: Pet): void {
    const pet = this.getPet(id);
    Object.assign(pet, updatedPet);
  }

  private paginate(filteredPet, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredPet, page, pageSize);
    }

    return filteredPet;
  }

  private filter(search?: string) {
    return search
      ? Utils.filterByAll(search, this.pets)
      : this.pets;
  }

  petsDiffDate(
    date: string,
    page?: string,
    pageSize?: string,
  ): PetsAPI {
    let petsDiff = this.pets.filter(pet => {
      return new Date(pet.updatedDate) >= new Date(date);
    });

    petsDiff = this.paginate(
      petsDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: petsDiff,
      hasNext:
        this.pets.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.pets.length };
  }
}
