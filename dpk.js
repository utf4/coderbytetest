const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";
  
  if (event && event.partitionKey) {
    candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    } 
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
  } else if (event){
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }
  
  
  return candidate;
};