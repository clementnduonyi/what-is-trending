class InMemoryStorage {
  private storage: Map<string, string> = new Map();

  async get(key: string): Promise<string | null> {
      return this.storage.get(key) || null;
  }

  async put(key: string, value: string): Promise<void> {
      this.storage.set(key, value);
  }

  async delete(key: string): Promise<void> {
      this.storage.delete(key);
  }
}

const storage = new InMemoryStorage();
export default storage;
