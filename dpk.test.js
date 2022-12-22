const { deterministicPartitionKey, deterministicPartitionKey1 } = require("./dpk");
const crypto = require("crypto");
describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns 128 character hash when given JSON", () => {
    const data = {name:crypto.randomBytes(12).toString('hex')};
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey.length).toBe(128);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(data)).digest("hex"));
  });

  it("Returns 128 character hash when given string", () => {
    const data = crypto.randomBytes(12).toString('hex');
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey.length).toBe(128);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(data)).digest("hex"));
  });

  it("Returns same string if partitionKey length is less then or equals to 256", () => {
    const data = {partitionKey:crypto.randomBytes(128).toString('hex')};
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(data.partitionKey);
  });

  it("Returns 128 hash of partitionKey if partitionKey length is grater then 256", () => {
    const data = {partitionKey:crypto.randomBytes(129).toString('hex')};
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey.length).toBe(128);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(data.partitionKey).digest("hex"));
  });
  
  it("Returns partitionKey as string if its json and length is less then or equals to 256", () => {
    const data = {partitionKey:{key:crypto.randomBytes(20).toString('hex')}};
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(JSON.stringify(data.partitionKey));
  });
  
  it("Returns partitionKey hash if its json and length is grater then 256", () => {
    const data = {partitionKey:{key:crypto.randomBytes(128).toString('hex')}};
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(data.partitionKey)).digest("hex"));
  });
  

});