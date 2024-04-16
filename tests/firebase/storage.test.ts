import { getStorage, ref } from "firebase/storage";
import app from "@/firebase/index";

jest.mock("firebase/storage");

describe("Storage Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Clear mocks in between tests
  });

  it("should get a storage instance from the Firebase app", () => {
    require('@/firebase/storage.ts'); // Lazy load the module
    expect(getStorage).toHaveBeenCalledWith(app);
  });

  it("should create a reference with the correct URL", () => {
    const { storageRef } = require('@/firebase/storage.ts');
    const url = "path/to/resource";
    storageRef(url);
    expect(ref).toHaveBeenCalledWith(expect.anything(), url);
  });
});
