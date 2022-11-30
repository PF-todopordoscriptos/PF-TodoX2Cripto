/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Coins, conn } = require("../../src/db.js");

const agent = session(app);
const coin = {
  name: "Bitcoin",
};

describe("Cripto routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Coins.sync({ force: true }).then(() => Coins.create(coin)));
  describe("GET /coins", () => {
    it("should get 200", () => agent.get("/coins").expect(200));
  });
});
