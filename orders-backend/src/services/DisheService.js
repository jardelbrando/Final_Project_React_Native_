import DisheRepository from '../repositories/DisheReposiroty.js';

class DisheService {
  async storeDishe(name, price, description, avatar_url, category) {
    await DisheRepository.saveDishe({ name, price, description, avatar_url, category});
  }

  async getAll() {
    const dishes = await DisheRepository.getAll();

    return dishes;
  }

  async getByCategory(category){
    const dishes = await DisheRepository.getByCategory(category);

    return dishes;
  }
}

export default new DisheService();