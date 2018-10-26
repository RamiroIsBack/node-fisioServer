var expect = require("expect");

var { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate a correct message object", () => {
    let message = generateMessage((from = "joe"), (text = "gimme five!"));
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});
