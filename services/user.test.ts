import {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
  } from '@/services/user';
  import { User } from '@/types/User';
  import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
  } from 'firebase/firestore';
  
  // Mock Firestore functions
  jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(() => ({ id: 'test-id' })),
    setDoc: jest.fn(),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
  }));
  
  describe('User Service', () => {
    it('addUser should create a new user and return it with an id', async () => {
      const testUser: Omit<User, 'id'> = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
      };
  
      const expectedUser: User = {
        ...testUser,
        id: 'test-id',
      };
  
      const result = await addUser(testUser);
  
      expect(result).toEqual(expectedUser);
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), expectedUser);
    });
  
    it('getUser should return a user by id', async () => {
      const expectedUser: User = {
        id: 'test-id',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
      };
  
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => expectedUser,
      });
  
      const result = await getUser('test-id');
  
      expect(result).toEqual(expectedUser);
    });
  
    it('getUsers should return an array of users', async () => {
      const expectedUsers: User[] = [
        { id: 'test-id-1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
        { id: 'test-id-2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'admin' },
      ];
  
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: expectedUsers.map(user => ({
          data: () => user,
        })),
      });
  
      const result = await getUsers();
  
      expect(result).toEqual(expectedUsers);
    });
  
    it('updateUser should update a user by id', async () => {
      const updates: Partial<User> = {
        name: 'Johnathan Doe',
      };
  
      await updateUser('test-id', updates);
  
      expect(updateDoc).toHaveBeenCalledWith(expect.anything(), updates);
    });
  
    it('deleteUser should remove a user by id', async () => {
      await deleteUser('test-id');
  
      expect(deleteDoc).toHaveBeenCalledWith(expect.anything());
    });
  });
  